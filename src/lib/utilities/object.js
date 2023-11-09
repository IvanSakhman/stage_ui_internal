const invert = (object) => {
  return Object.assign({}, ...Object.entries(object).map(([a, b]) => ({ [b]: a })))
}

const compact = (object) => {
  const _obj = Object.assign({}, object)
  Object.keys(_obj).forEach((key) => !_obj[key] && delete _obj[key])
  return _obj
}

const isEmpty = (object) => {
  if (!object) {
    return true
  }

  return object.constructor === Object && Object.keys(object).length === 0
}

const isObject = (value) => {
  if (!value) {
    return false
  }

  return typeof value === 'object' && !Array.isArray(value) && typeof value !== 'function'
}

const findNested = (object, path) => {
  path = Array.isArray(path) ? path : path.split('.')
  return path.reduce((accumulator, currentValue) => accumulator?.[currentValue], object)
}

export const flattenObject = (obj) => {
  const flat = (o) =>
    Object.entries(o).flatMap(([key, val]) => {
      if (typeof val === 'object' && !Array.isArray(val)) return flat(val)

      return [[key, val]]
    })

  return Object.fromEntries(flat(obj))
}

const pick = (object, keys) => {
  return Object.fromEntries(keys.filter((key) => key in object).map((key) => [key, object[key]]))
}

const omit = (object, keys) => {
  return Object.fromEntries(
    Object.keys(object)
      .filter((key) => !keys.includes(key))
      .map((key) => [key, object[key]])
  )
}

export default { invert, compact, isEmpty, isObject, findNested, flattenObject, pick, omit }
