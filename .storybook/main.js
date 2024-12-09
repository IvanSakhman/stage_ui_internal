import { mergeConfig, transformWithEsbuild } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [
        {
          name: 'treat-js-files-as-jsx',
          async transform(code, id) {
            if (!id.match(/src\/.*\.js$/)) return null
            
            return transformWithEsbuild(code, id, {
              loader: 'jsx',
              jsx: 'automatic'
            })
          }
        },
        react()
      ],
      optimizeDeps: {
        force: true,
        esbuildOptions: {
          loader: {
            '.js': 'jsx'
          }
        }
      },
      resolve: {
        alias: {
          '~su': path.resolve(__dirname, '../src/lib')
        }
      },
      define: {
        'process.env': {
          REACT_APP_I18N_DEBUG_ENABLED: 'false'
        }
      }
    })
}
export default config
