# @wholebuzz/archive ![image](https://img.shields.io/npm/v/@wholebuzz/archive) [![test](https://github.com/wholebuzz/archive/actions/workflows/test.yaml/badge.svg)](https://github.com/wholebuzz/archive/actions/workflows/test.yaml)

Archive database using sorted chains of JSON array blocks. Each block is represented as a file (with random filename) on Cloud Storage and structured as an [ArchiveBlock](docs/interfaces/archiveblock.md) JSON object. Uses `@wholebuzz/fs` for atomic appends to Cloud Storage.

## Example

```typescript
const archive = new ArchiveDatabaseServer<Event>(
  'news',
  [
    {
      name: 'publisher',
      getter: getEventPublishers,
      sorter: compareEventReverse,
      blockDatabase: new FileStorageArchiveBlockDatabase<Event>(
        fileSystem,
        'gs://archive',
        parseEventJSON
      ),
      tipDatabase: new FileStorageArchiveTipDatabase(
        fileSystem,
        'gs://archive-index',
        sha1),
    },
  ])

await archive.addItems(item);
const tipBlock = await archive.getTipBlock(archive.indices[0], publisher)
```

## Table of contents

### Classes

- [ArchiveBlockDatabase](docs/classes/archiveblockdatabase.md)
- [ArchiveBlockDatabaseServer](docs/classes/archiveblockdatabaseserver.md)
- [ArchiveDatabase](docs/classes/archivedatabase.md)
- [ArchiveDatabaseServer](docs/classes/archivedatabaseserver.md)
- [ArchiveTipDatabase](docs/classes/archivetipdatabase.md)
- [ArchiveTipDatabaseServer](docs/classes/archivetipdatabaseserver.md)
- [FileStorageArchiveBlockDatabase](docs/classes/filestoragearchiveblockdatabase.md)
- [FileStorageArchiveTipDatabase](docs/classes/filestoragearchivetipdatabase.md)

### Interfaces

- [AddItemResult](docs/interfaces/additemresult.md)
- [ArchiveBlock](docs/interfaces/archiveblock.md)
- [ArchiveBlockHeader](docs/interfaces/archiveblockheader.md)
- [ArchiveBlockOfType](docs/interfaces/archiveblockoftype.md)
- [ArchiveDatabaseOptions](docs/interfaces/archivedatabaseoptions.md)
- [ArchiveDatabaseServerInsert](docs/interfaces/archivedatabaseserverinsert.md)
- [ArchiveDatabaseServerOptions](docs/interfaces/archivedatabaseserveroptions.md)
- [ArchiveGetBlockOptions](docs/interfaces/archivegetblockoptions.md)
- [ArchiveGetTipOptions](docs/interfaces/archivegettipoptions.md)
- [ArchiveIndex](docs/interfaces/archiveindex.md)
- [ArchiveIndexBlockOfType](docs/interfaces/archiveindexblockoftype.md)
- [ArchiveServerIndex](docs/interfaces/archiveserverindex.md)
- [ArchiveTipRecord](docs/interfaces/archivetiprecord.md)

### Variables

- [sorted](docs/modules.md#sorted)

## Variables

### sorted

??? `Const` **sorted**: *any*

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:1
