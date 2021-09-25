[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / FileStorageArchiveTipDatabase

# Class: FileStorageArchiveTipDatabase

Tip pointer database implemented using [[FileSystem]]. Tested with [[LocalFileSystem]]
and [[GoogleCloudFileSystem]].

## Hierarchy

- [*ArchiveTipDatabaseServer*](archivetipdatabaseserver.md)

  ↳ **FileStorageArchiveTipDatabase**

## Table of contents

### Constructors

- [constructor](filestoragearchivetipdatabase.md#constructor)

### Properties

- [directory](filestoragearchivetipdatabase.md#directory)
- [fileOptions](filestoragearchivetipdatabase.md#fileoptions)
- [fs](filestoragearchivetipdatabase.md#fs)
- [hashFn](filestoragearchivetipdatabase.md#hashfn)

### Methods

- [deleteTip](filestoragearchivetipdatabase.md#deletetip)
- [getIndexValues](filestoragearchivetipdatabase.md#getindexvalues)
- [getTip](filestoragearchivetipdatabase.md#gettip)
- [getTipId](filestoragearchivetipdatabase.md#gettipid)
- [getUrl](filestoragearchivetipdatabase.md#geturl)
- [newTipId](filestoragearchivetipdatabase.md#newtipid)
- [updateTip](filestoragearchivetipdatabase.md#updatetip)

## Constructors

### constructor

\+ **new FileStorageArchiveTipDatabase**(`fs`: *FileSystem*, `directory`: *string*, `hashFn`: (`x`: *string*) => *string*): [*FileStorageArchiveTipDatabase*](filestoragearchivetipdatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fs` | *FileSystem* |
| `directory` | *string* |
| `hashFn` | (`x`: *string*) => *string* |

**Returns:** [*FileStorageArchiveTipDatabase*](filestoragearchivetipdatabase.md)

Overrides: [ArchiveTipDatabaseServer](archivetipdatabaseserver.md)

Defined in: src/archive.ts:372

## Properties

### directory

• **directory**: *string*

___

### fileOptions

• **fileOptions**: CreateOptions

Defined in: src/archive.ts:372

___

### fs

• **fs**: *FileSystem*

___

### hashFn

• **hashFn**: (`x`: *string*) => *string*

#### Type declaration

▸ (`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

## Methods

### deleteTip

▸ **deleteTip**(`db`: *string*, `key`: *string*, `value`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [ArchiveTipDatabaseServer](archivetipdatabaseserver.md)

Defined in: src/archive.ts:447

___

### getIndexValues

▸ **getIndexValues**(`concurrency?`: *number*): *Promise*<string[]\>

**`inheritdoc`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `concurrency` | *number* | 4 |

**Returns:** *Promise*<string[]\>

Overrides: [ArchiveTipDatabaseServer](archivetipdatabaseserver.md)

Defined in: src/archive.ts:459

___

### getTip

▸ **getTip**(`db`: *string*, `key`: *string*, `value`: *string*, `options`: [*ArchiveGetTipOptions*](../interfaces/archivegettipoptions.md)): *Promise*<``null`` \| [*ArchiveTipRecord*](../interfaces/archivetiprecord.md)\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |
| `options` | [*ArchiveGetTipOptions*](../interfaces/archivegettipoptions.md) |

**Returns:** *Promise*<``null`` \| [*ArchiveTipRecord*](../interfaces/archivetiprecord.md)\>

Overrides: [ArchiveTipDatabaseServer](archivetipdatabaseserver.md)

Defined in: src/archive.ts:399

___

### getTipId

▸ **getTipId**(`db`: *string*, `key`: *string*, `value`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |

**Returns:** *string*

Defined in: src/archive.ts:384

___

### getUrl

▸ **getUrl**(`db`: *string*, `key`: *string*, `value`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |

**Returns:** *string*

Defined in: src/archive.ts:388

___

### newTipId

▸ **newTipId**(`_`: *string*, `__`: *string*, `___`: *string*, `____`: *number*): *Promise*<string\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | *string* |
| `__` | *string* |
| `___` | *string* |
| `____` | *number* |

**Returns:** *Promise*<string\>

Overrides: [ArchiveTipDatabaseServer](archivetipdatabaseserver.md)

Defined in: src/archive.ts:394

___

### updateTip

▸ **updateTip**(`db`: *string*, `key`: *string*, `value`: *string*, `record`: [*ArchiveTipRecord*](../interfaces/archivetiprecord.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | *string* |
| `key` | *string* |
| `value` | *string* |
| `record` | [*ArchiveTipRecord*](../interfaces/archivetiprecord.md) |

**Returns:** *Promise*<boolean\>

Overrides: [ArchiveTipDatabaseServer](archivetipdatabaseserver.md)

Defined in: src/archive.ts:430
