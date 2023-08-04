import DynamicIcon from '~su/components/DynamicIcon'
import string from '~su/utilities/string'

const translateLinkAction = (action, record) => {
  const options = Object.assign({}, action.options)

  if (options.href) {
    options.href = string.replacePlaceholders(options.href, record)
  }

  return options
}

const translateFunctionAction = (action, record, functionHandlers = {}) => {
  const { name, options } = action

  return {
    ...options,
    onClick: () => (functionHandlers[name] ? functionHandlers[name](record) : undefined)
  }
}

// const translateRequestAction = (action, requestHandlers = {}) => {
//   const { name, options } = action
//
//   const { method, path, ...optionsRest } = options
//
//   return {
//     ...optionsRest,
//     onClick: (data) => requestHandlers[name]?.({ method, path }, data)
//   }
// }

export const translateResponseAction = (action, translateOptions = {}) => {
  const { type, name, display } = action
  const { record, dynamicDisplayValueName, functionHandlers, requestHandlers, size } = translateOptions

  const translatedDisplay = display || record?.[dynamicDisplayValueName] || name

  let properties = {}

  switch (type) {
    case 'link':
      properties = translateLinkAction(action, record)
      break
    case 'function':
      properties = translateFunctionAction(action, record, functionHandlers)
      break
    case 'request':
      console.warn('translating request action is not supported at the moment')
      return null
  }

  return {
    display: translatedDisplay,
    properties: {
      ...properties,
      ...iconProperties(translatedDisplay, action.options),
      ...sizeProperty(size, action.options)
    }
  }
}

const iconProperties = (translatedDisplay, { icon, iconOnly, tooltip }) => {
  if (!icon) {
    return {}
  }

  return {
    icon: <DynamicIcon name={icon} />,
    tooltip: iconOnly ? tooltip || translatedDisplay : tooltip
  }
}

const sizeProperty = (defaultSize, { type, size }) => {
  if (type === 'link') {
    return { size }
  }

  return {
    size: size || defaultSize
  }
}

const operatorFunctions = {
  eql: (recordValue, conditionValue) => recordValue === conditionValue,
  notEql: (recordValue, conditionValue) => recordValue != conditionValue,
  lt: (recordValue, conditionValue) => recordValue < conditionValue,
  gt: (recordValue, conditionValue) => recordValue > conditionValue,
  in: (recordValue, conditionValue) => conditionValue.includes(recordValue)
}

export const filterActionsByCondition = (actions, record) => {
  return actions.filter((action) => {
    if (!action.hasOwnProperty('condition') && !action.condition) {
      return true
    }

    try {
      const [recordKey, operatorName, conditionValue] = action.condition
      const recordValue = record[recordKey]
      const operatorFunction = operatorFunctions[operatorName]

      if (operatorName && !operatorFunction) {
        console.error(`${operatorName} is unknown`)
        return true
      }

      return operatorFunction(recordValue, conditionValue)
    } catch (error) {
      console.error(`filterActionsByCondition failed with ${error}`)
      return true
    }
  })
}
