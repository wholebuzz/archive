[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / FileStorageArchiveBlockDatabase

# Class: FileStorageArchiveBlockDatabase<X\>

Block database implemented using [[FileSystem]]. Tested with [[LocalFileSystem]]
and [[GoogleCloudFileSystem]].

## Type parameters

| Name |
| :------ |
| `X` |

## Hierarchy

- [*ArchiveBlockDatabaseServer*](archiveblockdatabaseserver.md)

  ↳ **FileStorageArchiveBlockDatabase**

## Table of contents

### Constructors

- [constructor](filestoragearchiveblockdatabase.md#constructor)

### Properties

- [directory](filestoragearchiveblockdatabase.md#directory)
- [fileOptions](filestoragearchiveblockdatabase.md#fileoptions)
- [fs](filestoragearchiveblockdatabase.md#fs)
- [parseItem](filestoragearchiveblockdatabase.md#parseitem)

### Methods

- [appendItemsToBlock](filestoragearchiveblockdatabase.md#appenditemstoblock)
- [deleteBlock](filestoragearchiveblockdatabase.md#deleteblock)
- [getBlock](filestoragearchiveblockdatabase.md#getblock)
- [getBlockHeader](filestoragearchiveblockdatabase.md#getblockheader)
- [getUrl](filestoragearchiveblockdatabase.md#geturl)
- [newBlock](filestoragearchiveblockdatabase.md#newblock)

## Constructors

### constructor

\+ **new FileStorageArchiveBlockDatabase**<X\>(`fs`: *FileSystem*, `directory`: *string*, `parseItem`: (`x`: *string*) => X): [*FileStorageArchiveBlockDatabase*](filestoragearchiveblockdatabase.md)<X\>

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fs` | *FileSystem* |
| `directory` | *string* |
| `parseItem` | (`x`: *string*) => X |

**Returns:** [*FileStorageArchiveBlockDatabase*](filestoragearchiveblockdatabase.md)<X\>

Overrides: [ArchiveBlockDatabaseServer](archiveblockdatabaseserver.md)

Defined in: src/archive.ts:476

## Properties

### directory

• **directory**: *string*

___

### fileOptions

• **fileOptions**: CreateOptions

Defined in: src/archive.ts:476

___

### fs

• **fs**: *FileSystem*

___

### parseItem

• **parseItem**: (`x`: *string*) => X

#### Type declaration

▸ (`x`: *string*): X

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** X

## Methods

### appendItemsToBlock

▸ **appendItemsToBlock**(`blockId`: *string*, `items`: X[], `createFn`: (`w`: *Writable*) => *Promise*<void\>, `version?`: *string* \| *number*): *Promise*<``null`` \| FileStatus\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | *string* |
| `items` | X[] |
| `createFn` | (`w`: *Writable*) => *Promise*<void\> |
| `version?` | *string* \| *number* |

**Returns:** *Promise*<``null`` \| FileStatus\>

Overrides: [ArchiveBlockDatabaseServer](archiveblockdatabaseserver.md)

Defined in: src/archive.ts:528

___

### deleteBlock

▸ **deleteBlock**(`blockId`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [ArchiveBlockDatabaseServer](archiveblockdatabaseserver.md)

Defined in: src/archive.ts:551

___

### getBlock

▸ **getBlock**(`blockId`: *string*, `options?`: [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md)): *Promise*<``null`` \| [*ArchiveBlockOfType*](../interfaces/archiveblockoftype.md)<X\>\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | *string* |
| `options?` | [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md) |

**Returns:** *Promise*<``null`` \| [*ArchiveBlockOfType*](../interfaces/archiveblockoftype.md)<X\>\>

Overrides: [ArchiveBlockDatabaseServer](archiveblockdatabaseserver.md)

Defined in: src/archive.ts:490

___

### getBlockHeader

▸ **getBlockHeader**(`blockId`: *string*): *Promise*<``null`` \| [*ArchiveBlock*](../interfaces/archiveblock.md)\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | *string* |

**Returns:** *Promise*<``null`` \| [*ArchiveBlock*](../interfaces/archiveblock.md)\>

Overrides: [ArchiveBlockDatabaseServer](archiveblockdatabaseserver.md)

Defined in: src/archive.ts:514

___

### getUrl

▸ **getUrl**(`blockId`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | *string* |

**Returns:** *string*

Defined in: src/archive.ts:484

___

### newBlock

▸ **newBlock**(`blockId`: *string*, `createFn`: (`w`: WritableStreamTree) => *Promise*<boolean\>): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | *string* |
| `createFn` | (`w`: WritableStreamTree) => *Promise*<boolean\> |

**Returns:** *Promise*<boolean\>

Overrides: [ArchiveBlockDatabaseServer](archiveblockdatabaseserver.md)

Defined in: src/archive.ts:522
