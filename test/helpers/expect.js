import { Tree } from '../../src/index.js'
import { List } from '../../src/private.js'

export function expectClone(a, b) {
  expect(a instanceof Tree).toBe(true)
  expect(b instanceof Tree).toBe(true)
  expect(a === b).toBe(false)
  expect(a.key).toBe(b.key)
  expect(a.parent).toBe(b.parent)
  expect(a.size).toBe(b.size)
  expect(a.children).toEqual(b.children)
}

export function expectEmpty (tree) {
  return expectTree(tree, null, null, 0, 0)
}

export function expectTree(tree, key, parent, degree, size) {
  expect(tree instanceof Tree).toBe(true)
  expect(tree.key).toBe(key)
  expect(tree.parent).toBe(parent)
  expect(tree.children.length).toBe(degree)
  expect(tree.size).toBe(size)
}

export function expectEmptyList (list) {
  expectList (list, 0, 0, [])
}

export function expectList (list, length, size, value) {
  expect(list instanceof List).toBe(true)
  expect(list.length).toBe(length)
  expect(list.size).toBe(size)
  expect(list.value).toEqual(value)
}
