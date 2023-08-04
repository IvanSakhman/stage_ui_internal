export const buildFilters = (json_schema) => {
  let filters = {}

  // this check should not pass ideally. But added here to support BE, which currently doesn't return json_schema to FE
  if (!json_schema) {
    return filters
  }

  const filtersProperties = json_schema.properties.filters.properties

  Object.keys(filtersProperties).forEach((filterName) => {
    const filterProperties = filtersProperties[filterName]

    filters[filterName] = filterProperties.valueEnum || filterProperties.enum
  })

  return filters
}
