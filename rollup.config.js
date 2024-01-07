import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import path from 'path'
import pkg from './package.json' assert { type: 'json' }

const name = 'asyncMessenger'
const namedInput = './index.js'
const defaultInput = './src/index.js'

const buildConfig = ({ es5, minifiedVersion = true, ...config }) => {
  const {file} = config.output;
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  const extArr = ext.split('.');
  extArr.shift();

  const build = ({minified}) => ({
    input: namedInput,
    ...config,
    output: {
      ...config.output,
      file: `${path.dirname(file)}/${basename}.${(minified ? ['min', ...extArr] : extArr).join('.')}`
    },
    plugins: [
      json(),
      resolve(),
      minified && terser(),
      ...(es5 ? [babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions: [...DEFAULT_EXTENSIONS],
        skipPreflightCheck: true
      })] : []),
      ...(config.plugins || [])
    ]
  })

  const configs = [
    build({minified: false}),
  ]

  if (minifiedVersion) {
    configs.push(build({minified: true}))
  }

  return configs
}

export default () => {
  const year = new Date().getFullYear()
  const banner = `// ${pkg.name} v${pkg.version} Copyright (c) ${year} ${pkg.author}`
  return [
    ...buildConfig({
      input: namedInput,
      output: {
        file: `dist/esm/${name}.js`,
        name,
        format: 'esm',
        exports: 'named',
        banner
      }
    }),
    ...buildConfig({
      input: defaultInput,
      output: {
        file: `dist/cjs/${name}.js`,
        name,
        format: 'cjs',
        exports: 'default',
        banner
      }
    }),
    ...buildConfig({
      input: defaultInput,
      es5: true,
      output: {
        file: `dist/${name}.js`,
        name,
        format: 'umd',
        exports: 'default',
        banner
      }
    })
  ]
}