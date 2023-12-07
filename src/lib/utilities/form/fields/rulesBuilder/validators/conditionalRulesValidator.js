import Schema from 'async-validator'
import array from '~su/utilities/array'
import object from '~su/utilities/object'

const noConditionalRules = (conditionalRules) => {
  return (
    !conditionalRules ||
    (Array.isArray(conditionalRules) && conditionalRules.length === 0) ||
    object.isEmpty(conditionalRules)
  )
}

const validatedFieldInRequirements = (validatedFieldName, truthyRequirements, falseyRequirements) => {
  return (
    truthyRequirements.properties.hasOwnProperty(validatedFieldName) || // eslint-disable-line no-prototype-builtins
    falseyRequirements?.properties?.hasOwnProperty(validatedFieldName) // eslint-disable-line no-prototype-builtins
  )
}

const determineValueType = (value) => {
  if (!value) {
    return 'string'
  } else if (Array.isArray(value)) {
    return 'array'
  } else {
    return typeof value
  }
}

const gatherDependentValues = (getFieldValue, dependencyConditions, validatedFieldName, rule) => {
  const dependentFields = Object.keys(dependencyConditions.properties)
  const dependentValues = dependentFields.map((fieldName) => {
    const dependentValue = getFieldValue(rule.field.replace(validatedFieldName, fieldName).split('.'))

    if (!dependentValue && dependencyConditions.required?.includes(fieldName)) {
      return null
    }

    return [fieldName, dependentValue]
  })

  return array.compact(dependentValues)
}

const validateIfCondition = (condition, dependentValue) => {
  for (const [name, value] of Object.entries(condition)) {
    switch (name) {
      case 'pattern': {
        return new RegExp(value).test(dependentValue || '')
      }
      case 'const': {
        return value === dependentValue
      }
    }
  }
}

const buildAsyncValidatorSchemaDescriptor = (
  validatedFieldName,
  dependentValues,
  determinedValueType,
  conditionalRule
) => {
  const { if: dependencyConditions, then: truthyRequirements, else: falseyRequirements } = conditionalRule

  let descriptor = {}

  dependentValues.map(([dependentField, dependentValue]) => {
    const isIfConditionSuccessfull = validateIfCondition(
      dependencyConditions.properties[dependentField],
      dependentValue
    )
    if (isIfConditionSuccessfull) {
      descriptor[validatedFieldName] = {
        type: determinedValueType,
        ...truthyRequirements.properties[validatedFieldName]
      }
    } else if (falseyRequirements) {
      descriptor[validatedFieldName] = {
        type: determinedValueType,
        ...falseyRequirements.properties[validatedFieldName]
      }
    }
  })

  return descriptor
}

const applyRule = (conditionalRule, getFieldValue, rule, value) => {
  const { if: dependencyConditions, then: truthyRequirements, else: falseyRequirements } = conditionalRule
  const validatedFieldName = rule.field.split('.').slice(-1)

  if (validatedFieldInRequirements(validatedFieldName, truthyRequirements, falseyRequirements)) {
    const dependentValues = gatherDependentValues(getFieldValue, dependencyConditions, validatedFieldName, rule)

    const descriptor = buildAsyncValidatorSchemaDescriptor(
      validatedFieldName,
      dependentValues,
      determineValueType(value),
      conditionalRule
    )

    if (object.isEmpty(descriptor)) {
      return Promise.resolve()
    }

    const validator = new Schema(descriptor)
    return validator
      .validate({ [validatedFieldName]: value })
      .then(() => {})
      .catch(({ errors }) => {
        return Promise.reject(errors.map(({ message }) => message).join(' & '))
      })
  }

  return Promise.resolve()
}

export default (conditionalRules) =>
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (noConditionalRules(conditionalRules)) {
        return Promise.resolve()
      }

      let conditionalRule

      if (Array.isArray(conditionalRules)) {
        if (conditionalRules.length > 1) {
          console.warn('conditionalRulesValidator: multiple conditionalRules are not yet supported')
        }

        conditionalRule = conditionalRules[0]
      } else {
        conditionalRule = conditionalRules
      }

      return applyRule(conditionalRule, getFieldValue, rule, value)
    }
  })
