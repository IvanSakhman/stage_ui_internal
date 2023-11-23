export const enumsToValueEnum = (enums, allLabel, valueEnum = null) =>
  valueEnum ? valueEnum : enums.map((value) => [value === -1 ? allLabel : value, value])

export const buildOptions = (valueEnum, options = null) =>
  options ? options : valueEnum.map((value) => ({ label: value[0], value: value[1] }))
