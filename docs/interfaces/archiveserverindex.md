[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveServerIndex

# Interface: ArchiveServerIndex<X\>

Extends [ArchiveIndex](archiveindex.md) with server database interfaces.

## Type parameters

| Name |
| :------ |
| `X` |

## Hierarchy

- [*ArchiveIndex*](archiveindex.md)<X\>

  ↳ **ArchiveServerIndex**

## Table of contents

### Properties

- [blockDatabase](archiveserverindex.md#blockdatabase)
- [getter](archiveserverindex.md#getter)
- [name](archiveserverindex.md#name)
- [sorter](archiveserverindex.md#sorter)
- [tipDatabase](archiveserverindex.md#tipdatabase)

## Properties

### blockDatabase

• **blockDatabase**: [*ArchiveBlockDatabaseServer*](../classes/archiveblockdatabaseserver.md)

Overrides: [ArchiveIndex](archiveindex.md).[blockDatabase](archiveindex.md#blockdatabase)

Defined in: src/archive.ts:93

___

### getter

• **getter**: (`a`: X) => *string*[]

#### Type declaration

▸ (`a`: X): *string*[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | X |

**Returns:** *string*[]

Inherited from: [ArchiveIndex](archiveindex.md).[getter](archiveindex.md#getter)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:88

___

### name

• **name**: *string*

Inherited from: [ArchiveIndex](archiveindex.md).[name](archiveindex.md#name)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:87

___

### sorter

• **sorter**: (`a`: X, `b`: X) => *number*

#### Type declaration

▸ (`a`: X, `b`: X): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | X |
| `b` | X |

**Returns:** *number*

Inherited from: [ArchiveIndex](archiveindex.md).[sorter](archiveindex.md#sorter)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:89

___

### tipDatabase

• **tipDatabase**: [*ArchiveTipDatabaseServer*](../classes/archivetipdatabaseserver.md)

Overrides: [ArchiveIndex](archiveindex.md).[tipDatabase](archiveindex.md#tipdatabase)

Defined in: src/archive.ts:94
