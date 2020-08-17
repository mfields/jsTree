/** @module @mfields/Tree */

/**
 * Specifies a function that defines the sort order. Functions of this type are passed as the [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)
 * parameter of [Array.prototype.sort()]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}.
 *
 * @callback comparator
 * @arg {Tree} a - The first tree for comparison.
 * @arg {Tree} b - The second tree for comparison.
 */

/**
 * A unique identifier for a tree.
 * @typedef {(null|number|string)} identifier
 */
/**
 * Construct a general tree.
 *
 * This constructor may be invoked with or without the `new` keyword to create
 * a general tree.
 *
 * @class
 * @classdesc Creates immutable objects that represent general trees.
 *
 * @arg {Object} config - Optional configuration object. If this parameter is
 *   not provided an empty tree will be constructed.
 * @arg {identifier} config.key - A unique identifier. A tree must not have an
 *   ancestor with the same key. Likewise, no two ancestors may share the same
 *   key. Defaults to `null`.
 * @arg {identifier} config.parent - The unique identifier of this
 *   tree's parent. Defaults to `null`.
 * @arg {Tree[]} config.children - Zero or more trees to add as children.
 *   If a child's `parent` property is equal to `this.id` a reference will be
 *   saved. In the event that these two values do not match, a derivitive
 *   instance of the child will be created with its `parent` value modified to
 *   equal `this.id`. Default value is an empty array.
 * @arg {*} config.* Zero or more custom properties may be added to the
 *   instance. All values except `undefined` will be stored as properties
 *   directly on the returned object. Properties with a value of `undefined`
 *   will be ignored.
 *
 * @return {Tree} A new instance of Tree.
 *
 * @example <caption>no parameters</caption>
 *
 * ```
 * const empty = Tree()
 *
 * console.log(empty.key) // null
 * console.log(empty.parent) // null
 * console.log(empty.children) // []
 * console.log(empty.size) // 0
 * console.log(empty.isEmpty()) // true
 * ```
 *
 * @example <caption>childless tree.</caption>
 *
 * ```
 * const childless = Tree({ key: 66, parent: 55 })
 *
 * console.log(childless.key) // 66
 * console.log(childless.parent) // 55
 * console.log(childless.children) // []
 * console.log(childless.size) // 1
 * console.log(childless.isEmpty()) // false
 * ```
 *
 * @example <caption>a perfect binary tree with height of 3.</caption>
 *
 * ```
 * const tree = Tree({ key: 1, children: [
 *   Tree({ key: 2, children: [
 *     Tree({ key: 4 }),
 *     Tree({ key: 5 })
 *   ]}),
 *   Tree({ key: 3, children: [
 *     Tree({ key: 6 }),
 *     Tree({ key: 7 })
 *   ]})
 * ]})
 *
 * // Root
 *   console.log(tree.key) // 1
 *   console.log(tree.parent) // null
 *   console.log(tree.size) // 7
 *
 * // Level 2
 *   console.log(tree.children[0].key) // 2
 *   console.log(tree.children[0].parent) // 1
 *   console.log(tree.children[0].size) // 3
 *
 *   console.log(tree.children[1].key) // 3
 *   console.log(tree.children[1].parent) // 1
 *   console.log(tree.children[1].size) // 3
 *
 * // Level 3
 *   console.log(tree.children[0].children[0].key) // 4
 *   console.log(tree.children[0].children[0].parent) // 2
 *   console.log(tree.children[0].children[0].size) // 1
 *
 *   console.log(tree.children[0].children[1].key) // 5
 *   console.log(tree.children[0].children[1].parent) // 2
 *   console.log(tree.children[0].children[1].size) // 1
 *
 *   console.log(tree.children[1].children[0].key) // 6
 *   console.log(tree.children[1].children[0].parent) // 3
 *   console.log(tree.children[1].children[0].size) // 1
 *
 *   console.log(tree.children[1].children[1].key) // 7
 *   console.log(tree.children[1].children[1].parent) // 3
 *   console.log(tree.children[1].children[1].size) // 1
 * ```
 */
