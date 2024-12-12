import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import react from 'eslint-plugin-react'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['**/build', '**/node_modules', '**/public', 'src/__tests__']
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:react-hooks/recommended',
      'plugin:storybook/recommended'
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react)
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },

      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'no-unused-vars': [
        'error',
        {
          vars: 'local',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          args: 'after-used'
        }
      ],

      'no-useless-escape': 0,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 1,
      'react/display-name': 0
    }
  }
]
