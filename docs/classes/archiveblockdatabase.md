[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveBlockDatabase

# Class: ArchiveBlockDatabase

Primary interface for block database. e.g. a key-value store, with value: { header, data[] }.

## Hierarchy

- **ArchiveBlockDatabase**

  ↳ [*ArchiveBlockDatabaseServer*](archiveblockdatabaseserver.md)

## Table of contents

### Constructors

- [constructor](archiveblockdatabase.md#constructor)

### Methods

- [getBlock](archiveblockdatabase.md#getblock)
- [getBlockHeader](archiveblockdatabase.md#getblockheader)

## Constructors

### constructor

\+ **new ArchiveBlockDatabase**(): [*ArchiveBlockDatabase*](archiveblockdatabase.md)

**Returns:** [*ArchiveBlockDatabase*](archiveblockdatabase.md)

## Methods

### getBlock

▸ `Abstract` **getBlock**(`id`: *string*, `options?`: [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md)): *Promise*<``null`` \| [*ArchiveBlock*](../interfaces/archiveblock.md)\>

Returns the [ArchiveBlock](../interfaces/archiveblock.md) with `id`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *string* |
| `options?` | [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md) |

**Returns:** *Promise*<``null`` \| [*ArchiveBlock*](../interfaces/archiveblock.md)\>

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

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:72
