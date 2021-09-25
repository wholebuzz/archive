[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveDatabase

# Class: ArchiveDatabase<X\>

Primary interface for block-chain (as oppposed to blockchain) database built
on top of the [ArchiveBlockDatabase](archiveblockdatabase.md) and [ArchiveTipDatabase](archivetipdatabase.md) interfaces.

## Type parameters

| Name |
| :------ |
| `X` |

## Hierarchy

- **ArchiveDatabase**

  ↳ [*ArchiveDatabaseServer*](archivedatabaseserver.md)

## Table of contents

### Constructors

- [constructor](archivedatabase.md#constructor)

### Properties

- [dbName](archivedatabase.md#dbname)
- [indices](archivedatabase.md#indices)
- [options](archivedatabase.md#options)

### Methods

- [findBlockFor](archivedatabase.md#findblockfor)
- [findIndex](archivedatabase.md#findindex)
- [findItem](archivedatabase.md#finditem)
- [findTipBlock](archivedatabase.md#findtipblock)
- [getNextBlock](archivedatabase.md#getnextblock)
- [getTipBlock](archivedatabase.md#gettipblock)
- [indexBlockFor](archivedatabase.md#indexblockfor)
- [indexItem](archivedatabase.md#indexitem)

## Constructors

### constructor

\+ **new ArchiveDatabase**<X\>(`dbName`: *string*, `indices`: [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>[], `options?`: [*ArchiveDatabaseOptions*](../interfaces/archivedatabaseoptions.md)): [*ArchiveDatabase*](archivedatabase.md)<X\>

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | *string* |
| `indices` | [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>[] |
| `options?` | [*ArchiveDatabaseOptions*](../interfaces/archivedatabaseoptions.md) |

**Returns:** [*ArchiveDatabase*](archivedatabase.md)<X\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:117

## Properties

### dbName

• **dbName**: *string*

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:115

___

### indices

• **indices**: [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>[]

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:116

___

### options

• `Optional` **options**: [*ArchiveDatabaseOptions*](../interfaces/archivedatabaseoptions.md)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:117

## Methods

### findBlockFor

▸ **findBlockFor**(`indexKey`: *string*, `indexValue`: *string*, `item`: *Partial*<X\>): *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `indexKey` | *string* |
| `indexValue` | *string* |
| `item` | *Partial*<X\> |

**Returns:** *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:129

___

### findIndex

▸ **findIndex**(`indexKey`: *string*): [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `indexKey` | *string* |

**Returns:** [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:133

___

### findItem

▸ **findItem**(`indexKey`: *string*, `indexValue`: *string*, `item`: *Partial*<X\>): *Promise*<``null`` \| X\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `indexKey` | *string* |
| `indexValue` | *string* |
| `item` | *Partial*<X\> |

**Returns:** *Promise*<``null`` \| X\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:131

___

### findTipBlock

▸ **findTipBlock**(`indexKey`: *string*, `indexValue`: *string*): *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `indexKey` | *string* |
| `indexValue` | *string* |

**Returns:** *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:119

___

### getNextBlock

▸ **getNextBlock**(`block`: [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>, `height?`: *number*, `options?`: [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md)): *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

Returns the next block pointed to by the input `block`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\> | The block whose child should be returned. |
| `height?` | *number* | - |
| `options?` | [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md) | - |

**Returns:** *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:128

___

### getTipBlock

▸ **getTipBlock**(`index`: [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>, `indexValue`: *string*, `options?`: [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md)): *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

Returns the tip block for the `index` with `indexValue`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | [*ArchiveIndex*](../interfaces/archiveindex.md)<X\> |
| `indexValue` | *string* |
| `options?` | [*ArchiveGetBlockOptions*](../interfaces/archivegetblockoptions.md) |

**Returns:** *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:123

___

### indexBlockFor

▸ **indexBlockFor**(`index`: [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>, `indexValue`: *string*, `item`: *Partial*<X\>): *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | [*ArchiveIndex*](../interfaces/archiveindex.md)<X\> |
| `indexValue` | *string* |
| `item` | *Partial*<X\> |

**Returns:** *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:130

___

### indexItem

▸ **indexItem**(`index`: [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>, `indexValue`: *string*, `item`: *Partial*<X\>): *Promise*<``null`` \| X\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | [*ArchiveIndex*](../interfaces/archiveindex.md)<X\> |
| `indexValue` | *string* |
| `item` | *Partial*<X\> |

**Returns:** *Promise*<``null`` \| X\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:132
