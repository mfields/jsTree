import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/tree.esm.js',
      format: 'es',
      name: 'Tree'
    },
    plugins: [
      commonjs(),
      terser({
        mangle: {
          reserved: ['Tree']
        }
      })
    ]
  }
]
