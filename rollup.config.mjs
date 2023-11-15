import path from 'path'
import { fileURLToPath } from 'url'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import pkg from './package.json' assert {type: 'json'}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const paths = {
  input: path.join(__dirname, '/src/index.js'),
  output: path.join(__dirname, '/lib')
}

export default {
  input: paths.input,
  output: [
    {
      file: path.join(paths.output, 'index.js'),
      format: 'cjs',
      name: pkg.name
    },
    {
      file: path.join(paths.output, 'index.esm.js'),
      format: 'esm',
      name: pkg.name
    }
  ],
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: [...DEFAULT_EXTENSIONS],
      skipPreflightCheck: true
    })
  ]
}