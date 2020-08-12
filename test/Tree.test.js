import { Tree } from '../src/index.js'
import { List } from '../src/private.js'
import { expectEmpty, expectTree } from './helpers/expect.js'
import { pbt2, pbt3 } from './helpers/data.js'

const A = null // Short name for the id of the adopter tree.
const N = null // Short name for null.
const U = undefined // Short name for undefined.

describe('Tree()', () => {
  it('is a function.', () => {
    expect(typeof Tree).toBe('function')
  })
  it('has frozen prototype', () => {
    var node = new Tree({ key: 14 })
    expect(() => { node.__proto__.test = '' }).toThrow()
  })
  it('can be constructed without the "new" keyword.', () => {
    expect(() => { Tree() }).not.toThrow(Error)
  })
  it('preserves node order after creation.', () => {
    var t = Tree({
      key: 0,
      children: [
        Tree({ key: 12 }),
        Tree({ key: 20 }),
        Tree({ key: 51 }),
        Tree({ key: 37 }),
        Tree({ key: 22 })
      ]
    })
    expect(t.children[0].key).toBe(12)
    expect(t.children[1].key).toBe(20)
    expect(t.children[2].key).toBe(51)
    expect(t.children[3].key).toBe(37)
    expect(t.children[4].key).toBe(22)
  })
})
describe('Tree(props)', () => {
  it('may be any value.', () => {
    expect(() => { Tree(undefined) }).not.toThrow()
    expect(() => { Tree(null) }).not.toThrow()
    expect(() => { Tree(true) }).not.toThrow()
    expect(() => { Tree(false) }).not.toThrow()
    expect(() => { Tree(123) }).not.toThrow()
    expect(() => { Tree(1.23) }).not.toThrow()
    expect(() => { Tree('abc') }).not.toThrow()
    expect(() => { Tree(NaN) }).not.toThrow()
    expect(() => { Tree(Infinity) }).not.toThrow()
    expect(() => { Tree(Symbol()) }).not.toThrow()
    expect(() => { Tree([]) }).not.toThrow()
    expect(() => { Tree({}) }).not.toThrow()
  })
})
describe('Tree(props.key)', () => {
  it('may be any value', () => {
    expect(() => { Tree({ key: undefined }) }).not.toThrow()
    expect(() => { Tree({ key: null }) }).not.toThrow()
    expect(() => { Tree({ key: true }) }).not.toThrow()
    expect(() => { Tree({ key: false }) }).not.toThrow()
    expect(() => { Tree({ key: 123 }) }).not.toThrow()
    expect(() => { Tree({ key: 1.23 }) }).not.toThrow()
    expect(() => { Tree({ key: 'abc' }) }).not.toThrow()
    expect(() => { Tree({ key: NaN }) }).not.toThrow()
    expect(() => { Tree({ key: Infinity }) }).not.toThrow()
    expect(() => { Tree({ key: Symbol() }) }).not.toThrow()
    expect(() => { Tree({ key: [] }) }).not.toThrow()
    expect(() => { Tree({ key: {} }) }).not.toThrow()
  })
})
describe('Tree(props.parent)', () => {
  it('may be any value.', () => {
    expect(() => { Tree({ parent: undefined }) }).not.toThrow()
    expect(() => { Tree({ parent: null }) }).not.toThrow()
    expect(() => { Tree({ parent: true }) }).not.toThrow()
    expect(() => { Tree({ parent: false }) }).not.toThrow()
    expect(() => { Tree({ parent: 123 }) }).not.toThrow()
    expect(() => { Tree({ parent: 1.23 }) }).not.toThrow()
    expect(() => { Tree({ parent: 'abc' }) }).not.toThrow()
    expect(() => { Tree({ parent: NaN }) }).not.toThrow()
    expect(() => { Tree({ parent: Infinity }) }).not.toThrow()
    expect(() => { Tree({ parent: Symbol() }) }).not.toThrow()
    expect(() => { Tree({ parent: [] }) }).not.toThrow()
    expect(() => { Tree({ parent: {} }) }).not.toThrow()
  })
})
describe('Tree(props.children)', () => {
  it('may be any value.', () => {
    expect(() => { Tree({ children: undefined }) }).not.toThrow()
    expect(() => { Tree({ children: null }) }).not.toThrow()
    expect(() => { Tree({ children: true }) }).not.toThrow()
    expect(() => { Tree({ children: false }) }).not.toThrow()
    expect(() => { Tree({ children: 123 }) }).not.toThrow()
    expect(() => { Tree({ children: 1.23 }) }).not.toThrow()
    expect(() => { Tree({ children: 'abc' }) }).not.toThrow()
    expect(() => { Tree({ children: NaN }) }).not.toThrow()
    expect(() => { Tree({ children: Infinity }) }).not.toThrow()
    expect(() => { Tree({ children: Symbol() }) }).not.toThrow()
    expect(() => { Tree({ children: [] }) }).not.toThrow()
    expect(() => { Tree({ children: {} }) }).not.toThrow()
  })
})
describe('Tree(props.*)', () => {
  it('may be undefined, null, boolean, number, string, or synbol.', () => {
    expect(() => { Tree({ food: undefined }) }).not.toThrow()
    expect(() => { Tree({ food: null }) }).not.toThrow()
    expect(() => { Tree({ isGood: true }) }).not.toThrow()
    expect(() => { Tree({ isBad: false }) }).not.toThrow()
    expect(() => { Tree({ number: 123 }) }).not.toThrow()
    expect(() => { Tree({ number: 1.23 }) }).not.toThrow()
    expect(() => { Tree({ number: Infinity }) }).not.toThrow()
    expect(() => { Tree({ number: -Infinity }) }).not.toThrow()
    expect(() => { Tree({ number: NaN }) }).not.toThrow()
    expect(() => { Tree({ string: 'Twilight Zone' }) }).not.toThrow()
    expect(() => { Tree({ symbol: Symbol() }) }).not.toThrow()
  })
  it('unrecognized values do not throw an error.', () => {
    expect(() => { Tree({ pojo: {} }) }).not.toThrow()
    expect(() => { Tree({ array: [] }) }).not.toThrow()
    expect(() => { Tree({ map: new Map }) }).not.toThrow()
    expect(() => { Tree({ set: new Set() }) }).not.toThrow()
  })
  it('.', () => {
    var tree = Tree({ a: undefined })
    expect(Object.keys(tree).indexOf('a')).toBe(-1)
  })
})
describe('Properties.', () => {
  describe('children', () => {
    it('is immutable.', () => {
      expect(() => { Tree().children = '' }).toThrow()
    })
    it('is an empty array for childless trees.', () => {
      expect(Tree().children).toEqual([])
    })
    it('ris an array of direct descendants.', () => {
      var children = pbt3().children
      expect(children[0] instanceof Tree).toBe(true)
      expect(children[1] instanceof Tree).toBe(true)
      expect(children[0].key).toBe(2)
      expect(children[1].key).toBe(3)
    })
  })
  describe('key', () => {
    it('is immutable.', () => {
      expect(() => { Tree().key = '' }).toThrow()
    })
    it(`is null when props.key is null.`, () => {
      expect(Tree({ key: null }).key).toBe(null)
    })
    it('is a number when props.key is a valid number.', () => {
      expect(Tree({ key: 123 }).key).toBe(123)
      expect(Tree({ key: 1.23 }).key).toBe(1.23)
    })
    it('is a string when props.key is a string.', () => {
      expect(Tree({ key: 'abc' }).key).toBe('abc')
    })
    it(`is null when props.key is of an unsupported type.`, () => {
      expect(Tree({ key: undefined }).key).toBe(null)
      expect(Tree({ key: true }).key).toBe(null)
      expect(Tree({ key: false }).key).toBe(null)
      expect(Tree({ key: [] / [] }).key).toBe(null)
      expect(Tree({ key: 1 / 0 }).key).toBe(null)
      expect(Tree({ key: Symbol() }).key).toBe(null)
      expect(Tree({ key: [] }).key).toBe(null)
      expect(Tree({ key: {} }).key).toBe(null)
    })
  })
  describe('parent', () => {
    it('is immutable.', () => {
      expect(() => { Tree().parent = '' }).toThrow()
    })
    it(`is null when props.key is null.`, () => {
      expect(Tree({ parent: null }).parent).toBe(null)
    })
    it('is a number when props.key is a valid number.', () => {
      expect(Tree({ parent: 123 }).parent).toBe(123)
      expect(Tree({ parent: 1.23 }).parent).toBe(1.23)
    })
    it('is a string when props.key is a string.', () => {
      expect(Tree({ parent: 'abc' }).parent).toBe('abc')
    })
    it(`is null when props.key is of an unsupported type.`, () => {
      expect(Tree({ parent: undefined }).parent).toBe(null)
      expect(Tree({ parent: true }).parent).toBe(null)
      expect(Tree({ parent: false }).parent).toBe(null)
      expect(Tree({ parent: [] / [] }).parent).toBe(null)
      expect(Tree({ parent: 1 / 0 }).parent).toBe(null)
      expect(Tree({ parent: Symbol() }).parent).toBe(null)
      expect(Tree({ parent: [] }).parent).toBe(null)
      expect(Tree({ parent: {} }).parent).toBe(null)
    })
  })
  describe('size', () => {
    it('is immutable.', () => {
      expect(() => { Tree().size = '' }).toThrow()
    })
    it('is zero for empty trees.', () => {
      expect(Tree().size).toEqual(0)
    })
    it('is one for non-empty childless trees.', () => {
      expect(Tree({ key: 14 }).size).toEqual(1)
    })
  })
})
describe('Tree.prototype.add()', () => {
  it('is an immutable prototype method.', () => {
    expect(typeof Tree().add).toBe('function')
    expect(() => { Tree().add = '' }).toThrow()
  })
  it('returns self when descendant in not an instance of Tree.', () => {
    var tree = Tree({ key: 99, parent: 86 })
    expect(tree.add() === tree).toBe(true)
    expect(tree.add(null) === tree).toBe(true)
    expect(tree.add(true) === tree).toBe(true)
    expect(tree.add(false) === tree).toBe(true)
    expect(tree.add(123) === tree).toBe(true)
    expect(tree.add(Infinity) === tree).toBe(true)
    expect(tree.add(NaN) === tree).toBe(true)
    expect(tree.add(Symbol()) === tree).toBe(true)
    expect(tree.add([]) === tree).toBe(true)
    expect(tree.add({}) === tree).toBe(true)
    expect(tree.add(new Set()) === tree).toBe(true)
    expect(tree.add(new Map()) === tree).toBe(true)
  })
  it('adds a dot to a dot.', () => {
    var $1 = Tree({ key: 1, parent: 0 })
    var $2 = Tree({ key: 2, parent: 1 })
    var a = $1.add($2)

    expect(a instanceof Tree).toBe(true)
    expect(a.size).toBe(2)
    expect(a.get(1) === $1).toBe(false)
    expect(a.get(2) === $2).toBe(true)
  })
  it('adds a dot to a dot then adds another dot. Chainable.', () => {
    var $1 = Tree({ key: 1, parent: 0 })
    var $2 = Tree({ key: 2, parent: 1 })
    var $3 = Tree({ key: 3, parent: 2 })

    var a = $1.add($2).add($3)

    expect(a instanceof Tree).toBe(true)
    expect(a.get(1) === $1).toBe(false)
    expect(a.get(1).size).toBe(3)
    expect(a.get(2) === $2).toBe(false)
    expect(a.get(2).size).toBe(2)
    expect(a.get(3) === $3).toBe(true)
    expect(a.get(3).size).toBe(1)
  })
  it('adds tree with unrecognized parent to root.', () => {
    var a = pbt3()
    var b = a.add(Tree({ key: 8, parent: 777 }))

    expect(a.size).toBe(7)
    expect(b.size).toBe(8)
    expect(b.get(8).parent).toBe(1)
  })
  it('relocates a subtree.', () => {
    var a = pbt3()
    var b = a.add(Tree({ key: 4, parent: 7 }))

    expect(a.size).toBe(7)
    expect(b.size).toBe(7)
    expect(a.get(2).size).toBe(3)
    expect(b.get(2).size).toBe(2)
    expect(a.get(7).size).toBe(1)
    expect(b.get(7).size).toBe(2)
  })
  it('uses structural sharing.', () => {
    var a = pbt3()
    var b = a.add(Tree({ key: 8, parent: 1 }))

    // Derivatives.
    expect(a.get(1) === b.get(1)).toBe(false)

    // References.
    expect(a.get(2) === b.get(2)).toBe(true)
    expect(a.get(3) === b.get(3)).toBe(true)
    expect(a.get(4) === b.get(4)).toBe(true)
    expect(a.get(5) === b.get(5)).toBe(true)
    expect(a.get(6) === b.get(6)).toBe(true)
    expect(a.get(7) === b.get(7)).toBe(true)
  })
  it('returns self when empty tree is added.', () => {
    var a = pbt3()
    var b = a.add(Tree())
    expect(a === b).toBe(true)
  })
})
describe('Tree.prototype.delete()', () => {
  it('is an immutable prototype method.', () => {
    expect(typeof Tree().delete).toBe('function')
    expect(() => { Tree().delete = '' }).toThrow()
  })
  it('removes a leaf.', () => {
    var a = pbt3()
    var b = a.delete(7)

    // Unchanged
    expect(b.get(2) === a.get(2)).toBe(true)
    expect(b.get(4) === a.get(4)).toBe(true)
    expect(b.get(5) === a.get(5)).toBe(true)
    expect(b.get(6) === a.get(6)).toBe(true)

    // Changed
    expect(b.get(1) === a.get(1)).toBe(false)
    expect(b.get(1).size).toBe(6)
    expect(b.get(3) === a.get(3)).toBe(false)
    expect(b.get(3).size).toBe(2)

    // Removed
    expect(b.get(7)).toBe(null)
  })
  it('removes a branch.', () => {
    var a = pbt3()
    var b = a.delete(3)

    expect(b.size).toBe(4)

    // Unchanged
    expect(b.get(2) === a.get(2)).toBe(true)
    expect(b.get(4) === a.get(4)).toBe(true)
    expect(b.get(5) === a.get(5)).toBe(true)

    // Changed
    expect(b.get(1).size).toBe(4)

    // Removed
    expect(b.get(3)).toBe(null)
    expect(b.get(6)).toBe(null)
    expect(b.get(7)).toBe(null)
  })
  it('replaces root node with default Tree.', () => {
    var a = pbt3()
    var b = a.delete(1)
    expectEmpty(b)

    // Removed
    expect(b.get(1)).toBe(null)
    expect(b.get(2)).toBe(null)
    expect(b.get(3)).toBe(null)
    expect(b.get(4)).toBe(null)
    expect(b.get(5)).toBe(null)
    expect(b.get(6)).toBe(null)
    expect(b.get(7)).toBe(null)
  })
  it('Uses structural sharing.', () => {
    var a = pbt3()
    var b = a.delete(7)

    // References.
    expect(a.get(2) === b.get(2)).toBe(true)
    expect(a.get(4) === b.get(4)).toBe(true)
    expect(a.get(5) === b.get(5)).toBe(true)
    expect(a.get(6) === b.get(6)).toBe(true)
  })
  it('returns itself when an unrecognized key is given .', () => {
    var a = Tree({ key: 1, parent: 0 })
    var b = a.delete(3)

    expect(a === b).toBe(true)
  })
})
describe('Tree.prototype.forEach()', () => {
  it('is an immutable prototype method.', () => {
    expect(typeof Tree().forEach).toBe('function')
    expect(() => { Tree().forEach = '' }).toThrow()
  })
  it('iterates 3 times for tree with size of 3.', () => {
    var count = 0
    pbt2().forEach(function() {
      count++
    })
    expect(count).toBe(3)
  })
  it('iterates 7 times for tree with size of 7.', () => {
    var count = 0
    pbt3().forEach(function() {
      count++
    })
    expect(count).toBe(7)
  })
  it('is able to use "this" from an outside scope.', () => {
    var maker = function (arg) {
      arg.forEach(function (tree) {
        this[tree.key] = 'Tree with key of ' + tree.key
      }, this)
    }

    var a = new maker(pbt2())

    expect(a[1]).toBe('Tree with key of 1')
    expect(a[2]).toBe('Tree with key of 2')
    expect(a[3]).toBe('Tree with key of 3')
  })
})
describe('Tree.prototype.get()', () => {
  it('is an immutable prototype method.', () => {
    expect(typeof Tree().get).toBe('function')
    expect(() => { Tree().get = '' }).toThrow()
  })
  it('returns appropriate subtree.', () => {
    var tree = pbt3()
    expect(tree.get(1) instanceof Tree).toBe(true)
    expect(tree.get(2) instanceof Tree).toBe(true)
    expect(tree.get(3) instanceof Tree).toBe(true)
    expect(tree.get(4) instanceof Tree).toBe(true)
    expect(tree.get(5) instanceof Tree).toBe(true)
    expect(tree.get(6) instanceof Tree).toBe(true)
    expect(tree.get(7) instanceof Tree).toBe(true)
    expect(tree.get(1).key).toBe(1)
    expect(tree.get(2).key).toBe(2)
    expect(tree.get(3).key).toBe(3)
    expect(tree.get(4).key).toBe(4)
    expect(tree.get(5).key).toBe(5)
    expect(tree.get(6).key).toBe(6)
    expect(tree.get(7).key).toBe(7)
  })
})
describe('Tree.prototype.isEmpty()', () => {
  it('is an immutable prototype method.', () => {
    expect(typeof Tree().isEmpty).toBe('function')
    expect(() => { Tree().isEmpty = '' }).toThrow()
  })
  it('returns true for an empty tree.', () => {
    expect(Tree().isEmpty()).toBe(true)
  })
  it('returns false when tree has a key.', () => {
    expect(Tree({ key: 123 }).isEmpty()).toBe(false)
  })
  it('returns false when tree has a parent.', () => {
    expect(Tree({ parent: 123 }).isEmpty()).toBe(false)
  })
  it('returns false when tree has a child.', () => {
    expect(Tree({ children: [ Tree({ key: 123 }) ] }).isEmpty()).toBe(false)
  })
  it('returns false when tree has a custom property.', () => {
    expect(Tree({ rock: 'lobster' }).isEmpty()).toBe(false)
  })
})
describe('Tree.prototype.sort()', () => {
  it('is an immutable prototype method.', () => {
    expect(typeof Tree().sort).toBe('function')
    expect(() => { Tree().sort = '' }).toThrow()
  })
  it('returns self when tree size is 1.', () => {
    var a = Tree()
    expect(a === a.sort()).toBe(true)
  })
  it('returns self when tree size is 2.', () => {
    var a = Tree({ key: 1, parent: 0, children: [
      Tree({ key: 2, parent: 1 })
    ] })
    expect(a === a.sort()).toBe(true)
  })
  it('returns self when tree is already sorted.', () => {
    var a = Tree({ key: 1, parent: 0, children: [
      Tree({ key: 2, parent: 1 }),
      Tree({ key: 3, parent: 1 }),
      Tree({ key: 4, parent: 1 }),
      Tree({ key: 5, parent: 1 })
    ] })
    expect(a === a.sort()).toBe(true)
  })
  it('returns a clone with children sorted. 1 level deep.', () => {
    var a = Tree({ key: 5, parent: 1 })
    var b = Tree({ key: 4, parent: 1 })
    var c = Tree({ key: 3, parent: 1 })
    var d = Tree({ key: 2, parent: 1 })
    var backward = Tree({ key: 1, parent: 0, children: [a, b, c, d] })
    var forward = backward.sort()

    expect(backward === forward).toBe(false)
    expect(forward.children[0]).toEqual(d)
    expect(forward.children[1]).toEqual(c)
    expect(forward.children[2]).toEqual(b)
    expect(forward.children[3]).toEqual(a)
  })
  it('sorts an unordered tree with a height of 3.', () => {
    var _7 = Tree({ key: 7, parent: 3 })
    var _6 = Tree({ key: 6, parent: 3 })
    var _5 = Tree({ key: 5, parent: 2 })
    var _4 = Tree({ key: 4, parent: 2 })
    var _3 = Tree({ key: 3, parent: 1, children: [_7, _6] })
    var _2 = Tree({ key: 2, parent: 1, children: [_5, _4] })
    var _1 = Tree({ key: 1, parent: 0, children: [_3, _2] })

    var s = _1.sort()

    // Derivative.
    expect(s.key).toEqual(1)
    expect(s.children[0].key).toEqual(2)
    expect(s.children[1].key).toEqual(3)

    // Reference.
    expect(_4 === s.children[0].children[0]).toBe(true)
    expect(_5 === s.children[0].children[1]).toBe(true)
    expect(_6 === s.children[1].children[0]).toBe(true)
    expect(_7 === s.children[1].children[1]).toBe(true)
  })
  describe('options.comparator', () => {
    it('sorts tree with a custom function.', () => {
      var a = Tree({ key: 6, parent: 1, name: 'thumb' })
      var b = Tree({ key: 5, parent: 1, name: 'index' })
      var c = Tree({ key: 4, parent: 1, name: 'middle' })
      var d = Tree({ key: 3, parent: 1, name: 'ring' })
      var e = Tree({ key: 2, parent: 1, name: 'pinky' })
      var A = Tree({ key: 1, children: [a, b, c, d, e] })

      var sort = function (a, b) {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
      }

      var sorted = A.sort({ comparator: sort })

      expect(sorted.children[0] === b).toBe(true)
      expect(sorted.children[1] === c).toBe(true)
      expect(sorted.children[2] === e).toBe(true)
      expect(sorted.children[3] === d).toBe(true)
      expect(sorted.children[4] === a).toBe(true)
    })
  })
  describe('options.deep = false', () => {
    it('does not sort beyond level 2.', () => {
      var _7 = Tree({ key: 7, parent: 3 })
      var _6 = Tree({ key: 6, parent: 3 })
      var _5 = Tree({ key: 5, parent: 2 })
      var _4 = Tree({ key: 4, parent: 2 })
      var _3 = Tree({ key: 3, parent: 1, children: [_7, _6] })
      var _2 = Tree({ key: 2, parent: 1, children: [_5, _4] })
      var _1 = Tree({ key: 1, parent: 0, children: [_3, _2] })

      var s = _1.sort({ deep: false })

      // Equality: Leafs are references.
      expect(_1 === s).toBe(false)
      expect(_2 === s).toBe(false)
      expect(_3 === s).toBe(false)
      expect(_5 === s.children[0].children[0]).toBe(true)
      expect(_4 === s.children[0].children[1]).toBe(true)

      expect(_6 === s.children[1].children[1]).toBe(true)
      expect(_7 === s.children[1].children[0]).toBe(true)

      // Indetity: Root + branch nodes are modified clones.
      expect(s.key).toEqual(1)
      expect(s.children[0].key).toEqual(2)
      expect(s.children[1].key).toEqual(3)
    })
  })
})
/**
 * Tree Shapes
 *
 * Tree shapes are represented by a single letter indicating the type of tree
 * followed by an integer representing the size of the tree.
 *
 *   A: Dot/Line
 *      Descendants have a degree of 0 or 1.
 *      This shape is a 'dot' when its size is 1.
 *      This shape is a 'line' when its size is greater than 1.
 *
 *   B: Triangle
 *      Root has 2 or more children. Each child has a degree of 0.
 *
 *   C: Snake Tongue
 *      A line whose last node has 2 children.
 *
 *   D: Hook
 *      Root has degree of two.
 *      Child 1 has degree of zero.
 *      Child 2 is a line consisting of all remaining nodes.
 */
