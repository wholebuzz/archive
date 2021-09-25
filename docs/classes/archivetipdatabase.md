[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveTipDatabase

# Class: ArchiveTipDatabase

Primary interface for tip pointer database. e.g. a key-value store.

## Hierarchy

- **ArchiveTipDatabase**

  ↳ [*ArchiveTipDatabaseServer*](archivetipdatabaseserver.md)

## Table of contents

### Constructors

- [constructor](archivetipdatabase.md#constructor)

### Methods

- [getTip](archivetipdatabase.md#gettip)

## Constructors

### constructor

\+ **new ArchiveTipDatabase**(): [*ArchiveTipDatabase*](archivetipdatabase.md)

**Returns:** [*ArchiveTipDatabase*](archivetipdatabase.md)

## Methods

### getTip

▸ `Abstract` **getTip**(`db`: *string*, `key`: *string*, `value`: *string*, `options?`: [*ArchiveGetTipOptions*](../interfaces/archivegettipoptions.md)): *Promise*<``null`` \| [*ArchiveTipRecord*](../interfaces/archivetiprecord.md)\>

Returns the tip block id for the index in `db` with `key` and `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |
| `options?` | [*ArchiveGetTipOptions*](../interfaces/archivegettipoptions.md) |

**Returns:** *Promise*<``null`` \| [*ArchiveTipRecord*](../interfaces/archivetiprecord.md)\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:81