function Tree (config) {
  if (!(this instanceof Tree)) {
    return new Tree(config)
  }

  config = castObject(config)

  var key = 'key' in config ? castId(config.key) : null
  var parent = 'parent' in config ? castId(config.parent) : null
  var children = 'children' in config ? List(config.children, key) : List()
  var invalidKeys = ['key', 'parent', 'children', 'size']

  /**
   * This tree's unique identifier.
   * @type {identifier}
   */
  this.key = key

  /**
   * This tree's parent's key.
   * @type {identifier}
   */
  this.parent = parent

  /**
   * This tree's children represented as an array containing zero or more
   * `Tree` instances.
   * @type {Tree[]}
   */
  this.children = children.value

  /**
   * A whole number representing the total number of trees (root + all subtrees)
   * contained within this tree.
   * @type {number}
   */
  this.size = key !== null || parent !== null || children.length > 0
    ? 1 + children.size
    : 0

  Object.keys(config).forEach(function (key) {
    var value = config[key]
    if (invalidKeys.indexOf(key) > -1 || typeof value === 'undefined') {
      return
    }

    this[key] = value
  }, this)

  freeze (this)
}
/**
 * Add a subtree. If the descendant's parent exists in this tree, the descendant
 * will be appended to it's parent. If the descendant's parent does not exist in
 * this tree, the descendant will be appended to this tree's root. If the
 * descendant is not an instance of Tree or it is an empty Tree, `this` will
 * be returned.
 *
 * @arg {Tree} descendant - The subtree to add.
 *
 * @return {Tree} A new instance of Tree containing the descendant.
 *
 * @since 1.0.0
 */
Tree.prototype.add = function (descendant) {
  if (!(descendant instanceof Tree) || descendant.isEmpty()) {
    return this
  }

  var children
  var me = this.delete(descendant.key)
  var parent = this.get(descendant.parent)

  if (parent === null) {
    parent = this
  }

  while (parent) {
    children = List(parent.children).toMap()
    children[descendant.key] = descendant
    children = Object.keys(children).reduce(function (output, key) {
      output.push(children[key])
      return output
    }, [])

    descendant = cloneTree(parent, { children: children })
    parent = me.get(descendant.parent)
  }

  return descendant
}
/**
 * Remove a subtree from this tree.
 *
 * In cases where the key of the root tree is provided in the `key` parameter,
 * an empty tree will be returned.
 *
 * @arg {identifier} key - The key of the tree to be deleted.
 * @return {Tree}
 *
 * @since 1.0.0
 */
Tree.prototype.delete = function (key) {
  var children
  var newParent
  var tree
  var parent

  // Return an empty tree when root is requested.
  if (key === this.key) {
    return new this.constructor()
  }

  tree = this.get(key)

  // The requested tree cannot be found. Return this.
  if (tree === null) {
    return this
  }

  parent = this.get(tree.parent)
  while (parent) {
    children = parent.children.reduce(function (c, child) {
      if (tree.key !== key && tree.key === child.key) {
        c.push(tree) // Push the modified child.
      } else if (child.key !== key) {
        c.push(child) // Push a reference to the original child.
      }
      return c
    }, [])

    tree = cloneTree(parent, { children: children })

    newParent = this.get(tree.parent)
    if (newParent === null || newParent.key === parent.key) {
      break
    } else {
      parent = newParent
    }
  }

  return tree
}
/**
 * Execute a given function once for each tree.
 *
 * This method works in a very similar fashion to [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
 *
 * @param {function} func - The function to execute.
 * @param {object} thisArg - Value to use as `this` when executing callback.
 * @return {undefined}
 */
Tree.prototype.forEach = function (func, thisArg) {
  var stop = func.call(thisArg, this, this.key)
  if (!stop) {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].forEach(func, thisArg)
    }
  }
}
/**
 * Get reference to a subtree by key.
 *
 * @arg {identifier} key - The `key` value of the tree to return.
 * @return {Tree|null} The requested tree, if it exists; null otherwise.
 *
 * @since 1.0.0
 */
Tree.prototype.get = function (key) {
  var output = null

  this.forEach(function (tree) {
    if (tree.key === key) {
      output = tree
      return true // break
    }
    return false // continue
  })

  return output
}
/**
 * Does this tree have a tree with a given key?
 *
 * The method will consider keys in `this` tree as well as all subtrees.
 *
 * @arg {identifier} key - The `key` of the tree to find.
 * @return {boolean} `true` if the tree exists; `false` otherwise.
 *
 * @since 1.1.0
 */
Tree.prototype.has = function (key) {
  var output = false

  this.forEach(function (tree) {
    if (tree.key === key) {
      output = true
      return true // break
    }
    return false // continue
  })

  return output
}
/**
 * Is this tree empty?
 *
 * An empty tree has the following properties:
 *
 * ```
 *   key: null
 *   parent: null
 *   children: []
 *   size: 0
 * ```
 *
 * @return {Boolean} `true` if empty; `false` otherwise.
 */
