import {
  ArchiveBlock,
  ArchiveBlockDatabase,
  ArchiveBlockHeader,
  ArchiveBlockOfType,
  ArchiveDatabase,
  ArchiveDatabaseOptions,
  ArchiveGetBlockOptions,
  ArchiveGetTipOptions,
  ArchiveIndex,
  ArchiveTipDatabase,
  ArchiveTipRecord,
  sorted,
} from '@wholebuzz/archive-base'
import { CreateOptions, FileStatus, FileSystem } from '@wholebuzz/fs/lib/fs'
import { readJSON, readLinesWithHeader, serializeJSON } from '@wholebuzz/fs/lib/json'
import pMap from 'p-map'
import { Writable } from 'stream'
import StreamTree, { WritableStreamTree } from 'tree-stream'
import { v4 as uuidv4 } from 'uuid'

export * from '@wholebuzz/archive-base'

/**
 * Interface adding mutations to the [[ArchiveBlockDatabase]] getters.
 */
export abstract class ArchiveBlockDatabaseServer extends ArchiveBlockDatabase {
  /**
   * Creates a new block with `id`, failing if already exists.
   * @param blockId The id of the block to fetch.
   * @param createFn Stream callback for initializing the file.
   */
  abstract newBlock(
    blockId: string,
    createFn: (w: WritableStreamTree) => Promise<boolean>
  ): Promise<boolean>

  /**
   * Appends items to the block, safely.
   * @param blockId The id of the block to fetch.
   * @param items The item to append to the block data.
   * @param createFn Stream callback for initializing the file.
   * @param version Append contigent that appended to `version`.
   */
  abstract appendItemsToBlock(
    blockId: string,
    items: any[],
    createFn: (w: Writable) => Promise<void>,
    version?: string | number
  ): Promise<FileStatus | null>

  /**
   * Deletes the block with `id`.
   * @param blockId The id of the block to delete.
   */
  abstract deleteBlock(blockId: string): Promise<boolean>
}

/**
 * Interface adding mutations to the [[ArchiveTipDatabase]] getters.
 */
export abstract class ArchiveTipDatabaseServer extends ArchiveTipDatabase {
  /**
   * Updates the tip pointer for (key, value) to `record`.
   */
  abstract updateTip(
    db: string,
    key: string,
    value: string,
    record: ArchiveTipRecord
  ): Promise<boolean>

  /**
   * Generates new [[ArchiveBlock]] `id`.
   */
  abstract newTipId(db: string, key: string, value: string, height: number): Promise<string>

  /**
   * Returns e.g. the names of every author whose articles are archived.
   */
  abstract getIndexValues(concurrency?: number): Promise<string[]>

  /**
   * Deletes the tip pointer for (key, value).
   */
  abstract deleteTip(db: string, key: string, value: string): Promise<boolean>
}

/**
 * Extends [[ArchiveIndex]] with server database interfaces.
 */
export interface ArchiveServerIndex<X> extends ArchiveIndex<X> {
  blockDatabase: ArchiveBlockDatabaseServer
  tipDatabase: ArchiveTipDatabaseServer
}

/**
 * Parameters for archive database server.
 */
export interface ArchiveDatabaseServerOptions extends ArchiveDatabaseOptions {
  concurrency?: number
  targetBlockSize?: number
  primaryIndex?: number
}

/**
 * Intermediate structure for flattening pending inserts.
 */
export interface ArchiveDatabaseServerInsert<X> {
  index: number
  value: string
  data: X[]
}

export interface AddItemResult {
  success: boolean
  archived?: string
}

/**
 * Main implementation of Archive database. Creates sorted chains of JSON array "blocks".
 * Each "block" is represented as a file (with random filename) on Cloud Storage and
 * structured as an [[ArchiveBlock]] JSON object.
 */
export class ArchiveDatabaseServer<X> extends ArchiveDatabase<X> {
  constructor(
    public dbName: string,
    public indices: Array<ArchiveServerIndex<X>>,
    public options?: ArchiveDatabaseServerOptions
  ) {
    super(dbName, indices)
  }

