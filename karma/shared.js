const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

function sharedConfig () {
  return {
    basePath: '',
    frameworks: ['chai', 'mocha'],
    files: [
      '../src/*.js',
      '../test/*.test.js'
    ],
    exclude: [],
    preprocessors: {
      '../src/*.js': ['rollup'],
      '../test/*.test.js': ['rollupTests']
    },
    rollupPreprocessor: {
      output: {
        format: 'iife',
        name: 'Tree',
        sourcemap: 'inline'
      }
    },
    customPreprocessors: {
      rollupTests: {
				base: 'rollup',
				options: {
          plugins: [
            babel({
              babelHelpers: 'bundled',
              exclude: [/node_modules/],
              presets: [
                ['@babel/preset-env', {
                  corejs: '3.6',
                  debug: true,
                  useBuiltIns: 'usage'
                }]
              ]
            }),
            nodeResolve(),
            commonjs()
          ]
				},
			},
		},
    plugins: ['karma-*'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: [],
    singleRun: false,
    concurrency: Infinity
  }
}

module.exports = { sharedConfig }
