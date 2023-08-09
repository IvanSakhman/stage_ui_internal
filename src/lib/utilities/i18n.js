import { createContext, useContext } from 'react'

import i18n from 'i18next'
import { initReactI18next, useTranslation as superUseTranslation } from 'react-i18next'

const DEFAULT_LANG = 'en'

const TranslationsScope = createContext('')

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  [DEFAULT_LANG]: {
    stage_ui: {
      true: 'Yes',
      false: 'No',
      popconfirm_delete_title: {
        unspecific: 'Are you sure to delete this {{dataType}}?',
        format: 'Are you sure to delete this format? All associated outputs will be deleted as well.'
      },
      websocket_global_alerts: {
        connecting: 'WebSocket connection is being established.',
        connected: 'WebSocket connection established.',
        failed: 'There is an error with WebSocket connection. Live updates might not work.',
        unavailable: 'There is an error with WebSocket connection. Live updates might not work.',
        disconnected: 'WebSockets disconnected.'
      }
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackNS: 'stage_ui',
    debug: process.env.REACT_APP_I18N_DEBUG_ENABLED === 'true', // eslint-disable-line no-undef
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

const addResources = (resources, namespace, language = DEFAULT_LANG) => {
  i18n.setDefaultNamespace(namespace)
  return i18n.addResourceBundle(language, namespace, resources)
}

const useTranslation = (options = {}) => {
  const scope = useContext(TranslationsScope)

  return superUseTranslation(i18n.options.defaultNS, { keyPrefix: scope, ...options })
}

const withScopedTranslations = (Component, scope) => (props) => {
  const savedScope = useContext(TranslationsScope)

  if (savedScope && !scope.includes(savedScope)) {
    scope = [savedScope, scope].join('.')
    scope = [...new Set(scope.split('.'))].join('.') // deduplicate
  }

  return (
    <TranslationsScope.Provider value={scope}>
      <Component {...props} />
    </TranslationsScope.Provider>
  )
}

// NOTE: this does not respect TranslationsScope
const t = i18n.t

export { t, addResources, useTranslation, withScopedTranslations }

export default i18n

let testExports = {}
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == 'test') {
  testExports = { DEFAULT_LANG, resources, TranslationsScope }
}

export { testExports }
