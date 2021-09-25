[@wholebuzz/archive](../README.md) / [Exports](../modules.md) / ArchiveDatabaseServerOptions

# Interface: ArchiveDatabaseServerOptions

Parameters for archive database server.

## Hierarchy

- [*ArchiveDatabaseOptions*](archivedatabaseoptions.md)

  ↳ **ArchiveDatabaseServerOptions**

## Table of contents

### Properties

- [concurrency](archivedatabaseserveroptions.md#concurrency)
- [dispose](archivedatabaseserveroptions.md#dispose)
- [primaryIndex](archivedatabaseserveroptions.md#primaryindex)
- [strictOrdering](archivedatabaseserveroptions.md#strictordering)
- [targetBlockSize](archivedatabaseserveroptions.md#targetblocksize)

## Properties

### concurrency

• `Optional` **concurrency**: *number*

Defined in: src/archive.ts:101

___

### dispose

• `Optional` **dispose**: () => *void*

#### Type declaration

▸ (): *void*

**Returns:** *void*

Inherited from: [ArchiveDatabaseOptions](archivedatabaseoptions.md).[dispose](archivedatabaseoptions.md#dispose)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:108

___

### primaryIndex

• `Optional` **primaryIndex**: *number*

Defined in: src/archive.ts:103

___

### strictOrdering

• `Optional` **strictOrdering**: *boolean*

True when the archive blocks are already sorted.

Inherited from: [ArchiveDatabaseOptions](archivedatabaseoptions.md).[strictOrdering](archivedatabaseoptions.md#strictordering)

Defined in: node_modules/@wholebuzz/archive-base/lib/index.d.ts:107

___

### targetBlockSize

• `Optional` **targetBlockSize**: *number*

Defined in: src/archive.ts:102