  /**
   * Main API for adding items to an Archive Database.
   * @param items The items to add.
   */
  async addItems(items: X[], options?: { debug?: boolean }): Promise<AddItemResult[]> {
    const inserts: Array<Record<string, X[]>> = Array.from(
      { length: this.indices.length },
      () => ({})
    )

    // Group inserts by (index, value) e.g. (author, Anne Applebaum), (publisher, theatlantic.com).
    for (const item of items) {
      for (let i = 0; i < this.indices.length; i++) {
        const values = this.indices[i].getter(item)
        const insert: Record<string, X[]> = inserts[i]
        for (const value of values) {
          if (!value) continue
          if (!insert[value]) insert[value] = []
          insert[value].push(item)
        }
      }
    }
    if (options?.debug) console.log('addItems inserts', inserts)

    // Flatten the grouped inserts for each index to one array.
    const flatInserts: Array<ArchiveDatabaseServerInsert<X>> = []
    for (let i = 0; i < this.indices.length; i++) {
      const insert = inserts[i]
      for (const value of Object.keys(insert)) {
        flatInserts.push({ index: i, value, data: insert[value].sort(this.indices[i].sorter) })
      }
    }
    if (options?.debug) console.log('addItems flatInserts', flatInserts)

    // Actually do it.
    const flatResults = await pMap(
      flatInserts,
      (flatInsert) => {
        return this.addItemsToIndex(
          flatInsert.data,
          this.indices[flatInsert.index],
          flatInsert.value
        )
      },
      { concurrency: this.options?.concurrency || 10 }
    )
    if (options?.debug) console.log('addItems flatResults', flatResults)

    // Index the results, again by (index, value).
    const results: Array<Record<string, string>> = Array.from(
      { length: this.indices.length },
      () => ({})
    )
    flatInserts.forEach((x, i) => (results[x.index][x.value] = flatResults[i]))

    // Determine which items successfully inserted.
    const ret: AddItemResult[] = new Array(items.length)
    for (let j = 0; j < items.length; j++) {
      let success = true
      let archived
      for (let i = 0; i < this.indices.length; i++) {
        const values = this.indices[i].getter(items[j])
        if (!values.every((x) => !!results[i][x])) {
          success = false
          break
        }
        if (this.options?.primaryIndex === i && values.length === 1) {
          archived = results[this.options.primaryIndex]?.[values[0]]
        }
      }
      ret[j] = { archived, success }
    }
    return ret
  }

  /**
   * Adds the items to the index, optionally requiring strictly ordered inserts.
   * @param items The items to append to the index.
   * @param index The index the items should be appended within.
   * @param value The index value of the items.
   */
  async addItemsToIndex(items: X[], index: ArchiveServerIndex<X>, value: string): Promise<string> {
    const tip = await index.tipDatabase.getTip(this.dbName, index.name, value, { forInsert: true })
    if (!tip) return ''

    // Remember the version of the current block.
    const block = await index.blockDatabase.getBlock(tip.blockId, { forUpdate: true })

    // Check two blocks for duplicates.
    // `JSON.stringify(items).length` should be less than `options.targetBlockSize`
    const nextBlock =
      block &&
      block.header.nextBlocks[0] &&
      (block.data.length === 0 || !this.options?.strictOrdering)
        ? await index.blockDatabase.getBlock(block.header.nextBlocks[0])
        : null

    // Verify strict ordering.
    if (this.options?.strictOrdering && block) {
      items = items.filter((x) => {
        if (!verifyAppend(block.data, x, index.sorter)) return false
        if (nextBlock && !verifyAppend(nextBlock.data, x, index.sorter)) return false
        return true
      })
    }
    if (!items.length) return tip.blockId

    // Actually append the items to the block data.
    const success = await index.blockDatabase.appendItemsToBlock(
      tip.blockId,
      items,
      async (stream) => {
        stream.write(
          JSON.stringify({
            id: tip.blockId,
            db: this.dbName,
            key: index.name,
            value,
            dataType: (items[0] as any).constructor.name,
            dataSort: index.sorter.name,
            nextBlocks: [''],
            numNextBlocks: 0,
            numNextItems: 0,
          }) + '\n'
        )
      },
      block?.version || 0
    )
    if (!success) return ''

    if (this.options?.targetBlockSize && success.size >= this.options.targetBlockSize) {
      await this.compactIndex(index, value)
    }

    return tip.blockId
  }

