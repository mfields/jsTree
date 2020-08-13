# Tree

This module exports a single constructor, `Tree()`, which can be used to create an immutable representation of a [general tree](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/GenTreeIntro.html).

## Installation

Install using npm.

```
npm install @mfields/tree
```

## Usage

Require into module:

```
const { Tree } = require('@mfields/tree')
```

The [`Tree()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#new-treeconfig) constructor can be used to create nested trees:

```
const tree = new Tree({
  key: 12,
  name: 'California',
  children: [
    Tree({ key: 13, name: 'Los Angeles' }),
    Tree({ key: 14, name: 'San Francisco' }),
    Tree({ key: 15, name: 'Santa Cruz' })
  ]
})
```

The [`Tree.fromArray()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#module_@mfields/Tree..Tree.fromArray) method can be used to assemble a tree from a flat list:

```
const trees = [
  Tree({ key: 12, name: 'California' }),
  Tree({ key: 13, parent: 12, name: 'Los Angeles' }),
  Tree({ key: 14, parent: 12, name: 'San Francisco' }),
  Tree({ key: 15, parent: 12, name: 'Santa Cruz' })
]

const tree = Tree.fromArray(trees)

console.log(tree)

Tree {key: 12, parent: null, children: Array(3), size: 4, name: "California"}
  children: Array(3)
    0: Tree {key: 13, parent: 12, children: Array(0), size: 1, name: "Los Angeles"}
    1: Tree {key: 14, parent: 12, children: Array(0), size: 1, name: "San Francisco"}
    2: Tree {key: 15, parent: 12, children: Array(0), size: 1, name: "Santa Cruz"}
    length: 3
    __proto__: Array(0)
  key: 12
  name: "California"
  parent: null
  size: 4
```

The following prototype methods exist:

 1. [`add()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#module_@mfields/Tree..Tree+add) - Incorporate one tree into another.
 1. [`delete()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#treedeletekey--tree) - Remove a node or branch from a tree.
 1. [`forEach()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#treeforeachfunc-thisarg--undefined) - Execute a callback function on each subtree.
 1. [`get()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#treegetkey--tree--null) - Return a reference to a subtree.
  1. [`has()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#treehaskey--boolean) - Does this tree contain a tree with a given key?
 1. [`isEmpty()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#treeisempty--boolean) - Are all properties of this tree empty?
 1. [`sort()`](https://github.com/mfields/jsTree/blob/master/doc/api.md#treesortoptions--tree) - Recusively sort all children.

Please see the [API Documentation](https://github.com/mfields/jsTree/blob/master/doc/api.md) for usage information.

