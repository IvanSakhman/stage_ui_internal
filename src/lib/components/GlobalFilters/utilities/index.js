import object from '~su/utilities/object'

const buildFilterSchema = (displayIn, globalFiltersOptions, filtersSchema) => {
  const filters = globalFiltersOptions.filter(([_filterName, filterOptions]) => {
    return filterOptions[displayIn]
  })

  const properties =
    globalFiltersOptions.length === 0
      ? filtersSchema.properties
      : object.pick(
          filtersSchema.properties,
          filters.map(([filterName, _]) => filterName)
        )

  return { ...filtersSchema, properties }
}

export const buildFiltersSchemas = (globalFiltersOptions, filtersSchema, currentBreakpoints) => {
  globalFiltersOptions = adjustGlobalFiltersOptions(globalFiltersOptions, currentBreakpoints)

  const inlineFiltersSchema = buildFilterSchema('inline', globalFiltersOptions, filtersSchema)

  if (globalFiltersOptions.length === 0) {
    return { inlineFiltersSchema, modalFiltersSchema: { ...filtersSchema, properties: [] } }
  }

  const modalFiltersSchema = buildFilterSchema('modal', globalFiltersOptions, filtersSchema)

  return { inlineFiltersSchema, modalFiltersSchema }
}

export const pickAndReorderFilters = (filtersProperties, displayableFilters) =>
  object.pick(filtersProperties, displayableFilters)

export const readAppliedFilters = (filtersProperties, urlParams) => {
  return Object.fromEntries(
    Object.keys(filtersProperties)
      .map((filterName) => {
        const filterValue = urlParams.get(filterName)

        const normalizedFilterValue = normalizeReadFilterValue(filtersProperties[filterName].type, filterValue)

        return filterValue ? [filterName, normalizedFilterValue] : null
      })
      .filter((filter) => filter)
  )
}

export const normalizeValuesForSubmit = (values) => {
  const { order, ...filters } = values

  const sorter = Object.hasOwn(values, 'order') && !order ? ':' : order

  const normalizedValues = Object.fromEntries(
    Object.entries(filters).map(([filterName, filterValue]) => {
      return [filterName.replace('by_', ''), filterValue]
    })
  )

  return { normalizedValues, sorter }
}

export const buildFieldsConfig = (filtersProperties, inModal = false) => {
  return Object.fromEntries(
    Object.keys(filtersProperties).map((filterName) => {
      const { enum: enums, type } = filtersProperties[filterName]
      let componentProps = {}

      if (['string', 'integer'].includes(type)) {
        componentProps = { allowClear: true, ...componentProps }
      }

      if (enums || type === 'array') {
        componentProps = { fixParentNode: inModal, ...componentProps }
      }

      return [filterName, { item: { width: 'auto', hasFeedback: false }, componentProps }]
    })
  )
}

// @private

const normalizeReadFilterValue = (type, filterValue) => {
  switch (type) {
    case 'integer': {
      return parseInt(filterValue)
    }
    case 'array': {
      return filterValue?.split(',')
    }
    case 'boolean': {
      return filterValue === 'true'
    }
    default: {
      return filterValue
    }
  }
}

const adjustGlobalFiltersOptions = (globalFiltersOptions, currentBreakpoints) => {
  const determineFilterPlacement = ({ inline: inlineOptions, modal: modalOptions }) => {
    let modal = modalOptions
    let inline = !modal

    const determineIfInline = (listedBreakpoints, shouldInclude = true) => {
      return Object.entries(currentBreakpoints).some(([name, isTruthy]) => {
        return listedBreakpoints.includes(name) === shouldInclude && isTruthy
      })
    }

    if (Array.isArray(inlineOptions)) {
      inline = determineIfInline(inlineOptions, true)
    }

    if (Array.isArray(modalOptions)) {
      inline = determineIfInline(modalOptions, false)
    }

    modal = !inline

    return { inline, modal }
  }

  return Object.entries(globalFiltersOptions).map(([filterName, filterOptions]) => {
    filterName = filterName === 'order' ? filterName : `by_${filterName}`
    filterOptions = { ...filterOptions, ...determineFilterPlacement(filterOptions) }

    return [filterName, filterOptions]
  })
}
