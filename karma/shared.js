const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

function sharedConfig () {
  return {
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '../src/*.js',
      '../test/*.test.js'
    ],
    exclude: [],
    preprocessors: {
      '../src/*.js': ['rollup'],
      '../test/*.test.js': ['rollup']
    },
    rollupPreprocessor: {
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
      ],
      output: {
        format: 'iife',
        name: 'GeneralTree',
        sourcemap: 'inline'
      }
    },
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-opera-launcher',
      'karma-safari-launcher',
      'karma-rollup-preprocessor'
    ],
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
