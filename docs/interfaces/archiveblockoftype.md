[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveBlockOfType

# Interface: ArchiveBlockOfType<X\>

Inherits [ArchiveBlock](archiveblock.md) overriding `data`.

## Type parameters

| Name |
| :------ |
| `X` |

## Hierarchy

- [*ArchiveBlock*](archiveblock.md)

  ↳ **ArchiveBlockOfType**

  ↳↳ [*ArchiveIndexBlockOfType*](archiveindexblockoftype.md)

## Table of contents

### Properties

- [data](archiveblockoftype.md#data)
- [header](archiveblockoftype.md#header)
- [nextBlocksFirstKey](archiveblockoftype.md#nextblocksfirstkey)
- [nextBlocksLastKey](archiveblockoftype.md#nextblockslastkey)
- [version](archiveblockoftype.md#version)

## Properties

### data

• **data**: X[]

Overrides: [ArchiveBlock](archiveblock.md).[data](archiveblock.md#data)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:28

___

### header

• **header**: [*ArchiveBlockHeader*](archiveblockheader.md)

Inherited from: [ArchiveBlock](archiveblock.md).[header](archiveblock.md#header)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:20

___

### nextBlocksFirstKey

• `Optional` **nextBlocksFirstKey**: *Partial*<X\>[]

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:29

___

### nextBlocksLastKey

• `Optional` **nextBlocksLastKey**: *Partial*<X\>[]

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:30

___

### version

• `Optional` **version**: *string* \| *number*

Inherited from: [ArchiveBlock](archiveblock.md).[version](archiveblock.md#version)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:22
