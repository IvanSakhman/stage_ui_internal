import { filter, map, toLower, toString, trim, upperFirst } from 'lodash'

const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)

const modKey = isMac ? 'Cmd' : 'Ctrl'
const altKey = isMac ? 'Option' : 'Alt'

const humanReadableShortcut = (shortcut, limit = Infinity) => {
  const modifiers = {
    mod: upperFirst(modKey),
    alt: upperFirst(altKey)
  }

  shortcut = toLower(toString(shortcut))
  shortcut = filter(map(shortcut.split(','), trim), (s) => s !== '').slice(0, limit)
  shortcut = map(shortcut, (sc) => {
    sc = filter(map(sc.split('+')), (s) => s !== '')
    return map(sc, (s) => modifiers[s] || upperFirst(s)).join(' + ')
  }).join(', ')

  return shortcut !== '' ? shortcut : null
}

export default { humanReadableShortcut }
