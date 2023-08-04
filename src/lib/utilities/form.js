export const getFormErrors = (errors) => {
  const getNestedErrors = (o, keys = []) =>
    Object.entries(o).flatMap(([key, errors]) => {
      if (typeof errors === 'object' && !Array.isArray(errors)) return getNestedErrors(errors, [...keys, key])

      return { name: [...keys, key], errors }
    })

  return getNestedErrors(errors)
}
