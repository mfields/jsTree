const { expect } = require('chai')
const { Tree } = require('../../index.js')

function expectClone(a, b) {
  expect(a instanceof Tree).to.equal(true)
  expect(b instanceof Tree).to.equal(true)
  expect(a === b).to.equal(false)
  expect(a.key).to.equal(b.key)
  expect(a.parent).to.equal(b.parent)
  expect(a.size).to.equal(b.size)
  expect(a.children).to.deep.equal(b.children)
}

function expectEmpty (tree) {
  return expectTree(tree, null, null, 0, 0)
}

function expectTree(tree, key, parent, degree, size) {
  expect(tree instanceof Tree).to.equal(true)
  expect(tree.key).to.equal(key)
  expect(tree.parent).to.equal(parent)
  expect(tree.children.length).to.equal(degree)
  expect(tree.size).to.equal(size)
}

module.exports = { expectClone, expectEmpty, expectTree }
