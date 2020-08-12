import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/tree.cjs.js',
      format: 'cjs',
      name: 'Tree'
    },
    plugins: [
      terser({
        mangle: {
          reserved: ['Tree']
        }
      })
    ]
  }
]
