import array from '~su/utilities/array'
import object from '~su/utilities/object'

export const pickAndReorderFilters = (filtersProperties, displayableFilters) =>
  displayableFilters.length === 0 ? filtersProperties : object.pick(filtersProperties, displayableFilters)

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

export const normalizeValuesForSubmit = ({ order, ...values }) => {
  const sorter = order ? Object.fromEntries(array.zip(['columnKey', 'order'], order.split(':'))) : {}

  const normalizedValues = Object.fromEntries(
    Object.entries(values).map(([filterName, filterValue]) => {
      return [filterName.replace('by_', ''), filterValue]
    })
  )

  return { normalizedValues, sorter }
}

export const buildFieldsConfig = (filtersProperties) => {
  return Object.fromEntries(
    Object.keys(filtersProperties).map((filterName) => {
      const { enum: enums, type } = filtersProperties[filterName]
      let componentProps = { placeholder: 'All' }

      if (['string', 'integer'].includes(type)) {
        componentProps = { allowClear: true, ...componentProps }
      }

      if (enums || type === 'array') {
        componentProps = { fixParentNode: false, ...componentProps }
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
