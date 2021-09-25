[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveIndex

# Interface: ArchiveIndex<X\>

Each property is indexed separately.

## Type parameters

| Name |
| :------ |
| `X` |

## Hierarchy

- **ArchiveIndex**

  ↳ [*ArchiveServerIndex*](archiveserverindex.md)

## Table of contents

### Properties

- [blockDatabase](archiveindex.md#blockdatabase)
- [getter](archiveindex.md#getter)
- [name](archiveindex.md#name)
- [sorter](archiveindex.md#sorter)
- [tipDatabase](archiveindex.md#tipdatabase)

## Properties

### blockDatabase

• **blockDatabase**: [*ArchiveBlockDatabase*](../classes/archiveblockdatabase.md)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:90

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

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:88

___

### name

• **name**: *string*

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

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:89

___

### tipDatabase

• **tipDatabase**: [*ArchiveTipDatabase*](../classes/archivetipdatabase.md)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:91
