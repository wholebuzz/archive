import { AnyFileSystem, FileSystem, LocalFileSystem } from '@wholebuzz/fs/lib/fs'
import { GoogleCloudFileSystem } from '@wholebuzz/fs/lib/gcp'
import { readLines } from '@wholebuzz/fs/lib/json'
import * as assert from 'assert'
import * as path from 'path'
import rimraf from 'rimraf'
import SHA from 'sha.js'
import StreamTree from 'tree-stream'
import {
  AddItemResult,
  ArchiveDatabaseServer,
  FileStorageArchiveBlockDatabase,
  FileStorageArchiveTipDatabase,
} from './archive'

const { mktempDirSync } = require('fs-mktemp')

let fileSystem!: FileSystem

beforeAll(async () => {
  fileSystem = new AnyFileSystem([
    { urlPrefix: 'gs://', fs: new GoogleCloudFileSystem() },
    { urlPrefix: '', fs: new LocalFileSystem() },
  ])
})

describe('FileStorageBlockDatabase with local directory', () => {
  const blockId = 'foobar'
  const header = { foo: 'bar' }
  let blockDatabase!: FileStorageArchiveBlockDatabase<Event>

  beforeAll(async () => {
    const blockStorageDirectory = mktempSync()
    blockDatabase = new FileStorageArchiveBlockDatabase<Event>(
      fileSystem,
      blockStorageDirectory,
      JSON.parse
    )
    console.log(`Created FileStorageBlockDatabase`, blockDatabase)
  })

  it('Should retrieve an inserted block', async () => {
    await blockDatabase.newBlock(
      blockId,
      StreamTree.writer(async (stream) => {
        stream.write(JSON.stringify(header) + '\n')
        stream.end()
      })
    )
    const block = await blockDatabase.getBlock(blockId)
    console.log(block)
    assert.deepEqual(block?.header, header)
    assert.equal(block?.data.length, 0)
  })
})

describe('FileStorageTipDatabase with local directory', () => {
  const db = 'news'
  const key = 'publisher'
  const value = 'npr.org'
  let tipDatabase!: FileStorageArchiveTipDatabase

  beforeAll(async () => {
    const tipStorageDirectory = mktempSync()
    tipDatabase = new FileStorageArchiveTipDatabase(fileSystem, tipStorageDirectory, sha1)
    console.log(`Created FileStorageTipDatabase`, tipDatabase)
  })

  it('Should retrieve an updated tip', async () => {
    const empty = await tipDatabase.getTip(db, key, value, {})
    assert.equal(empty, null)

    const rec1 = await tipDatabase.getTip(db, key, value, { forInsert: true })
    assert.equal(!!rec1, true)
    assert.equal((rec1?.blockId?.length || 0) > 0, true)

    const rec2 = await tipDatabase.getTip(db, key, value, { forInsert: true })
    assert.equal(!!rec2, true)
    assert.deepEqual(rec1, rec2)

    const rec3 = await tipDatabase.getTip(db, key, value, { forCompact: true })
    assert.equal(!!rec3, true)
    assert.equal(rec2?.blockId, rec3?.blockId)
    assert.equal(Boolean(rec3?.version), true)
  })
})