  /**
   * Adds another block to the skip-chain.
   * @param index The index to add another block within.
   * @param indexValue The index value to add another block to.
   */
  async compactIndex(index: ArchiveServerIndex<X>, indexValue: string) {
    // Remember the version of the tip pointer.
    const tipRecord = await index.tipDatabase.getTip(this.dbName, index.name, indexValue, {
      forCompact: true,
    })
    if (!tipRecord || !tipRecord.version) {
      throw new Error(`compactIndex: Missing version: ${tipRecord?.version}`)
    }

    // Derive the new block header from the current tip header.
    const blockId = tipRecord.blockId
    const block = await index.blockDatabase.getBlock(blockId)
    if (!block) throw new Error(`compactIndex: Missing block ${blockId}`)
    const { header, data } = block
    const newHeight = header.numNextBlocks + 1
    const newBlockId = await index.tipDatabase.newTipId(
      header.db,
      header.key,
      header.value,
      newHeight
    )

    // Add skip list pointers.
    const nextBlocks = [blockId]
    let skiplistHeight = 1
    while (Math.random() < 0.5) {
      skiplistHeight++
      let h: ArchiveBlock | null = block
      while (h && h.header.nextBlocks.length < skiplistHeight) {
        const nextBlockId: string = h.header.nextBlocks[h.header.nextBlocks.length - 1]
        h = nextBlockId ? await index.blockDatabase.getBlockHeader(nextBlockId) : null
      }
      nextBlocks.push(h ? h.header.id : '')
    }

    // Actually create the new block.
    await index.blockDatabase.newBlock(
      newBlockId,
      StreamTree.writer(async (stream) => {
        stream.write(
          JSON.stringify({
            ...header,
            id: newBlockId,
            nextBlocks,
            numNextBlocks: newHeight,
            numNextItems: header.numNextItems + data.length,
          }) + '\n'
        )
        stream.end()
      })
    )

    // Update the tip pointer, contingent it's version hasn't changed.
    tipRecord.blockId = newBlockId
    const success = await index.tipDatabase.updateTip(
      header.db,
      header.key,
      header.value,
      tipRecord
    )

    if (!success) {
      // If updating the tip failed, remove the orphan block.
      // await index.blockDatabase.deleteBlock(newBlockId)
    }

    return success
  }

  /**
   * Delete an index.  Used to cleanup, e.g. index from bad Author parse.
   */
  async deleteIndex(index: ArchiveServerIndex<X>, indexValue: string, concurrency = 4) {
    const tipRecord = await index.tipDatabase.getTip(this.dbName, index.name, indexValue)
    if (!tipRecord) return false

    const blockIds = [tipRecord.blockId]
    while (true) {
      const block = await index.blockDatabase.getBlockHeader(blockIds[blockIds.length - 1])
      if (!block?.header?.nextBlocks?.length || !block.header.nextBlocks[0]) break
      blockIds.push(block.header.nextBlocks[0])
    }

    const res = await pMap(blockIds, (blockId) => index.blockDatabase.deleteBlock(blockId), {
      concurrency,
    })
    if (!res.every((x) => x === true)) return false
    return index.tipDatabase.deleteTip(this.dbName, index.name, indexValue)
  }
}

/**
 * Tip pointer database implemented using [[FileSystem]]. Tested with [[LocalFileSystem]]
 * and [[GoogleCloudFileSystem]].
 */
export class FileStorageArchiveTipDatabase extends ArchiveTipDatabaseServer {
  fileOptions: CreateOptions

  constructor(
    public fs: FileSystem,
    public directory: string,
    public hashFn: (x: string) => string
  ) {
    super()
    if (!endsWithSlash(this.directory)) throw new Error(`Expected slash terminator: ${directory}`)
    this.fileOptions = { /*gzip: true,*/ contentType: 'application/x-ndjson' }
  }

  getTipId(db: string, key: string, value: string) {
    return this.hashFn(`${db},${key},${value}`)
  }

  getUrl(db: string, key: string, value: string) {
    const tipId = this.getTipId(db, key, value)
    return `${this.directory}${tipId}.json`
  }

  /** @inheritDoc */
  async newTipId(_: string, __: string, ___: string, ____: number): Promise<string> {
    return uuidv4()
  }

  /** @inheritDoc */
  async getTip(
    db: string,
    key: string,
    value: string,
    options: ArchiveGetTipOptions
  ): Promise<ArchiveTipRecord | null> {
    const url = this.getUrl(db, key, value)
    if (await this.fs.fileExists(url)) {
      const stat = options?.forCompact ? await this.fs.getFileStatus(url) : undefined
      const record = (await readJSON(this.fs, url)) as ArchiveTipRecord
      return stat ? { ...record, version: stat.version } : record
    } else if (options?.forInsert) {
      const record: ArchiveTipRecord = {
        db,
        key,
        value,
        id: this.getTipId(db, key, value),
        blockId: await this.newTipId(db, key, value, 0),
      }
      await this.fs.createFile(
        url,
        async (stream) => serializeJSON(stream, record),
        this.fileOptions
      )
      return (await readJSON(this.fs, url)) as ArchiveTipRecord
    } else {
      return null
    }
  }

  /** @inheritDoc */
  async updateTip(db: string, key: string, value: string, record: ArchiveTipRecord) {
    if (!record.version) {
      console.error(`Expected supplied version`, record)
      return false
    }
    const url = this.getUrl(db, key, value)
    const version = record.version
    delete record.version
    return this.fs.replaceFile(
      url,
      async (stream) => serializeJSON(stream, record),
      this.fileOptions,
      version
    )
  }

