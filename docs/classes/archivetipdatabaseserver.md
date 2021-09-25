[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveTipDatabaseServer

# Class: ArchiveTipDatabaseServer

Interface adding mutations to the [ArchiveTipDatabase](archivetipdatabase.md) getters.

## Hierarchy

- [*ArchiveTipDatabase*](archivetipdatabase.md)

  ↳ **ArchiveTipDatabaseServer**

  ↳↳ [*FileStorageArchiveTipDatabase*](filestoragearchivetipdatabase.md)

## Table of contents

### Constructors

- [constructor](archivetipdatabaseserver.md#constructor)

### Methods

- [deleteTip](archivetipdatabaseserver.md#deletetip)
- [getIndexValues](archivetipdatabaseserver.md#getindexvalues)
- [getTip](archivetipdatabaseserver.md#gettip)
- [newTipId](archivetipdatabaseserver.md#newtipid)
- [updateTip](archivetipdatabaseserver.md#updatetip)

## Constructors

### constructor

\+ **new ArchiveTipDatabaseServer**(): [*ArchiveTipDatabaseServer*](archivetipdatabaseserver.md)

**Returns:** [*ArchiveTipDatabaseServer*](archivetipdatabaseserver.md)

Inherited from: [ArchiveTipDatabase](archivetipdatabase.md)

## Methods

### deleteTip

▸ `Abstract` **deleteTip**(`db`: *string*, `key`: *string*, `value`: *string*): *Promise*<boolean\>

Deletes the tip pointer for (key, value).

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |

**Returns:** *Promise*<boolean\>

Defined in: src/archive.ts:86

___

### getIndexValues

▸ `Abstract` **getIndexValues**(`concurrency?`: *number*): *Promise*<string[]\>

Returns e.g. the names of every author whose articles are archived.

#### Parameters

| Name | Type |
| :------ | :------ |
| `concurrency?` | *number* |

**Returns:** *Promise*<string[]\>

Defined in: src/archive.ts:81

___

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

Inherited from: [ArchiveTipDatabase](archivetipdatabase.md)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:81

___

### newTipId

▸ `Abstract` **newTipId**(`db`: *string*, `key`: *string*, `value`: *string*, `height`: *number*): *Promise*<string\>

Generates new [ArchiveBlock](../interfaces/archiveblock.md) `id`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |
| `height` | *number* |

**Returns:** *Promise*<string\>

Defined in: src/archive.ts:76

___

### updateTip

▸ `Abstract` **updateTip**(`db`: *string*, `key`: *string*, `value`: *string*, `record`: [*ArchiveTipRecord*](../interfaces/archivetiprecord.md)): *Promise*<boolean\>

Updates the tip pointer for (key, value) to `record`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |
| `record` | [*ArchiveTipRecord*](../interfaces/archivetiprecord.md) |

**Returns:** *Promise*<boolean\>

Defined in: src/archive.ts:66
