const getFormErrors = (errors) => {
  const getNestedErrors = (o, keys = []) =>
    Object.entries(o).flatMap(([key, errors]) => {
      key = Number.isNaN(parseInt(key)) ? key : parseInt(key)

      if (typeof errors === 'object' && !Array.isArray(errors)) return getNestedErrors(errors, [...keys, key])

      return { name: [...keys, key], errors }
    })

  return getNestedErrors(errors)
}

const valueFromValueEnum = (valueEnums, value) => {
  const VALUE_ENUM_HUMAN_INDEX = 1 // ie severity = { valueEnum: [['fatal', 11]] }

  const valueEnum = valueEnums.find((enumValue) => enumValue[VALUE_ENUM_HUMAN_INDEX] === value)
  return valueEnum ? valueEnum[0] : value
}

import buildFields, { normalizeEmptyToUndef } from './fields'
import showModalForm from './modal/showModalForm'

export default { getFormErrors, normalizeEmptyToUndef, valueFromValueEnum, buildFields, showModalForm }
