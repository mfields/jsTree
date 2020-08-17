import { expect } from 'chai'
import { Tree } from '../src/index.js'
import { expectEmpty, expectTree } from './helpers/expect.js'
import { pbt2, pbt3 } from './helpers/data.js'

describe('Tree(props)', () => {
  it('may be a symbol.', () => {
    expect(() => { Tree(Symbol()) }).not.to.throw()
  })
})
describe('Tree(props.key)', () => {
  it('may be a symbol.', () => {
    expect(() => { Tree({ key: Symbol() }) }).not.to.throw()
  })
})
describe('Tree(props.parent)', () => {
  it('may be a symbol.', () => {
    expect(() => { Tree({ parent: Symbol() }) }).not.to.throw()
  })
})
describe('Tree(props.children)', () => {
  it('may be a symbol.', () => {
    expect(() => { Tree({ children: Symbol() }) }).not.to.throw()
  })
})
describe('Tree(props.*)', () => {
  it('may be a synbol.', () => {
    expect(() => { Tree({ symbol: Symbol() }) }).not.to.throw()
  })
  it('may be a map.', () => {
    expect(() => { Tree({ map: new Map() }) }).not.to.throw()
  })
  it('may be a set.', () => {
    expect(() => { Tree({ set: new Set() }) }).not.to.throw()
  })
})
describe('Properties.', () => {
  describe('key', () => {
    it(`is null when props.key is a symbol.`, () => {
      expect(Tree({ key: Symbol() }).key).to.equal(null)
    })
  })
  describe('parent', () => {
    it(`is null when props.key is null.`, () => {
      expect(Tree({ parent: null }).parent).to.equal(null)
    })
    it(`is null when props.key is a symbol.`, () => {
      expect(Tree({ parent: Symbol() }).parent).to.equal(null)
    })
  })
})
describe('Tree.prototype.add()', () => {
  it('returns self when descendant is not an instance of Tree.', () => {
    var tree = Tree({ key: 99, parent: 86 })
    expect(tree.add(Symbol()) === tree).to.equal(true)
    expect(tree.add(new Map()) === tree).to.equal(true)
    expect(tree.add(new Set()) === tree).to.equal(true)
  })
})
describe('Tree.fromArray(trees)', () => {
  it('may not be a symbol.', () => {
    expectEmpty(Tree.fromArray(Symbol()))
  })
})
