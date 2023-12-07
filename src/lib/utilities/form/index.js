const getFormErrors = (errors) => {
  const getNestedErrors = (o, keys = []) =>
    Object.entries(o).flatMap(([key, errors]) => {
      if (typeof errors === 'object' && !Array.isArray(errors)) return getNestedErrors(errors, [...keys, key])

      return { name: [...keys, key], errors }
    })

  return getNestedErrors(errors)
}

const normalizeEmptyToUndef = (value, _prevValue, _prevValues) => (value === '' ? undefined : value)

const valueFromValueEnum = (valueEnums, value) => {
  const VALUE_ENUM_HUMAN_INDEX = 1 // ie severity = { valueEnum: [['fatal', 11]] }

  const valueEnum = valueEnums.find((enumValue) => enumValue[VALUE_ENUM_HUMAN_INDEX] === value)
  return valueEnum ? valueEnum[0] : value
}

import buildFields from './fields'

export default { getFormErrors, normalizeEmptyToUndef, valueFromValueEnum, buildFields }
