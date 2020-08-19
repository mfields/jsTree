import { Tree } from '../../index.js'

/**
 * Perfect binary tree with height of 2 ordered by key, ascending.
 *
 * @return {Tree}
 */
export function pbt2 () {
  return Tree({ key: 1, children: [
    Tree({ key: 2 }),
    Tree({ key: 3 })
  ]})
}
/**
 * Perfect binary tree with height of 3 ordered by key, ascending.
 *
 * @return {Tree}
 */
export function pbt3 () {
  return Tree({ key: 1, children: [
    Tree({ key: 2, children: [
      Tree({ key: 4 }),
      Tree({ key: 5 })
    ]}),
    Tree({ key: 3, parent: 1, children: [
      Tree({ key: 6 }),
      Tree({ key: 7 })
    ]})
  ]})
}
