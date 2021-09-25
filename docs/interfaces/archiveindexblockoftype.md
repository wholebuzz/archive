[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveIndexBlockOfType

# Interface: ArchiveIndexBlockOfType<X\>

Extends block with index references.

## Type parameters

| Name |
| :------ |
| `X` |

## Hierarchy

- [*ArchiveBlockOfType*](archiveblockoftype.md)<X\>

  ↳ **ArchiveIndexBlockOfType**

## Table of contents

### Properties

- [data](archiveindexblockoftype.md#data)
- [header](archiveindexblockoftype.md#header)
- [index](archiveindexblockoftype.md#index)
- [indexValue](archiveindexblockoftype.md#indexvalue)
- [nextBlocksFirstKey](archiveindexblockoftype.md#nextblocksfirstkey)
- [nextBlocksLastKey](archiveindexblockoftype.md#nextblockslastkey)
- [version](archiveindexblockoftype.md#version)

## Properties

### data

• **data**: X[]

Inherited from: [ArchiveBlockOfType](archiveblockoftype.md).[data](archiveblockoftype.md#data)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:28

___

### header

• **header**: [*ArchiveBlockHeader*](archiveblockheader.md)

Inherited from: [ArchiveBlockOfType](archiveblockoftype.md).[header](archiveblockoftype.md#header)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:20

___

### index

• **index**: [*ArchiveIndex*](archiveindex.md)<X\>

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:97

___

### indexValue

• **indexValue**: *string*

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:98

___

### nextBlocksFirstKey

• `Optional` **nextBlocksFirstKey**: *Partial*<X\>[]

Inherited from: [ArchiveBlockOfType](archiveblockoftype.md).[nextBlocksFirstKey](archiveblockoftype.md#nextblocksfirstkey)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:29

___

### nextBlocksLastKey

• `Optional` **nextBlocksLastKey**: *Partial*<X\>[]

Inherited from: [ArchiveBlockOfType](archiveblockoftype.md).[nextBlocksLastKey](archiveblockoftype.md#nextblockslastkey)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:30

___

### version

• `Optional` **version**: *string* \| *number*

Inherited from: [ArchiveBlockOfType](archiveblockoftype.md).[version](archiveblockoftype.md#version)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:22