describe('Tree.fromArray()', () => {
  it('is an immutable static method.', () => {
    expect(typeof Tree.fromArray).toBe('function')
    expect(() => { Tree.fromArray = '' }).toThrow()
  })
})
describe('Tree.fromArray(trees)', () => {
  it('is optional.', () => {
    expect(() => { Tree.fromArray() }).not.toThrow()
  })
  it('may be an empty array.', () => {
    expect(() => { Tree.fromArray([]) }).not.toThrow()
  })
  it('may be an array of unique Tree instances.', () => {
    expect(() => {
      Tree.fromArray([
        Tree({ key: 1, parent: 0}),
        Tree({ key: 2, parent: 1}),
        Tree({ key: 3, parent: 2})
      ])
    }).not.toThrow()
  })
  it('must not be an array containing Tree instances with duplicate ids.', () => {
    expect(() => {
      Tree.fromArray([ Tree({ key: 1 }), Tree({ key: 1 }) ])
    }).toThrow()
  })
  it('may not be null.', () => {
    expectEmpty(Tree.fromArray(null))
  })
  it('may not be boolean.', () => {
    expectEmpty(Tree.fromArray(true))
    expectEmpty(Tree.fromArray(false))
  })
  it('may not be NaN.', () => {
    expectEmpty(Tree.fromArray(NaN))
  })
  it('may not be a number.', () => {
    expectEmpty(Tree.fromArray(Infinity))
    expectEmpty(Tree.fromArray(123))
    expectEmpty(Tree.fromArray(1.23))
  })
  it('may not be a string.', () => {
    expectEmpty(Tree.fromArray('abc'))
  })
  it('may not be a symbol.', () => {
    expectEmpty(Tree.fromArray(Symbol()))
  })
  it('may not be an object that is not an array.', () => {
    expectEmpty(Tree.fromArray({}))
    expectEmpty(Tree.fromArray(() => {}))
    expectEmpty(Tree.fromArray(new Map()))
    expectEmpty(Tree.fromArray(new Set()))
  })
  it('ignores trees with size less than 1.', () => {
    expectEmpty(Tree.fromArray([Tree(), Tree(), Tree()]))
  })
  it('accepts trees with size greater than 1.', () => {
    var a = [
      Tree({ key: 1, parent: 0 }),
      Tree({ key: 2, parent: 1, children: [Tree({ key: 3 })] }),
      Tree({ key: 4, parent: 3 }),
      Tree({ key: 5, parent: 4 }),
      Tree({ key: 6, parent: 5, children: [Tree({ key: 7 })] })
    ]

    var b = Tree.fromArray(a)
    expect(b.get(7).size).toBe(1)
    expect(b.get(6).size).toBe(2)
    expect(b.get(5).size).toBe(3)
    expect(b.get(4).size).toBe(4)
    expect(b.get(3).size).toBe(5)
    expect(b.get(2).size).toBe(6)
    expect(b.get(1).size).toBe(7)
  })
  describe('parses a one node tree.', () => {
    it('parses dot: A1', () => {
      var node = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([node])
      expectTree(tree.get(5), 5, 4, 0, 1, 0)
      expect(node === tree).toBe(true)
    })
  })
  describe('parses a two node tree.', () => {
    it('parses line: A2', () => {
      var a = Tree({ key: 5, parent: 0 })
      var b = Tree({ key: 6, parent: 5 })
      var tree = Tree.fromArray([a, b])
      expectTree(tree.get(5), 5, 0, 1, 2, 0)
      expectTree(tree.get(6), 6, 5, 0, 1, 1)
    })
  })
  describe('parses three node trees.', () => {
    it('parses line. A3', () => {
      var a = Tree({ key: 7, parent: 0 })
      var b = Tree({ key: 8, parent: 7 })
      var c = Tree({ key: 9, parent: 8 })
      var tree = Tree.fromArray([a, b, c])
      expectTree(tree.get(7), 7, 0, 1, 3, 0)
      expectTree(tree.get(8), 8, 7, 1, 2, 1)
      expectTree(tree.get(9), 9, 8, 0, 1, 2)
    })
    it('parses triangle: B3', () => {
      var a = Tree({ key: 7, parent: 0 })
      var b = Tree({ key: 8, parent: 7 })
      var c = Tree({ key: 9, parent: 7 })
      var tree = Tree.fromArray([a, b, c])
      expectTree(tree.get(7), 7, 0, 2, 3, 0)
      expectTree(tree.get(8), 8, 7, 0, 1, 1)
      expectTree(tree.get(9), 9, 7, 0, 1, 1)
    })
  })
  describe('parses four node trees.', () => {
    it('parses line: A4.', () => {
      var tree = Tree.fromArray([
        Tree({ key: 1, parent: 0 }),
        Tree({ key: 2, parent: 1 }),
        Tree({ key: 3, parent: 2 }),
        Tree({ key: 4, parent: 3 })
      ])
      expectTree(tree.get(1), 1, 0, 1, 4, 0)
      expectTree(tree.get(2), 2, 1, 1, 3, 1)
      expectTree(tree.get(3), 3, 2, 1, 2, 2)
      expectTree(tree.get(4), 4, 3, 0, 1, 3)
    })
    it('parses triangle: B4.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 1 })
      var tree = Tree.fromArray([a, b, c, d])
      expectTree(tree.get(1), 1, 0, 3, 4, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 0, 1, 1)
      expectTree(tree.get(4), 4, 1, 0, 1, 1)
    })
    it('parses serpent tongue: C4', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 2 })
      var tree = Tree.fromArray([a, b, c, d])

      expectTree(tree.get(1), 1, 0, 1, 4, 0)
      expectTree(tree.get(2), 2, 1, 2, 3, 1)
      expectTree(tree.get(3), 3, 2, 0, 1, 2)
      expectTree(tree.get(4), 4, 2, 0, 1, 2)
    })
    it('parses hook: D4', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 3 })
      var tree = Tree.fromArray([a, b, c, d])
      expectTree(tree.get(1), 1, 0, 2, 4, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 1, 2, 1)
      expectTree(tree.get(4), 4, 3, 0, 1, 2)
    })
  })
  describe('parses five node trees.', () => {
    it('parses line: A5.', () => {
      var tree = Tree.fromArray([
        Tree({ key: 1, parent: 0 }),
        Tree({ key: 2, parent: 1 }),
        Tree({ key: 3, parent: 2 }),
        Tree({ key: 4, parent: 3 }),
        Tree({ key: 5, parent: 4 })
      ])
      expectTree(tree.get(1), 1, 0, 1, 5, 0)
      expectTree(tree.get(2), 2, 1, 1, 4, 1)
      expectTree(tree.get(3), 3, 2, 1, 3, 2)
      expectTree(tree.get(4), 4, 3, 1, 2, 3)
      expectTree(tree.get(5), 5, 4, 0, 1, 4)
    })
    it('parses triangle: B5.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 1 })
      var e = Tree({ key: 5, parent: 1 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 4, 5, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 0, 1, 1)
      expectTree(tree.get(4), 4, 1, 0, 1, 1)
      expectTree(tree.get(5), 5, 1, 0, 1, 1)
    })
    it('parses serpent tongue: C5.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 3 })
      var e = Tree({ key: 5, parent: 3 })
      var tree = Tree.fromArray([a, b, c, d, e])

      expectTree(tree.get(1), 1, 0, 1, 5, 0)
      expectTree(tree.get(2), 2, 1, 1, 4, 1)
      expectTree(tree.get(3), 3, 2, 2, 3, 2)
      expectTree(tree.get(4), 4, 3, 0, 1, 3)
      expectTree(tree.get(5), 5, 3, 0, 1, 3)
    })
    it('parses hook: D5.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 3 })
      var e = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 2, 5, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 1, 3, 1)
      expectTree(tree.get(4), 4, 3, 1, 2, 2)
      expectTree(tree.get(5), 5, 4, 0, 1, 3)
    })
    it('parses 1 child: D4.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 2 })
      var e = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 1, 5, 0)
      expectTree(tree.get(2), 2, 1, 2, 4, 1)
      expectTree(tree.get(3), 3, 2, 0, 1, 2)
      expectTree(tree.get(4), 4, 2, 1, 2, 2)
      expectTree(tree.get(5), 5, 4, 0, 1, 3)
    })
    it('parses 1 child: B4.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 2 })
      var e = Tree({ key: 5, parent: 2 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 1, 5, 0)
      expectTree(tree.get(2), 2, 1, 3, 4, 1)
      expectTree(tree.get(3), 3, 2, 0, 1, 2)
      expectTree(tree.get(4), 4, 2, 0, 1, 2)
      expectTree(tree.get(5), 5, 2, 0, 1, 2)
    })
    it('parses 2 children: A2 A2.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 1 })
      var e = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 2, 5, 0)
      expectTree(tree.get(2), 2, 1, 1, 2, 1)
      expectTree(tree.get(3), 3, 2, 0, 1, 2)
      expectTree(tree.get(4), 4, 1, 1, 2, 1)
      expectTree(tree.get(5), 5, 4, 0, 1, 2)
    })
    it('parses 2 children: A1 B3.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 3 })
      var e = Tree({ key: 5, parent: 3 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 2, 5, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 2, 3, 1)
      expectTree(tree.get(4), 4, 3, 0, 1, 2)
      expectTree(tree.get(5), 5, 3, 0, 1, 2)
    })
    it('parses 3 children: A1 A1 A2.', () => {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 1 })
      var e = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 3, 5, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 0, 1, 1)
      expectTree(tree.get(4), 4, 1, 1, 2, 1)
      expectTree(tree.get(5), 5, 4, 0, 1, 2)
    })
  })
  describe('adopts orphans', () => {
    it('adopts 2 orphaned dots.', () => {
        var root = Tree({ key: 7 })
        var child = Tree({ key: 8 })
        var tree = Tree.fromArray([root, child])
        expectTree(tree.get(A), A, N, 2, 3, 0)
        expectTree(tree.get(7), 7, N, 0, 1, 1)
        expectTree(tree.get(8), 8, N, 0, 1, 1)
    })
    it('adopts 3 orphaned dots.', () => {
      var a = Tree({ key: 7, parent: 0 })
      var b = Tree({ key: 8, parent: 0 })
      var c = Tree({ key: 9, parent: 0 })
      var tree = Tree.fromArray([a, b, c])
      expectTree(tree.get(A), A, N, 3, 4, 0)
      expectTree(tree.get(7), 7, N, 0, 1, 1)
      expectTree(tree.get(8), 8, N, 0, 1, 1)
      expectTree(tree.get(9), 9, N, 0, 1, 1)
    })
    it('adopts 4 orphaned dots.', () => {
      var a = Tree({ key: 6, parent: 0 })
      var b = Tree({ key: 7, parent: 0 })
      var c = Tree({ key: 8, parent: 0 })
      var d = Tree({ key: 9, parent: 0 })
      var tree = Tree.fromArray([a, b, c, d])

      expectTree(tree.get(A), A, N, 4, 5, 0)
      expectTree(tree.get(6), 6, N, 0, 1, 1)
      expectTree(tree.get(7), 7, N, 0, 1, 1)
      expectTree(tree.get(8), 8, N, 0, 1, 1)
      expectTree(tree.get(9), 9, N, 0, 1, 1)
    })
    it('adopts 5 orphaned dots.', () => {
      var a = Tree({ key: 5, parent: 0 })
      var b = Tree({ key: 6, parent: 0 })
      var c = Tree({ key: 7, parent: 0 })
      var d = Tree({ key: 8, parent: 0 })
      var e = Tree({ key: 9, parent: 0 })
      var tree = Tree.fromArray([a, b, c, d, e])

      expectTree(tree.get(A), A, N, 5, 6, 0)
      expectTree(tree.get(5), 5, N, 0, 1, 1)
      expectTree(tree.get(6), 6, N, 0, 1, 1)
      expectTree(tree.get(7), 7, N, 0, 1, 1)
      expectTree(tree.get(8), 8, N, 0, 1, 1)
      expectTree(tree.get(9), 9, N, 0, 1, 1)
    })
  })
})
describe('Tree.fromArray(trees, options.height)', () => {
  function A11 () {
    return [
      Tree({ key:  1, parent:  0 }),
      Tree({ key:  2, parent:  1 }),
      Tree({ key:  3, parent:  2 }),
      Tree({ key:  4, parent:  3 }),
      Tree({ key:  5, parent:  4 }),
      Tree({ key:  6, parent:  5 }),
      Tree({ key:  7, parent:  6 }),
      Tree({ key:  8, parent:  7 }),
      Tree({ key:  9, parent:  8 }),
      Tree({ key: 10, parent:  9 }),
      Tree({ key: 11, parent: 10 })
    ]
  }
  it('has no effect when values is larger than the tree\'s height.', () => {
    var expectNormal = function (t) {
      expectTree(t.get(1), 1, 0, 2, 7, 0)
      expectTree(t.get(2), 2, 1, 2, 3, 1)
      expectTree(t.get(3), 3, 1, 2, 3, 1)
      expectTree(t.get(4), 4, 2, 0, 1, 2)
      expectTree(t.get(5), 5, 2, 0, 1, 2)
      expectTree(t.get(6), 6, 3, 0, 1, 2)
      expectTree(t.get(7), 7, 3, 0, 1, 2)
    }

    var a = Tree({ key: 1, parent: 0 })
    var b = Tree({ key: 2, parent: 1 })
    var c = Tree({ key: 3, parent: 1 })
    var d = Tree({ key: 4, parent: 2 })
    var e = Tree({ key: 5, parent: 2 })
    var f = Tree({ key: 6, parent: 3 })
    var g = Tree({ key: 7, parent: 3 })

    var tree1 = Tree.fromArray([a, b, c, d, e, f, g], { height: 2 })

    expectTree(tree1,        1, 0, 6, 7, 0)
    expectTree(tree1.get(2), 2, 1, 0, 1, 1)
    expectTree(tree1.get(3), 3, 1, 0, 1, 1)
    expectTree(tree1.get(4), 4, 1, 0, 1, 1)
    expectTree(tree1.get(5), 5, 1, 0, 1, 1)
    expectTree(tree1.get(6), 6, 1, 0, 1, 1)
    expectTree(tree1.get(7), 7, 1, 0, 1, 1)

    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 3 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 4 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 5 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 6 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 7 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 8 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 9 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 10 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 11 }))
  })
  it('smushes line A11 to height of 11.', () => {
    var t = Tree.fromArray(A11(), { height: 11 })
    expectTree(t,          1,  0, 1, 11,  0)
    expectTree(t.get(2),   2,  1, 1, 10,  1)
    expectTree(t.get(3),   3,  2, 1,  9,  2)
    expectTree(t.get(4),   4,  3, 1,  8,  3)
    expectTree(t.get(5),   5,  4, 1,  7,  4)
    expectTree(t.get(6),   6,  5, 1,  6,  5)
    expectTree(t.get(7),   7,  6, 1,  5,  6)
    expectTree(t.get(8),   8,  7, 1,  4,  7)
    expectTree(t.get(9),   9,  8, 1,  3,  8)
    expectTree(t.get(10), 10,  9, 1,  2,  9)
    expectTree(t.get(11), 11, 10, 0,  1, 10)
  })
  it('smushes line A11 to height of 10.', () => {
    var t = Tree.fromArray(A11(), { height: 10 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 1,  7, 4)
    expectTree(t.get(6),   6, 5, 1,  6, 5)
    expectTree(t.get(7),   7, 6, 1,  5, 6)
    expectTree(t.get(8),   8, 7, 1,  4, 7)
    expectTree(t.get(9),   9, 8, 2,  3, 8)
    expectTree(t.get(10), 10, 9, 0,  1, 9)
    expectTree(t.get(11), 11, 9, 0,  1, 9)
  })
  it('smushes line A11 to height of 9.', () => {
    var t = Tree.fromArray(A11(), { height: 9 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 1,  7, 4)
    expectTree(t.get(6),   6, 5, 1,  6, 5)
    expectTree(t.get(7),   7, 6, 1,  5, 6)
    expectTree(t.get(8),   8, 7, 3,  4, 7)
    expectTree(t.get(9),   9, 8, 0,  1, 8)
    expectTree(t.get(10), 10, 8, 0,  1, 8)
    expectTree(t.get(11), 11, 8, 0,  1, 8)
  })
  it('smushes line A11 to height of 8.', () => {
    var t = Tree.fromArray(A11(), { height: 8 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 1,  7, 4)
    expectTree(t.get(6),   6, 5, 1,  6, 5)
    expectTree(t.get(7),   7, 6, 4,  5, 6)
    expectTree(t.get(8),   8, 7, 0,  1, 7)
    expectTree(t.get(9),   9, 7, 0,  1, 7)
    expectTree(t.get(10), 10, 7, 0,  1, 7)
    expectTree(t.get(11), 11, 7, 0,  1, 7)
  })
  it('smushes line A11 to height of 7.', () => {
    var t = Tree.fromArray(A11(), { height: 7 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 1,  7, 4)
    expectTree(t.get(6),   6, 5, 5,  6, 5)
    expectTree(t.get(7),   7, 6, 0,  1, 6)
    expectTree(t.get(8),   8, 6, 0,  1, 6)
    expectTree(t.get(9),   9, 6, 0,  1, 6)
    expectTree(t.get(10), 10, 6, 0,  1, 6)
    expectTree(t.get(11), 11, 6, 0,  1, 6)
  })
  it('smushes line A11 to height of 6.', () => {
    var t = Tree.fromArray(A11(), { height: 6 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 6,  7, 4)
    expectTree(t.get(6),   6, 5, 0,  1, 5)
    expectTree(t.get(7),   7, 5, 0,  1, 5)
    expectTree(t.get(8),   8, 5, 0,  1, 5)
    expectTree(t.get(9),   9, 5, 0,  1, 5)
    expectTree(t.get(10), 10, 5, 0,  1, 5)
    expectTree(t.get(11), 11, 5, 0,  1, 5)
  })
  it('smushes line A11 to height of 5.', () => {
    var t = Tree.fromArray(A11(), { height: 5 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 7,  8, 3)
    expectTree(t.get(5),   5, 4, 0,  1, 4)
    expectTree(t.get(6),   6, 4, 0,  1, 4)
    expectTree(t.get(7),   7, 4, 0,  1, 4)
    expectTree(t.get(8),   8, 4, 0,  1, 4)
    expectTree(t.get(9),   9, 4, 0,  1, 4)
    expectTree(t.get(10), 10, 4, 0,  1, 4)
    expectTree(t.get(11), 11, 4, 0,  1, 4)
  })
  it('smushes line A11 to height of 4.', () => {
    var t = Tree.fromArray(A11(), { height: 4 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 8,  9, 2)
    expectTree(t.get(4),   4, 3, 0,  1, 3)
    expectTree(t.get(5),   5, 3, 0,  1, 3)
    expectTree(t.get(6),   6, 3, 0,  1, 3)
    expectTree(t.get(7),   7, 3, 0,  1, 3)
    expectTree(t.get(8),   8, 3, 0,  1, 3)
    expectTree(t.get(9),   9, 3, 0,  1, 3)
    expectTree(t.get(10), 10, 3, 0,  1, 3)
    expectTree(t.get(11), 11, 3, 0,  1, 3)
  })
  it('smushes line A11 to height of 3.', () => {
    var t = Tree.fromArray(A11(), { height: 3 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 9, 10, 1)
    expectTree(t.get(3),   3, 2, 0,  1, 2)
    expectTree(t.get(4),   4, 2, 0,  1, 2)
    expectTree(t.get(5),   5, 2, 0,  1, 2)
    expectTree(t.get(6),   6, 2, 0,  1, 2)
    expectTree(t.get(7),   7, 2, 0,  1, 2)
    expectTree(t.get(8),   8, 2, 0,  1, 2)
    expectTree(t.get(9),   9, 2, 0,  1, 2)
    expectTree(t.get(10), 10, 2, 0,  1, 2)
    expectTree(t.get(11), 11, 2, 0,  1, 2)
  })
  it('smushes line A11 to height of 2.', () => {
    var t = Tree.fromArray(A11(), { height: 2 })
    expectTree(t,          1, 0, 10, 11, 0)
    expectTree(t.get(2),   2, 1,  0,  1, 1)
    expectTree(t.get(3),   3, 1,  0,  1, 1)
    expectTree(t.get(4),   4, 1,  0,  1, 1)
    expectTree(t.get(5),   5, 1,  0,  1, 1)
    expectTree(t.get(6),   6, 1,  0,  1, 1)
    expectTree(t.get(7),   7, 1,  0,  1, 1)
    expectTree(t.get(8),   8, 1,  0,  1, 1)
    expectTree(t.get(9),   9, 1,  0,  1, 1)
    expectTree(t.get(10), 10, 1,  0,  1, 1)
    expectTree(t.get(11), 11, 1,  0,  1, 1)
  })
})
