import flow from 'rollup-plugin-flow'
import { terser } from "rollup-plugin-terser"
import resolve from 'rollup-plugin-node-resolve'

import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'


const outputs = [
  {
    file: 'dist/bitcoin-source-api-es.mjs',
    format: 'es',
    name: 'bitcoin-source-api-es.mjs',
    external: ['bitcoinsource', 'axios'],
  },
  {
    file: 'dist/bitcoin-source-api-umd.js',
    format: 'umd',
    name: 'bitcoin-source-api-umd.js',
    external: ['bitcoinsource', 'axios'],
  },
  {
    file: 'dist/bitcoin-source-api-iife.js',
    format: 'iife',
    name: 'bitcoin-source-api-iife.js',
    external: ['bitcoinsource', 'axios'],
  },
  {
    file: 'dist/bitcoin-source-api-cjs.js',
    format: 'cjs',
    name: 'bitcoin-source-api-cjs.js',
    external: ['bitcoinsource', 'axios'],
  }
]

let bundleExternalConfig = {
  input: 'src/index.js',
  plugins: [
    json(),
    builtins(),
    flow({ all: true }),
    resolve({
      modulesOnly: false,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    globals(),
    // terser({
    //   mangle: {
    //     toplevel: true,
    //     module: true,
    //   },
    //   compress: {
    //     defaults: true,
    //     join_vars: false,
    //     module: true,
    //     passes: 5,
    //     toplevel: true,
    //     unused: true,
    //   },
    //   toplevel: true
    // }),
  ]
}

const bundleInternalConfig = {
  input: 'src/index.js',
  plugins: [
    flow({ all: true }),
    resolve({
      modulesOnly: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    terser({
      mangle: {
        toplevel: true,
        module: true,
      },
      compress: {
        defaults: true,
        join_vars: false,
        module: true,
        passes: 5,
        toplevel: true,
        unused: true,
      },
      toplevel: true
    }),
  ]
}

export default outputs.map(output => {
  const configClone = output.format === 'es'
    ? Object.assign({}, bundleExternalConfig)
    : Object.assign({}, bundleInternalConfig)
  configClone.output = output
  return configClone
})
