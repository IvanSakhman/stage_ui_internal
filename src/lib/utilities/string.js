import pluralize from 'pluralize'

// humanize = (
//   string: string,
//   options?: { capitalize?: boolean; titleize?: boolean }
// ): string
const humanize = (string, options = { capitalize: false, titleize: false, upcase: false }) => {
  const separatorMatchData = string.match(/(_|-)/)

  const separator = separatorMatchData ? separatorMatchData[0] : ' '

  let value = string.split(separator)

  if (options.titleize) {
    return value.map(capitalize).join(' ')
  }

  value = value.join(' ')

  if (options.upcase) {
    return upcase(value)
  }

  return options.capitalize ? capitalize(value) : value
}

const upcase = (string) => {
  return string?.toUpperCase()
}

// capitalize = (string: string): string
const capitalize = (string) => {
  try {
    return string[0].toUpperCase() + string.slice(1)
  } catch (error) {
    console.error(error)
    return string
  }
}

// singularize = (string: string): string
const singularize = (string) => {
  return pluralize(string, 1)
}

// deprecated use i18n
const COMMON_TRANSLATIONS = {
  popconfirm_delete_title: {
    format: 'Are you sure to delete this format? All associated outputs will be deleted as well.'
  },
  websocket_global_alerts: {
    connecting: 'WebSocket connection is being established.',
    connected: 'WebSocket connection established.',
    failed: 'There is an error with WebSocket connection. Live updates might not work.',
    unavailable: 'There is an error with WebSocket connection. Live updates might not work.',
    disconected: 'Foo'
  }
}
// translate = (collection: string, key: string, fallback?: Function): string
const translate = (collection, key, fallback = null, translations = {}) => {
  key = key ? key : collection
  const TRANSLATIONS = { ...COMMON_TRANSLATIONS, ...translations }
  const collectionTranslations = TRANSLATIONS[collection] || {}
  key = collection == 'format' ? upcase(key) : key
  return collectionTranslations[key] || (fallback && fallback(key)) || key
}

const translateBoolean = (value, translations) => {
  return translations[value]
}
// deprecated use i18n

// https://github.com/ajaxorg/ace/blob/master/lib/ace/lib/lang.js#L137
const escapeHTML = (string) => {
  return ('' + string).replace(/&/g, '&#38;').replace(/"/g, '&#34;').replace(/'/g, '&#39;').replace(/</g, '&#60;')
}

const replacePlaceholders = (string, record) => {
  const placeholders = [...string.matchAll(/\:\w+/g)]

  placeholders.forEach(([match]) => (string = string.replace(match, record?.[match.slice(1)])))
  return string
}

export default {
  pluralize,
  humanize,
  upcase,
  capitalize,
  singularize,
  translate,
  escapeHTML,
  translateBoolean,
  replacePlaceholders
}
