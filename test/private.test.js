import { Tree } from '../src/index.js'
import { List, cloneTree } from '../src/private.js'
import { expectClone, expectEmptyList, expectList } from './helpers/expect.js'
import { pbt2, pbt3 } from './helpers/data.js'

describe('cloneTree()', () => {
  it('is a fucntion.', () => {
    expect(typeof cloneTree).toBe('function')
  })
  it('returns an instance of Tree.', () => {
    expect(cloneTree(Tree()) instanceof Tree).toBe(true)
  })
  it('returns a shallow copy (height 2).', () => {
    var a = pbt2()
    var b = cloneTree(a)
    expectClone(a, b)
    expect(b.get(2) === a.get(2)).toBe(true)
    expect(b.get(3) === a.get(3)).toBe(true)
  })
  it('returns a shallow copy (height 3).', () => {
    var a = pbt2()
    var b = cloneTree(a)
    expectClone(a, b)
    expect(b.get(2) === a.get(2)).toBe(true)
    expect(b.get(3) === a.get(3)).toBe(true)
    expect(b.get(4) === a.get(4)).toBe(true)
    expect(b.get(5) === a.get(5)).toBe(true)
    expect(b.get(6) === a.get(6)).toBe(true)
    expect(b.get(7) === a.get(7)).toBe(true)
  })
  it('returns a shallow copy with modified key.', () => {
    var a = pbt3()
    var b = cloneTree(a, { key: 777 })

    // Renamed.
    expect(b.get(1)).toBe(null)

    // Derivatives.
    expect(b.key).toBe(777)
    expect(b.get(2).parent).toBe(777)
    expect(b.get(3).parent).toBe(777)

    // References
    expect(a.get(4) === b.get(4)).toBe(true)
    expect(a.get(5) === b.get(5)).toBe(true)
    expect(a.get(6) === b.get(6)).toBe(true)
    expect(a.get(7) === b.get(7)).toBe(true)
  })
  it('returns a shallow copy with modified parent.', () => {
    var a = pbt3()
    var b = cloneTree(a, { parent: 666 })

    // Derivatives.
    expect(b.parent).toBe(666)
    expect(b.get(1) === a.get(1)).toBe(false)

    // References
    expect(b.get(2) === a.get(2)).toBe(true)
    expect(b.get(3) === a.get(3)).toBe(true)
    expect(b.get(4) === a.get(4)).toBe(true)
    expect(b.get(5) === a.get(5)).toBe(true)
    expect(b.get(6) === a.get(6)).toBe(true)
    expect(b.get(7) === a.get(7)).toBe(true)
  })
  it('returns a shallow copy with modified children.', () => {
    var a = pbt3()
    var b = cloneTree(a, {
      children: [
        Tree({ key: 33 }),
        Tree({ key: 44 }),
        Tree({ key: 55 })
      ]
    })

    // Derivatives.
    expect(b.size).toBe(4)
    expect(b.get(33).key).toBe(33)
    expect(b.get(44).key).toBe(44)
    expect(b.get(55).key).toBe(55)

    // Removed
    expect(b.get(2)).toBe(null)
    expect(b.get(3)).toBe(null)
    expect(b.get(4)).toBe(null)
    expect(b.get(5)).toBe(null)
    expect(b.get(6)).toBe(null)
    expect(b.get(7)).toBe(null)
  })
  it('retains custom properties.', () => {
    var a = Tree({
      key: 73,
      parent: 43,
      custom: 'Hello World'
    })
    var b = cloneTree(a)
    expect(b.custom).toBe(a.custom)
  })
  it('deletes custom property when value is explicitly undefined.', () => {
    var a = Tree({ custom: 'Hello World' })
    var b = cloneTree(a, { custom: undefined })
    expect(Object.keys(b).indexOf('custom')).toBe(-1)
  })
  it('stores children as references.', () => {
    var child = Tree({ key: 2 })
    var root = Tree({ key: 1, parent: null, children: [child] })
    var clone = cloneTree(root)
    expect(root.get(2) === clone.get(2)).toBe(true)
  })
})
describe('List()', () => {
  it('is a function.', () => {
    expect(typeof List).toBe('function')
  })
  it('can be constructed without the "new" keyword.', () => {
    expect(() => { List() }).not.toThrow(Error)
  })
  describe('Methods', () => {
    describe('assemble()', () => {
      it('is a function.', () => {
        expect(typeof List().assemble).toBe('function')
      })
    })
    describe('get()', () => {
      it('is a function.', () => {
        expect(typeof List().get).toBe('function')
      })
    })
    describe('equals()', () => {
      it('is a function.', () => {
        expect(typeof List().equals).toBe('function')
      })
      it('determines that 2 lists are equal when trees are in same order.', () => {
        const a = [
          Tree({ key: 1, parent: 0}),
          Tree({ key: 2, parent: 1}),
          Tree({ key: 3, parent: 2}),
          Tree({ key: 4, parent: 3}),
        ]
        const b = List(a)
        const c = List(a)

        expect(b.equals(c)).toBe(true)
        expect(b.equals(c, false)).toBe(true)
      })
      it('recognizes 2 lists are equal when trees are in different order.', () => {
        var a = Tree({ key: 1, parent: 0})
        var b = Tree({ key: 2, parent: 1})
        var c = Tree({ key: 3, parent: 2})
        var d = Tree({ key: 4, parent: 3})

        var e = List([a, b, c, d])
        var f = List([b, d, c, a])

        expect(e.equals(f)).toBe(false)
        expect(e.equals(f, {mode: 'lenient'})).toBe(true)
      })
    })
    describe('forEach()', () => {
      it('is a function.', () => {
        expect(typeof List().forEach).toBe('function')
      })
    })
    describe('sort()', () => {
      it('is a function.', () => {
        expect(typeof List().sort).toBe('function')
      })
      it('returns self for list with length 0.', () => {
        var a = List()
        var b = a.sort()
        expect(a === b).toBe(true)
      })
      it('returns self for list with length 1.', () => {
        var a = Tree({ key: 1, parent: 2 })
        var b = List(a)
        var c = b.sort()
        expect(b === c).toBe(true)
      })
      it('returns self for lists that are already ordered.', () => {
        var a = Tree({ key: 1, parent: 0})
        var b = Tree({ key: 2, parent: 1})
        var c = Tree({ key: 3, parent: 2})
        var d = Tree({ key: 4, parent: 3})
        var e = List([a, b, c, d])
        var f = e.sort()
        expect(e === f).toBe(true)
      })
      it('defaults to sorting trees by key in ascending order.', () => {
        var a = Tree({ key: 1, parent: 0})
        var b = Tree({ key: 2, parent: 1})
        var c = Tree({ key: 3, parent: 2})
        var d = Tree({ key: 4, parent: 3})
        var e = List([c, b, d, a])
        var f = e.sort()
        expect(f.get(0).key).toBe(1)
        expect(f.get(1).key).toBe(2)
        expect(f.get(2).key).toBe(3)
        expect(f.get(3).key).toBe(4)
        expect(e === f).toBe(false)
      })
      it('accepts a custom sort function.', () => {
        var a = Tree({ key: 1, parent: 0})
        var b = Tree({ key: 2, parent: 1})
        var c = Tree({ key: 3, parent: 2})
        var d = Tree({ key: 4, parent: 3})
        var e = List([c, b, d, a])
        var f = e.sort(function (a, b) {
          return b.key - a.key
        })
        expect(f.get(0).key).toBe(4)
        expect(f.get(1).key).toBe(3)
        expect(f.get(2).key).toBe(2)
        expect(f.get(3).key).toBe(1)
        expect(e === f).toBe(false)
      })
    })
  })
})