describe('DataArchive using local file storage', () => {
  let blockStorageDirectory = process.env.TEST_ARCHIVE_BLOCK_DIR || '' // gs://archive/
  let tipStorageDirectory = process.env.TEST_ARCHIVE_TIP_DIR || '' // gs://archive-index/
  let archive!: ArchiveDatabaseServer<Event>
  const index: Record<string, Event[]> = {}
  let input: Event[] = []

  beforeAll(async () => {
    if (!blockStorageDirectory) blockStorageDirectory = mktempSync()
    if (!tipStorageDirectory) tipStorageDirectory = mktempSync()
    archive = new ArchiveDatabaseServer<Event>(
      'news',
      [
        {
          name: 'publisher',
          getter: getEventPublishers,
          sorter: compareEventReverse,
          blockDatabase: new FileStorageArchiveBlockDatabase<Event>(
            fileSystem,
            blockStorageDirectory,
            parseEventJSON
          ),
          tipDatabase: new FileStorageArchiveTipDatabase(fileSystem, tipStorageDirectory, sha1),
        },
      ],
      {
        primaryIndex: 0,
        strictOrdering: process.env.TEST_ARCHIVE_STRICT_ORDERING !== 'false',
        targetBlockSize: 0,
      }
    )
    console.log(`Created ArchiveDatabaseServer`, archive)
  })

  it('Should retrieve inserted items', async () => {
    input = await readLines<Event>(fileSystem, 'test/news.json', parseEventJSON)
    let res: AddItemResult[] = new Array(input.length).fill({ success: false })
    const addItemMethod: string = process.env.TEST_ARCHIVE_ADD_METHOD || 'incremental'

    if (addItemMethod === 'bulk') {
      res = await archive.addItems(input)
    } else if (addItemMethod === 'incremental') {
      const sorted = input.sort(archive.indices[0].sorter)
      for (let i = 0; i < sorted.length; i++) res[i] = (await archive.addItems([sorted[i]]))[0]
    } else if (addItemMethod === 'trainwreck') {
      const sorted = input.sort(archive.indices[0].sorter)
      while (!res.every((x) => x.success === true)) {
        const added = await Promise.all(
          sorted.map(async (x, i) => (res[i].success ? res[i] : (await archive.addItems([x]))[0]))
        )
        added.forEach((x, i) => (res[i] = x))
      }
    } else throw new Error(`Unknown addItemMethod: ${addItemMethod}`)
    for (const item of res) {
      assert.equal(item.success, true)
      assert.equal(!!item.archived, true)
    }

    for (const item of input) {
      const publishers = getEventPublishers(item)
      for (const publisher of publishers) {
        if (!index[publisher]) index[publisher] = []
        index[publisher].push(item)
      }
    }

    for (const publisher of Object.keys(index)) {
      const expected = index[publisher].sort(archive.indices[0].sorter).map((x) => clearNulls(x))
      const block = await archive.getTipBlock(archive.indices[0], publisher)
      assert.deepEqual(block?.data, expected)
    }
  })

  it('Should compact correctly', async () => {
    const numPublishers = Object.keys(index).length
    const tipDir = await fileSystem.readDirectory(tipStorageDirectory)
    const blockDir = await fileSystem.readDirectory(blockStorageDirectory)
    assert.equal(tipDir.length, numPublishers)
    assert.equal(blockDir.length, numPublishers)

    for (const publisher of Object.keys(index)) {
      await archive.compactIndex(archive.indices[0], publisher)
      await archive.compactIndex(archive.indices[0], publisher)
    }
    const tipDir2 = await fileSystem.readDirectory(tipStorageDirectory)
    const blockDir2 = await fileSystem.readDirectory(blockStorageDirectory)
    assert.equal(tipDir2.length, numPublishers)
    assert.equal(blockDir2.length, 3 * numPublishers)

    for (const publisher of Object.keys(index)) {
      const tipBlock = await archive.getTipBlock(archive.indices[0], publisher)
      assert.equal(tipBlock?.header.numNextBlocks, 2)
      assert.equal(tipBlock?.data.length, 0)
      if (!tipBlock) continue

      const blankBlock = await archive.getNextBlock(tipBlock)
      assert.equal(blankBlock?.header.id, tipBlock?.header.nextBlocks[0])
      assert.equal(blankBlock?.header.numNextBlocks, 1)
      assert.equal(blankBlock?.data.length, 0)
      if (!blankBlock) continue

      const block = await archive.getNextBlock(blankBlock)
      assert.equal(block?.header.id, blankBlock?.header.nextBlocks[0])
      assert.equal(block?.header.numNextBlocks, 0)
      if (!block) continue

      const expected = index[publisher].sort(archive.indices[0].sorter).map((x) => clearNulls(x))
      assert.deepEqual(block?.data, expected)
      assert.equal(tipBlock?.header.numNextItems, block.data.length)
      assert.equal(blankBlock?.header.numNextItems, block.data.length)
    }
  })
})

interface Event {
  guid: string
  date: Date
  link?: string | null
  archived?: string
	title: string
	summary: string
  feed: string
}

const getEventPublishers = (x: Event) => [ new URL(x.link || x.guid || '').hostname ]

function genericCompare<X>(a: X, b: X) {
  return a < b ? -1 : b < a ? 1 : 0
}

function compareEventReverse(eventB: Event, eventA: Event) {
  const dateDiff = genericCompare(eventB.date, eventA.date)
  return dateDiff !== 0 ? dateDiff : genericCompare(eventA.guid, eventB.guid)
}

function parseEventJSON(x: string): Event {
  const event = JSON.parse(x)
  event.date = new Date(event.date)
  return event
}

function clearNulls(x: Record<string, any>) {
  Object.keys(x).forEach((k) => x[k] == null && delete x[k])
  return x
}

function mktempSync() {
  const dir = mktempDirSync()
  rimraf.sync(path.join(dir, '*'))
  return dir + path.sep
}

const sha1 = (x: string, encoding: 'hex' | 'base64' | 'latin1' = 'hex') =>
  new SHA.sha1().update(x).digest(encoding)
