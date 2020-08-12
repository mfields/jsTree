# Tree

This module exports a single constructor, `Tree()`, which can be used to create an immutable representation of a [general tree](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/GenTreeIntro.html). Please see the [API Documentation](https://github.com/mfields/jsTree/blob/master/doc/api.md) for usage information.

## Installation

Install using npm.

```
npm install @mfields/tree
```

## Usage

As a CommonJS module:

```
const { Tree } = require('@mfields/tree')

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
