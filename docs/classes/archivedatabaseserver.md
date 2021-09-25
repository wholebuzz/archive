[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveDatabaseServer

# Class: ArchiveDatabaseServer<X\>

Main implementation of Archive database. Creates sorted chains of JSON array "blocks".
Each "block" is represented as a file (with random filename) on Cloud Storage and
structured as an [ArchiveBlock](../interfaces/archiveblock.md) JSON object.

## Type parameters

| Name |
| :------ |
| `X` |

## Hierarchy

- [*ArchiveDatabase*](archivedatabase.md)<X\>

  ↳ **ArchiveDatabaseServer**

## Table of contents

### Constructors

- [constructor](archivedatabaseserver.md#constructor)

### Properties

- [dbName](archivedatabaseserver.md#dbname)
- [indices](archivedatabaseserver.md#indices)
- [options](archivedatabaseserver.md#options)

### Methods

- [addItems](archivedatabaseserver.md#additems)
- [addItemsToIndex](archivedatabaseserver.md#additemstoindex)
- [compactIndex](archivedatabaseserver.md#compactindex)
- [deleteIndex](archivedatabaseserver.md#deleteindex)
- [findBlockFor](archivedatabaseserver.md#findblockfor)
- [findIndex](archivedatabaseserver.md#findindex)
- [findItem](archivedatabaseserver.md#finditem)
- [findTipBlock](archivedatabaseserver.md#findtipblock)
- [getNextBlock](archivedatabaseserver.md#getnextblock)
- [getTipBlock](archivedatabaseserver.md#gettipblock)
- [indexBlockFor](archivedatabaseserver.md#indexblockfor)
- [indexItem](archivedatabaseserver.md#indexitem)

## Constructors

### constructor

\+ **new ArchiveDatabaseServer**<X\>(`dbName`: *string*, `indices`: [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\>[], `options?`: [*ArchiveDatabaseServerOptions*](../interfaces/archivedatabaseserveroptions.md)): [*ArchiveDatabaseServer*](archivedatabaseserver.md)<X\>

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | *string* |
| `indices` | [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\>[] |
| `options?` | [*ArchiveDatabaseServerOptions*](../interfaces/archivedatabaseserveroptions.md) |

**Returns:** [*ArchiveDatabaseServer*](archivedatabaseserver.md)<X\>

Overrides: [ArchiveDatabase](archivedatabase.md)

Defined in: src/archive.ts:125

## Properties

### dbName

• **dbName**: *string*

Inherited from: [ArchiveDatabase](archivedatabase.md).[dbName](archivedatabase.md#dbname)

___

### indices

• **indices**: [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\>[]

Inherited from: [ArchiveDatabase](archivedatabase.md).[indices](archivedatabase.md#indices)

___

### options

• `Optional` **options**: [*ArchiveDatabaseServerOptions*](../interfaces/archivedatabaseserveroptions.md)

Inherited from: [ArchiveDatabase](archivedatabase.md).[options](archivedatabase.md#options)

## Methods

### addItems

▸ **addItems**(`items`: X[], `options?`: { `debug?`: *boolean*  }): *Promise*<[*AddItemResult*](../interfaces/additemresult.md)[]\>

Main API for adding items to an Archive Database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | X[] | The items to add. |
| `options?` | *object* | - |
| `options.debug?` | *boolean* | - |

**Returns:** *Promise*<[*AddItemResult*](../interfaces/additemresult.md)[]\>

Defined in: src/archive.ts:138

___

### addItemsToIndex

▸ **addItemsToIndex**(`items`: X[], `index`: [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\>, `value`: *string*): *Promise*<string\>

Adds the items to the index, optionally requiring strictly ordered inserts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | X[] | The items to append to the index. |
| `index` | [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\> | The index the items should be appended within. |
| `value` | *string* | The index value of the items. |

**Returns:** *Promise*<string\>

Defined in: src/archive.ts:215

___

### compactIndex

▸ **compactIndex**(`index`: [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\>, `indexValue`: *string*): *Promise*<boolean\>

Adds another block to the skip-chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\> | The index to add another block within. |
| `indexValue` | *string* | The index value to add another block to. |

**Returns:** *Promise*<boolean\>

Defined in: src/archive.ts:276

___

### deleteIndex

▸ **deleteIndex**(`index`: [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\>, `indexValue`: *string*, `concurrency?`: *number*): *Promise*<boolean\>

Delete an index.  Used to cleanup, e.g. index from bad Author parse.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `index` | [*ArchiveServerIndex*](../interfaces/archiveserverindex.md)<X\> | - |
| `indexValue` | *string* | - |
| `concurrency` | *number* | 4 |

**Returns:** *Promise*<boolean\>

Defined in: src/archive.ts:348

___

### findBlockFor

▸ **findBlockFor**(`indexKey`: *string*, `indexValue`: *string*, `item`: *Partial*<X\>): *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `indexKey` | *string* |
| `indexValue` | *string* |
| `item` | *Partial*<X\> |

**Returns:** *Promise*<``null`` \| [*ArchiveIndexBlockOfType*](../interfaces/archiveindexblockoftype.md)<X\>\>

Inherited from: [ArchiveDatabase](archivedatabase.md)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:129

___

### findIndex

▸ **findIndex**(`indexKey`: *string*): [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `indexKey` | *string* |

**Returns:** [*ArchiveIndex*](../interfaces/archiveindex.md)<X\>

Inherited from: [ArchiveDatabase](archivedatabase.md)

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

Inherited from: [ArchiveDatabase](archivedatabase.md)

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

Inherited from: [ArchiveDatabase](archivedatabase.md)

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

Inherited from: [ArchiveDatabase](archivedatabase.md)

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

Inherited from: [ArchiveDatabase](archivedatabase.md)

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

Inherited from: [ArchiveDatabase](archivedatabase.md)

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

Inherited from: [ArchiveDatabase](archivedatabase.md)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:132