Tree.prototype.isEmpty = function () {
  return this.size === 0 && Object.keys(this).length === 4
}
/**
 * Recusively sort all children.
 *
 * @arg {object} options Optional sort configuration.
 * @arg {comparator} [options.comparator] Custom sort function. Defaults to
 *   sorting by `key` in ascending order.
 * @arg {boolean} [options.deep = true] Should all trees be sorted? When `true`
 *   this tree's children and all of its subtrees will be sorted. When `false`
 *   only this tree's children will be sorted.
 *
 * @return {Tree}
 */
Tree.prototype.sort = function (options) {
  options = castObject(options)
  options.deep = !('deep' in options && !options.deep)

  var children = List(this.children)
  var sorted = children.sort(options.comparator)
  if (options.deep) {
    sorted = sorted.reduce(function (output, tree) {
      output.push(tree.sort(options))
      return output
    }, [])
  }

  return children.equals(sorted) ? this : cloneTree(this, { children: sorted })
}
/**
 * Create a new tree from an array of trees.
 *
 * Orphan collection.
 *
 * Height reduction.
 *
 * @arg {Tree[]} [trees = []] - A list of Tree instances each with a size of 1.
 *   The behavior of this function is undefined when passed larger trees.
 * @arg {object} [options = {}] - Optional named parameters.
 * @arg {number} [options.height = 0] - Optional height. The height that the
 *   generated tree is allowed grow to. If defined, this value must be an
 *   integer greater than 1.
 * @arg {comparator} [options.comparator] Optional sort function.
 *
 * @return {Tree} A composite tree containing all trees represented in the
 *   `trees` parameter.
 *
 * @since 1.0.0
 */
Tree.fromArray = function (trees, options) {
  trees = Array.isArray(trees) ? trees : []

  options = castObject(options)
  options.height = 'height' in options ? options.height : 0
  options.comparator = 'comparator' in options ? options.comparator : undefined

  var assembled = List(trees).assemble(options.height, options.comparator)

  if (assembled.length === 1) {
    return assembled.value[0]
  } else {
    return Tree({ children: assembled })
  }
}

Object.freeze(Tree)

/**
 * Construct a list of General Trees.
 *
 * @arg {Tree[]} trees
 * @arg {Null|Number|String} parent
 *
 * @return {List}
 *   @prop {Number} length An integer representing the total number of valid
 *     trees passed in the `list` parameter and available in the `value` property.
 *     The value does not include subtrees.
 *   @prop {Number} size Total number of valid trees in the list including
 *     subtrees. This value will always be greater than or equal to the value
 *     of length.
 *   @prop {Tree[]} value A list of trees.
 *
 * @private
 * @since 1.0.0
 */
function List (trees, parent) {
  if (!(this instanceof List)) {
    return new List(trees, parent)
  }

  if (trees instanceof List) {
    trees = trees.value
  } else if (!Array.isArray(trees)) {
    trees = []
  }

  var size = 0
  this.value = trees.reduce(function (v, tree) {
    if (tree instanceof Tree) {
      tree = typeof parent !== 'undefined' && parent !== tree.parent
        ? cloneTree(tree, { parent: parent })
        : tree
      v.push(tree)
      size = size + tree.size
    }
    return v
  }, [])

  this.size = size
  this.length = this.value.length
}
/**
 * Assemble.
 *
 * @arg {Number} height Optional
 * @arg {Function} sort Optional.
 * @return {List}
 */