  /** @inheritDoc */
  async deleteTip(db: string, key: string, value: string) {
    try {
      const res = await this.fs.removeFile(this.getUrl(db, key, value))
      console.log('deleteTip', `"${value}"`, res)
      return res
    } catch (err) {
      console.log('deleteTip', `"${value}"`, err)
      return false
    }
  }

  /** @inheritDoc */
  async getIndexValues(concurrency = 4): Promise<string[]> {
    const files = await this.fs.readDirectory(this.directory)
    return pMap(
      files,
      async (file) => ((await readJSON(this.fs, file)) as ArchiveTipRecord).value,
      {
        concurrency,
      }
    )
  }
}

/**
 * Block database implemented using [[FileSystem]]. Tested with [[LocalFileSystem]]
 * and [[GoogleCloudFileSystem]].
 */
export class FileStorageArchiveBlockDatabase<X> extends ArchiveBlockDatabaseServer {
  fileOptions: CreateOptions

  constructor(public fs: FileSystem, public directory: string, public parseItem: (x: string) => X) {
    super()
    if (!endsWithSlash(this.directory)) throw new Error(`Expected slash terminator: ${directory}`)
    this.fileOptions = { gzip: true, contentType: 'application/x-ndjson' }
  }

  getUrl(blockId: string) {
    // Work around https://issuetracker.google.com/u/1/issues/162906022
    return `${this.directory}${blockId}.json` + (this.directory.startsWith('gs://') ? '.gz' : '')
  }

  /** @inheritDoc */
  async getBlock(
    blockId: string,
    options?: ArchiveGetBlockOptions
  ): Promise<ArchiveBlockOfType<X> | null> {
    try {
      const url = this.getUrl(blockId)
      const stat = options?.forUpdate ? await this.fs.getFileStatus(url) : null
      const block = await readLinesWithHeader<X, ArchiveBlockHeader>(
        this.fs,
        url,
        this.parseItem,
        JSON.parse
      )
      if (!block[0]) return null
      const ret: ArchiveBlockOfType<X> = { header: block[0], data: block[1] }
      if (stat) ret.version = stat.version
      return ret
    } catch (err) {
      if (err.code !== 'ENOENT' && err.code !== 404) console.log(`getBlock(${blockId})`, err)
      return null
    }
  }

  /** @inheritDoc */
  async getBlockHeader(blockId: string): Promise<ArchiveBlock | null> {
    // XXX optimize with partial read
    const block = await this.getBlock(blockId)
    if (!block) return null
    return { header: block.header, data: block.data.length ? [block.data[0]] : [] }
  }

  /** @inheritDoc */
  async newBlock(blockId: string, createFn: (w: WritableStreamTree) => Promise<boolean>) {
    const url = this.getUrl(blockId)
    return this.fs.createFile(url, createFn, this.fileOptions)
  }

  /** @inheritDoc */
  async appendItemsToBlock(
    blockId: string,
    items: X[],
    createFn: (w: Writable) => Promise<void>,
    version?: string | number
  ): Promise<FileStatus | null> {
    const url = this.getUrl(blockId)
    const writeFn = async (stream: Writable) => {
      for (const item of items) {
        stream.write(JSON.stringify(item, (_, v) => (v ? v : undefined)) + '\n')
      }
      stream.end()
    }
    return this.fs.appendToFile(
      url,
      StreamTree.writer(writeFn),
      StreamTree.writer([createFn, writeFn]),
      this.fileOptions,
      version !== undefined ? { version } : undefined
    )
  }

  /** @inheritDoc */
  async deleteBlock(blockId: string) {
    try {
      const res = await this.fs.removeFile(this.getUrl(blockId))
      console.log('deleteBlock', blockId, res)
      return res
    } catch (err) {
      console.log('deleteBlock', blockId, err)
      return false
    }
  }
}

function endsWithSlash(x: string) {
  const lastChar = x.charAt(x.length - 1)
  return lastChar === '/' || lastChar === '\\'
}

function verifyAppend<X>(target: X[], item: X, sorter: (a: X, b: X) => number) {
  const last = target.length > 0 ? target[target.length - 1] : null
  if (last && sorter(last, item) >= 0) {
    if (sorted.has(target, item, sorter)) {
      console.error(`Suppressed duplicate append`, item)
    } else {
      console.error(`Out of order append`, last, item, sorter(last, item))
    }
    return false
  }
  target.push(item)
  return true
}
