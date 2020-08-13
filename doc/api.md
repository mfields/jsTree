<a name="module_@mfields/Tree"></a>

## @mfields/Tree

* [@mfields/Tree](#module_@mfields/Tree)
    * [~Tree](#module_@mfields/Tree..Tree)
        * [new Tree(config)](#new_module_@mfields/Tree..Tree_new)
        * _instance_
            * [.key](#module_@mfields/Tree..Tree+key) : <code>identifier</code>
            * [.parent](#module_@mfields/Tree..Tree+parent) : <code>identifier</code>
            * [.children](#module_@mfields/Tree..Tree+children) : <code>Array.&lt;Tree&gt;</code>
            * [.size](#module_@mfields/Tree..Tree+size) : <code>number</code>
            * [.add(descendant)](#module_@mfields/Tree..Tree+add) ⇒ <code>Tree</code>
            * [.delete(key)](#module_@mfields/Tree..Tree+delete) ⇒ <code>Tree</code>
            * [.forEach(func, thisArg)](#module_@mfields/Tree..Tree+forEach) ⇒ <code>undefined</code>
            * [.get(key)](#module_@mfields/Tree..Tree+get) ⇒ <code>Tree</code> \| <code>null</code>
            * [.has(key)](#module_@mfields/Tree..Tree+has) ⇒ <code>boolean</code>
            * [.isEmpty()](#module_@mfields/Tree..Tree+isEmpty) ⇒ <code>Boolean</code>
            * [.sort(options)](#module_@mfields/Tree..Tree+sort) ⇒ <code>Tree</code>
        * _static_
            * [.fromArray([trees], [options])](#module_@mfields/Tree..Tree.fromArray) ⇒ <code>Tree</code>
    * [~comparator](#module_@mfields/Tree..comparator) : <code>function</code>
    * [~identifier](#module_@mfields/Tree..identifier) : <code>null</code> \| <code>number</code> \| <code>string</code>
    * [~propValue](#module_@mfields/Tree..propValue) : <code>bigint</code> \| <code>boolean</code> \| <code>number</code> \| <code>string</code> \| <code>symbol</code> \| <code>undefined</code>

<a name="module_@mfields/Tree..Tree"></a>

### @mfields/Tree~Tree
Creates immutable objects that represent general trees.

**Kind**: inner class of [<code>@mfields/Tree</code>](#module_@mfields/Tree)  

* [~Tree](#module_@mfields/Tree..Tree)
    * [new Tree(config)](#new_module_@mfields/Tree..Tree_new)
    * _instance_
        * [.key](#module_@mfields/Tree..Tree+key) : <code>identifier</code>
        * [.parent](#module_@mfields/Tree..Tree+parent) : <code>identifier</code>
        * [.children](#module_@mfields/Tree..Tree+children) : <code>Array.&lt;Tree&gt;</code>
        * [.size](#module_@mfields/Tree..Tree+size) : <code>number</code>
        * [.add(descendant)](#module_@mfields/Tree..Tree+add) ⇒ <code>Tree</code>
        * [.delete(key)](#module_@mfields/Tree..Tree+delete) ⇒ <code>Tree</code>
        * [.forEach(func, thisArg)](#module_@mfields/Tree..Tree+forEach) ⇒ <code>undefined</code>
        * [.get(key)](#module_@mfields/Tree..Tree+get) ⇒ <code>Tree</code> \| <code>null</code>
        * [.has(key)](#module_@mfields/Tree..Tree+has) ⇒ <code>boolean</code>
        * [.isEmpty()](#module_@mfields/Tree..Tree+isEmpty) ⇒ <code>Boolean</code>
        * [.sort(options)](#module_@mfields/Tree..Tree+sort) ⇒ <code>Tree</code>
    * _static_
        * [.fromArray([trees], [options])](#module_@mfields/Tree..Tree.fromArray) ⇒ <code>Tree</code>

<a name="new_module_@mfields/Tree..Tree_new"></a>

#### new Tree(config)
Construct a general tree.

This constructor may be invoked with or without the `new` keyword to create
a general tree.

**Returns**: <code>Tree</code> - A new instance of Tree.  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>config</td><td><code>Object</code></td><td><p>Optional configuration object. If this parameter is
  not provided an empty tree will be constructed.</p>
</td>
    </tr><tr>
    <td>config.key</td><td><code>identifier</code></td><td><p>A unique identifier. A tree must not have an
  ancestor with the same key. Likewise, no two ancestors may share the same
  key. Defaults to <code>null</code>.</p>
</td>
    </tr><tr>
    <td>config.parent</td><td><code>identifier</code></td><td><p>The unique identifier of this
  tree&#39;s parent. Defaults to <code>null</code>.</p>
</td>
    </tr><tr>
    <td>config.children</td><td><code>Array.&lt;Tree&gt;</code></td><td><p>Zero or more trees to add as children.
  If a child&#39;s <code>parent</code> property is equal to <code>this.id</code> a reference will be
  saved. In the event that these two values do not match, a derivitive
  instance of the child will be created with its <code>parent</code> value modified to
  equal <code>this.id</code>. Default value is an empty array.</p>
</td>
    </tr><tr>
    <td>config.*</td><td><code>propValue</code></td><td><p>Zero or more custom properties may be added to the
  instance.</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(no parameters)*  

```
const empty = Tree()

console.log(empty.key) // null
console.log(empty.parent) // null
console.log(empty.children) // []
console.log(empty.size) // 0
console.log(empty.isEmpty()) // true
```
**Example** *(childless tree.)*  

```
const childless = Tree({ key: 66, parent: 55 })

console.log(childless.key) // 66
console.log(childless.parent) // 55
console.log(childless.children) // []
console.log(childless.size) // 1
console.log(childless.isEmpty()) // false
```
**Example** *(a perfect binary tree with height of 3.)*  

```
const tree = Tree({ key: 1, children: [
  Tree({ key: 2, children: [
    Tree({ key: 4 }),
    Tree({ key: 5 })
  ]}),
  Tree({ key: 3, children: [
    Tree({ key: 6 }),
    Tree({ key: 7 })
  ]})
]})

// Root
  console.log(tree.key) // 1
  console.log(tree.parent) // null
  console.log(tree.size) // 7

// Level 2
  console.log(tree.children[0].key) // 2
  console.log(tree.children[0].parent) // 1
  console.log(tree.children[0].size) // 3

  console.log(tree.children[1].key) // 3
  console.log(tree.children[1].parent) // 1
  console.log(tree.children[1].size) // 3

// Level 3
  console.log(tree.children[0].children[0].key) // 4
  console.log(tree.children[0].children[0].parent) // 2
  console.log(tree.children[0].children[0].size) // 1

  console.log(tree.children[0].children[1].key) // 5
  console.log(tree.children[0].children[1].parent) // 2
  console.log(tree.children[0].children[1].size) // 1

  console.log(tree.children[1].children[0].key) // 6
  console.log(tree.children[1].children[0].parent) // 3
  console.log(tree.children[1].children[0].size) // 1

  console.log(tree.children[1].children[1].key) // 7
  console.log(tree.children[1].children[1].parent) // 3
  console.log(tree.children[1].children[1].size) // 1
```
<a name="module_@mfields/Tree..Tree+key"></a>

#### tree.key : <code>identifier</code>
This tree's unique identifier.

**Kind**: instance property of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
<a name="module_@mfields/Tree..Tree+parent"></a>

#### tree.parent : <code>identifier</code>
This tree's parent's key.

**Kind**: instance property of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
<a name="module_@mfields/Tree..Tree+children"></a>

#### tree.children : <code>Array.&lt;Tree&gt;</code>
This tree's children represented as an array containing zero or more
`Tree` instances.

**Kind**: instance property of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
<a name="module_@mfields/Tree..Tree+size"></a>

#### tree.size : <code>number</code>
A whole number representing the total number of trees (root + all subtrees)
contained within this tree.

**Kind**: instance property of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
<a name="module_@mfields/Tree..Tree+add"></a>

#### tree.add(descendant) ⇒ <code>Tree</code>
Add a subtree. If the descendant's parent exists in this tree, the descendant
will be appended to it's parent. If the descendant's parent does not exist in
this tree, the descendant will be appended to this tree's root. If the
descendant is not an instance of Tree or it is an empty Tree, `this` will
be returned.

**Kind**: instance method of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
**Returns**: <code>Tree</code> - A new instance of Tree containing the descendant.  
**Since**: 1.0.0  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>descendant</td><td><code>Tree</code></td><td><p>The subtree to add.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_@mfields/Tree..Tree+delete"></a>

#### tree.delete(key) ⇒ <code>Tree</code>
Remove a subtree from this tree.

In cases where the key of the root tree is provided in the `key` parameter,
an empty tree will be returned.

**Kind**: instance method of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
**Since**: 1.0.0  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>identifier</code></td><td><p>The key of the tree to be deleted.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_@mfields/Tree..Tree+forEach"></a>

#### tree.forEach(func, thisArg) ⇒ <code>undefined</code>
Execute a given function once for each tree.

This method works in a very similar fashion to [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

**Kind**: instance method of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>func</td><td><code>function</code></td><td><p>The function to execute.</p>
</td>
    </tr><tr>
    <td>thisArg</td><td><code>object</code></td><td><p>Value to use as <code>this</code> when executing callback.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_@mfields/Tree..Tree+get"></a>

#### tree.get(key) ⇒ <code>Tree</code> \| <code>null</code>
Get reference to a subtree by key.

**Kind**: instance method of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
**Returns**: <code>Tree</code> \| <code>null</code> - The requested tree, if it exists; null otherwise.  
**Since**: 1.0.0  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>identifier</code></td><td><p>The <code>key</code> value of the tree to return.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_@mfields/Tree..Tree+has"></a>

#### tree.has(key) ⇒ <code>boolean</code>
Does this tree have a tree with a given key?

The method will consider keys in `this` tree as well as all subtrees.

**Kind**: instance method of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
**Returns**: <code>boolean</code> - `true` if the tree exists; `false` otherwise.  
**Since**: 1.1.0  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>key</td><td><code>identifier</code></td><td><p>The <code>key</code> of the tree to find.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_@mfields/Tree..Tree+isEmpty"></a>

#### tree.isEmpty() ⇒ <code>Boolean</code>
Is this tree empty?

An empty tree has the following properties:

```
  key: null
  parent: null
  children: []
  size: 0
```

**Kind**: instance method of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
**Returns**: <code>Boolean</code> - `true` if empty; `false` otherwise.  
<a name="module_@mfields/Tree..Tree+sort"></a>

#### tree.sort(options) ⇒ <code>Tree</code>
Recusively sort all children.

**Kind**: instance method of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>options</td><td><code>object</code></td><td></td><td><p>Optional sort configuration.</p>
</td>
    </tr><tr>
    <td>[options.comparator]</td><td><code>comparator</code></td><td></td><td><p>Custom sort function. Defaults to
  sorting by <code>key</code> in ascending order.</p>
</td>
    </tr><tr>
    <td>[options.deep]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Should all trees be sorted? When <code>true</code>
  this tree&#39;s children and all of its subtrees will be sorted. When <code>false</code>
  only this tree&#39;s children will be sorted.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_@mfields/Tree..Tree.fromArray"></a>

#### Tree.fromArray([trees], [options]) ⇒ <code>Tree</code>
Create a new tree from an array of trees.

Orphan collection.

Height reduction.

**Kind**: static method of [<code>Tree</code>](#module_@mfields/Tree..Tree)  
**Returns**: <code>Tree</code> - A composite tree containing all trees represented in the
  `trees` parameter.  
**Since**: 1.0.0  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[trees]</td><td><code>Array.&lt;Tree&gt;</code></td><td><code>[]</code></td><td><p>A list of Tree instances each with a size of 1.
  The behavior of this function is undefined when passed larger trees.</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td><p>Optional named parameters.</p>
</td>
    </tr><tr>
    <td>[options.height]</td><td><code>number</code></td><td><code>0</code></td><td><p>Optional height. The height that the
  generated tree is allowed grow to. If defined, this value must be an
  integer greater than 1.</p>
</td>
    </tr><tr>
    <td>[options.comparator]</td><td><code>comparator</code></td><td></td><td><p>Optional sort function.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_@mfields/Tree..comparator"></a>

### @mfields/Tree~comparator : <code>function</code>
Specifies a function that defines the sort order. Functions of this type are passed as the [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)
parameter of [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

**Kind**: inner typedef of [<code>@mfields/Tree</code>](#module_@mfields/Tree)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>a</td><td><code>Tree</code></td><td><p>The first tree for comparison.</p>
</td>
    </tr><tr>
    <td>b</td><td><code>Tree</code></td><td><p>The second tree for comparison.</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_@mfields/Tree..identifier"></a>

### @mfields/Tree~identifier : <code>null</code> \| <code>number</code> \| <code>string</code>
A unique identifier for a tree.

**Kind**: inner typedef of [<code>@mfields/Tree</code>](#module_@mfields/Tree)  
<a name="module_@mfields/Tree..propValue"></a>

### @mfields/Tree~propValue : <code>bigint</code> \| <code>boolean</code> \| <code>number</code> \| <code>string</code> \| <code>symbol</code> \| <code>undefined</code>
The value of a tree's custom property.

**Kind**: inner typedef of [<code>@mfields/Tree</code>](#module_@mfields/Tree)  
