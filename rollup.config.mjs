import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import includePaths from 'rollup-plugin-includepaths'
import alias from '@rollup/plugin-alias'
import styles from 'rollup-plugin-styles'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import terser from '@rollup/plugin-terser'
import filesize from 'rollup-plugin-filesize'
import del from 'rollup-plugin-delete'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const config = {
  input: {
    app: 'src/lib/App/index.jsx',
    authenticationSdk: 'src/lib/authenticationSdk/index.js',
    loginPage: 'src/lib/App/LoginPage/index.jsx',
    styleProvider: 'src/lib/App/styleProvider.jsx',
    actions: 'src/lib/actions/index.js',
    clients: 'src/lib/clients/index.js',
    components: 'src/lib/components/index.js',
    TopNav: 'src/lib/components/TopNav/index.js', // separate export for smaller build in stage_styles
    constants: 'src/lib/constants/index.js',
    hoc: 'src/lib/hoc/index.js',
    hooks: 'src/lib/hooks/index.js',
    store: 'src/lib/store/index.js',
    utilities: 'src/lib/utilities/index.js',
    views: 'src/lib/views/index.js',
    globalStyles: 'src/lib/globalStyles/index.styled.js',
    mocks: 'src/__mocks__/index.js'
  },
  output: { dir: 'es', format: 'es', exports: 'named' },
  context: 'this',
  external: Object.keys(pkg.peerDependencies),
  plugins: [
    del({ targets: 'es/*' }),
    peerDepsExternal(),
    includePaths({
      include: {},
      paths: ['src'],
      external: Object.keys(pkg.dependencies),
      extensions: ['.js', '.jsx', '.json', '.html']
    }),
    alias({
      entries: [{ find: '~su', replacement: fileURLToPath(new URL('src/lib', import.meta.url)) }]
    }),
    styles(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          '@babel/preset-react',
          {
            runtime: 'automatic'
          }
        ]
      ],
      plugins: [
        [
          'import',
          { libraryName: '@ant-design/icons', libraryDirectory: 'es/icons', camel2DashComponentName: false },
          '@ant-design/icons'
        ],
        ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash']
      ]
    }),
    image(),
    nodeResolve({
      browser: true
    }),
    commonjs(),
    terser(),
    filesize()
  ],
  onwarn(warning, warn) {
    if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
      warn(warning)
    }
  }
}

export default config
