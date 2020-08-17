import { expect } from 'chai'
import { Tree } from '../src/index.js'
import { List, cloneTree } from '../src/private.js'
import { expectClone, expectEmptyList, expectList } from './helpers/expect.js'
import { pbt2, pbt3 } from './helpers/data.js'

describe('cloneTree()', () => {
  it('is a fucntion.', () => {
    expect(typeof cloneTree).to.equal('function')
  })
  it('returns an instance of Tree.', () => {
    expect(cloneTree(Tree()) instanceof Tree).to.equal(true)
  })
  it('returns a shallow copy (height 2).', () => {
    var a = pbt2()
    var b = cloneTree(a)
    expectClone(a, b)
    expect(b.get(2) === a.get(2)).to.equal(true)
    expect(b.get(3) === a.get(3)).to.equal(true)
  })
  it('returns a shallow copy (height 3).', () => {
    var a = pbt2()
    var b = cloneTree(a)
    expectClone(a, b)
    expect(b.get(2) === a.get(2)).to.equal(true)
    expect(b.get(3) === a.get(3)).to.equal(true)
    expect(b.get(4) === a.get(4)).to.equal(true)
    expect(b.get(5) === a.get(5)).to.equal(true)
    expect(b.get(6) === a.get(6)).to.equal(true)
    expect(b.get(7) === a.get(7)).to.equal(true)
  })
  it('returns a shallow copy with modified key.', () => {
    var a = pbt3()
    var b = cloneTree(a, { key: 777 })

    // Renamed.
    expect(b.get(1)).to.equal(null)

    // Derivatives.
    expect(b.key).to.equal(777)
    expect(b.get(2).parent).to.equal(777)
    expect(b.get(3).parent).to.equal(777)

    // References
    expect(a.get(4) === b.get(4)).to.equal(true)
    expect(a.get(5) === b.get(5)).to.equal(true)
    expect(a.get(6) === b.get(6)).to.equal(true)
    expect(a.get(7) === b.get(7)).to.equal(true)
  })
  it('returns a shallow copy with modified parent.', () => {
    var a = pbt3()
    var b = cloneTree(a, { parent: 666 })

    // Derivatives.
    expect(b.parent).to.equal(666)
    expect(b.get(1) === a.get(1)).to.equal(false)

    // References
    expect(b.get(2) === a.get(2)).to.equal(true)
    expect(b.get(3) === a.get(3)).to.equal(true)
    expect(b.get(4) === a.get(4)).to.equal(true)
    expect(b.get(5) === a.get(5)).to.equal(true)
    expect(b.get(6) === a.get(6)).to.equal(true)
    expect(b.get(7) === a.get(7)).to.equal(true)
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
    expect(b.size).to.equal(4)
    expect(b.get(33).key).to.equal(33)
    expect(b.get(44).key).to.equal(44)
    expect(b.get(55).key).to.equal(55)

    // Removed
    expect(b.get(2)).to.equal(null)
    expect(b.get(3)).to.equal(null)
    expect(b.get(4)).to.equal(null)
    expect(b.get(5)).to.equal(null)
    expect(b.get(6)).to.equal(null)
    expect(b.get(7)).to.equal(null)
  })
  it('retains custom properties.', () => {
    var a = Tree({
      key: 73,
      parent: 43,
      custom: 'Hello World'
    })
    var b = cloneTree(a)
    expect(b.custom).to.equal(a.custom)
  })
  it('deletes custom property when value is explicitly undefined.', () => {
    var a = Tree({ custom: 'Hello World' })
    var b = cloneTree(a, { custom: undefined })
    expect(Object.keys(b).indexOf('custom')).to.equal(-1)
  })
  it('stores children as references.', () => {
    var child = Tree({ key: 2 })
    var root = Tree({ key: 1, parent: null, children: [child] })
    var clone = cloneTree(root)
    expect(root.get(2) === clone.get(2)).to.equal(true)
  })
})
describe('List()', () => {
  it('is a function.', () => {
    expect(typeof List).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', () => {
    expect(() => { List() }).not.to.throw(Error)
  })
  describe('Methods', () => {
    describe('assemble()', () => {
      it('is a function.', () => {
        expect(typeof List().assemble).to.equal('function')
      })
    })
    describe('get()', () => {
      it('is a function.', () => {
        expect(typeof List().get).to.equal('function')
      })
    })
    describe('equals()', () => {
      it('is a function.', () => {
        expect(typeof List().equals).to.equal('function')
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

        expect(b.equals(c)).to.equal(true)
        expect(b.equals(c, false)).to.equal(true)
      })
      it('recognizes 2 lists are equal when trees are in different order.', () => {
        var a = Tree({ key: 1, parent: 0})
        var b = Tree({ key: 2, parent: 1})
        var c = Tree({ key: 3, parent: 2})
        var d = Tree({ key: 4, parent: 3})

        var e = List([a, b, c, d])
        var f = List([b, d, c, a])

        expect(e.equals(f)).to.equal(false)
        expect(e.equals(f, {mode: 'lenient'})).to.equal(true)
      })
    })
    describe('forEach()', () => {
      it('is a function.', () => {
        expect(typeof List().forEach).to.equal('function')
      })
    })
    describe('sort()', () => {
      it('is a function.', () => {
        expect(typeof List().sort).to.equal('function')
      })
      it('returns self for list with length 0.', () => {
        var a = List()
        var b = a.sort()
        expect(a === b).to.equal(true)
      })
      it('returns self for list with length 1.', () => {
        var a = Tree({ key: 1, parent: 2 })
        var b = List(a)
        var c = b.sort()
        expect(b === c).to.equal(true)
      })
      it('returns self for lists that are already ordered.', () => {
        var a = Tree({ key: 1, parent: 0})
        var b = Tree({ key: 2, parent: 1})
        var c = Tree({ key: 3, parent: 2})
        var d = Tree({ key: 4, parent: 3})
        var e = List([a, b, c, d])
        var f = e.sort()
        expect(e === f).to.equal(true)
      })
      it('defaults to sorting trees by key in ascending order.', () => {
        var a = Tree({ key: 1, parent: 0})
        var b = Tree({ key: 2, parent: 1})
        var c = Tree({ key: 3, parent: 2})
        var d = Tree({ key: 4, parent: 3})
        var e = List([c, b, d, a])
        var f = e.sort()
        expect(f.get(0).key).to.equal(1)
        expect(f.get(1).key).to.equal(2)
        expect(f.get(2).key).to.equal(3)
        expect(f.get(3).key).to.equal(4)
        expect(e === f).to.equal(false)
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
        expect(f.get(0).key).to.equal(4)
        expect(f.get(1).key).to.equal(3)
        expect(f.get(2).key).to.equal(2)
        expect(f.get(3).key).to.equal(1)
        expect(e === f).to.equal(false)
      })
    })
  })
})