List.prototype.assemble = function (height, sort) {
  var assembled = []

  // Sort in descending order by parent key.
  var sorted = this.flatten().sort(function (a, b) {
    if (a.parent === null || b.parent === null) {
      return -1
    }
    return b.parent - a.parent
  })

  var map = List(sorted).toMap()

  Object.keys(sorted).forEach(function (i) {
    var key = sorted[i].key
    var tree = map[key]

    var ancestry = determineAncestry(tree, map, height)
    if (typeof map[ancestry[0]] !== 'undefined') {
      map[ancestry[0]] = map[ancestry[0]].add(tree)
      delete (map[tree.key])
    }
  })

  Object.keys(map).forEach(function (key) {
    assembled.push(map[key])
  })

  return new List(assembled)
}
List.prototype.flatten = function () {
  var trees = []
  this.value.forEach(function (tree) {
    if (tree.size === 1) {
      trees.push(tree)
    } else {
      tree.forEach(function (subtree) {
        if (subtree.size === 1) {
          trees.push(subtree)
        } else {
          trees.push(cloneTree(subtree, { children: [] }))
        }
      })
    }
  })
  return trees
}
List.prototype.forEach = function (func, thisArg) {
  return this.value.forEach(func, thisArg)
}
List.prototype.get = function (index) {
  return this.value[index]
}
List.prototype.sort = function (sort) {
  if (typeof sort !== 'function') {
    sort = function (a, b) {
      if (a.key < b.key) {
        return -1
      }
      if (a.key > b.key) {
        return 1
      }
      return 0
    }
  }

  var sorted

  if (this.length < 2) {
    return this
  } else {
    sorted = List(this.value.concat().sort(sort))
    return this.equals(sorted) ? this : sorted
  }
}
List.prototype.reduce = function (func, initial) {
  return List(this.value.reduce(func, initial))
}
/**
 * Does this list equal a given list?
 *
 * @arg {Mixed} aught Any value that might be equal to this.
 * @arg {Object} options Optional.
 *   @prop {String} mode When 'strict' both lists must have trees in the same
 *   order. When 'lenient', order is not considered. Default: 'strict'.
 *
 * @return {Boolean} True if aught equals `this`, false otherwise.
 */
List.prototype.equals = function (aught, options) {
  options = castObject(options)

  if (
    !(aught instanceof List) ||
    this.length !== aught.length ||
    this.size !== aught.size
  ) {
    return false
  }

  var i
  switch (options.mode) {
    case 'lenient' :
      for (i = 0; i < this.value.length; i++) {
        if (aught.value.indexOf(this.value[i]) === -1) {
          return false
        }
      }
      break
    case 'strict' :
    default :
      for (i = 0; i < this.value.length; i++) {
        if (this.value[i] !== aught.value[i]) {
          return false
        }
      }
      break
  }

  return true
}
/**
 * Convert value property to an object whose keys represent the keys of
 * trees and whose values are instances of GeneralTree.
 *
 * @return {Object} map
 */
List.prototype.toMap = function () {
  return this.value.reduce(function (map, tree) {
    if (typeof map[tree.key] !== 'undefined') {
      if (tree.isEmpty()) {
        return map
      }
      throw new TypeError('Duplicate tree.')
    }
    map[tree.key] = tree
    return map
  }, Object.create(null))
}

/**
 * Return a  a value appropriate for use as the
 * value of the `key` or `parent` property of a Tree instance.
 *
 * @arg {*} key Any value. If value is an identifier it will be returned. All
 *   other values, including NaN, will be cast to null.
 *
 * @return {identifier}
 *
 * @private
 * @since 1.0.0
 */
function castId (key) {
  if (
    typeof key === 'string' ||
    (
      typeof key === 'number' &&
      key === Number(key) &&
      key !== Infinity &&
      key !== -Infinity
    )
  ) {
    return key
  } else {
    return null
  }
}
function castObject (o) {
  return typeof o === 'object' && o !== null ? o : Object.create(null)
}
/**
 * Create a derivitive tree.
 *
 * @arg {Tree} tree
 * @arg {config} [override]
 * @return {Tree} A clone of the current instance with potentially .
 *
 * @private
 * @since 1.0.0
 */
function cloneTree (tree, override) {
  override = castObject(override)

  var props = {
    children: tree.children,
    key: tree.key,
    parent: tree.parent
  }

  Object.keys(tree).forEach(function (key) {
    props[key] = tree[key]
  }, tree)

  Object.keys(override).forEach(function (key) {
    props[key] = override[key]
  })

  return Tree(props)
}
/**
 * Recursively freeze an object.
 *
 * @arg {*} o - The value to freeze.
 * @return undefined
 */
function freeze (o) {
  if (typeof o !== 'object') {
    return
  }

  Object.getOwnPropertyNames(o).forEach(function (key) {
    var value = o[key]
    if (value && typeof value === 'object' && !(value instanceof Tree)) {
      freeze(value)
    }
  })

  Object.freeze(o)
  Object.freeze(Object.getPrototypeOf(o))
}
function determineAncestry (tree, map, height) {
  tree = castObject(tree)
  var ancestry = []
  var parent = tree.parent
  var depth = height - 1

  if (depth < 1) {
    return [parent]
  }

  while (map[parent]) {
    ancestry.push(parent)
    parent = map[parent].parent
  }

  if (ancestry.length > depth) {
    return ancestry.reduce(function (output, ancestor, i) {
      if (i >= ancestry.length - depth) {
        output.push(ancestor)
      }
      return output
    }, [])
  }

  return ancestry
}

export { Tree, List, cloneTree }
