[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveBlockDatabaseServer

# Class: ArchiveBlockDatabaseServer

Interface adding mutations to the [ArchiveBlockDatabase](archiveblockdatabase.md) getters.

## Hierarchy

- [*ArchiveBlockDatabase*](archiveblockdatabase.md)

  ↳ **ArchiveBlockDatabaseServer**

  ↳↳ [*FileStorageArchiveBlockDatabase*](filestoragearchiveblockdatabase.md)

## Table of contents

### Constructors

- [constructor](archiveblockdatabaseserver.md#constructor)

### Methods

- [appendItemsToBlock](archiveblockdatabaseserver.md#appenditemstoblock)
- [deleteBlock](archiveblockdatabaseserver.md#deleteblock)
- [getBlock](archiveblockdatabaseserver.md#getblock)
- [getBlockHeader](archiveblockdatabaseserver.md#getblockheader)
- [newBlock](archiveblockdatabaseserver.md#newblock)

## Constructors

### constructor

\+ **new ArchiveBlockDatabaseServer**(): [*ArchiveBlockDatabaseServer*](archiveblockdatabaseserver.md)

**Returns:** [*ArchiveBlockDatabaseServer*](archiveblockdatabaseserver.md)

Inherited from: [ArchiveBlockDatabase](archiveblockdatabase.md)

## Methods

### appendItemsToBlock

▸ `Abstract` **appendItemsToBlock**(`blockId`: *string*, `items`: *any*[], `createFn`: (`w`: *Writable*) => *Promise*<void\>, `version?`: *string* \| *number*): *Promise*<``null`` \| FileStatus\>

Appends items to the block, safely.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | *string* | The id of the block to fetch. |
| `items` | *any*[] | The item to append to the block data. |
| `createFn` | (`w`: *Writable*) => *Promise*<void\> | Stream callback for initializing the file. |
| `version?` | *string* \| *number* | Append contigent that appended to `version`. |

**Returns:** *Promise*<``null`` \| FileStatus\>

Defined in: src/archive.ts:45

___

### deleteBlock

▸ `Abstract` **deleteBlock**(`blockId`: *string*): *Promise*<boolean\>

Deletes the block with `id`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | *string* | The id of the block to delete. |

**Returns:** *Promise*<boolean\>

Defined in: src/archive.ts:56

___

### getBlock

▸ `Abstract` **getBlock**(`id`: *string*, `options?`: [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md)): *Promise*<``null`` \| [*ArchiveBlock*](../interfaces/archiveblock.md)\>

Returns the [ArchiveBlock](../interfaces/archiveblock.md) with `id`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *string* |
| `options?` | [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md) |

**Returns:** *Promise*<``null`` \| [*ArchiveBlock*](../interfaces/archiveblock.md)\>

Inherited from: [ArchiveBlockDatabase](archiveblockdatabase.md)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:67

___

### getBlockHeader

▸ `Abstract` **getBlockHeader**(`blockId`: *string*): *Promise*<``null`` \| [*ArchiveBlock*](../interfaces/archiveblock.md)\>

Returns [ArchiveBlockHeader](../interfaces/archiveblockheader.md) and first element for block with `id`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | *string* | The id of the block to fetch. |

**Returns:** *Promise*<``null`` \| [*ArchiveBlock*](../interfaces/archiveblock.md)\>

Inherited from: [ArchiveBlockDatabase](archiveblockdatabase.md)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:72

___

### newBlock

▸ `Abstract` **newBlock**(`blockId`: *string*, `createFn`: (`w`: WritableStreamTree) => *Promise*<boolean\>): *Promise*<boolean\>

Creates a new block with `id`, failing if already exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | *string* | The id of the block to fetch. |
| `createFn` | (`w`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for initializing the file. |

**Returns:** *Promise*<boolean\>

Defined in: src/archive.ts:33
