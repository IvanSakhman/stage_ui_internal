import string from '~su/utilities/string'
import buildComponent from './componentBuilders'
import buildRules from './rulesBuilder'

const gatherDependencies = (name, conditionalRules) => {
  let dependencies = []

  if (!conditionalRules) {
    return dependencies
  }

  const findDependentKeys = (conditionalRule) => {
    return Object.keys({
      ...(conditionalRule?.then?.properties || {}),
      ...(conditionalRule?.else?.properties || {})
    }).includes(name)
      ? Object.keys(conditionalRule.if.properties)
      : []
  }

  let dependentKeys = []
  if (Array.isArray(conditionalRules)) {
    dependentKeys = [
      ...new Set(conditionalRules.map((conditionalRule) => gatherDependencies(name, conditionalRule)).flat(2))
    ]
  } else {
    dependentKeys = findDependentKeys(conditionalRules)
  }

  if (dependentKeys.length > 0) {
    dependencies.push(dependentKeys)
  }

  return dependencies
}

const buildFieldConfig = (
  [name, properties],
  required,
  conditionalRules,
  extraConfig = {},
  namePrefix = null,
  translations = {}
) => {
  const { item: itemExtraConfig, component: Component, componentProps = {} } = extraConfig

  return {
    item: {
      name: namePrefix ? [namePrefix, name] : name,
      label: string.humanize(name, { capitalize: true }),
      rules: [{ required }, ...buildRules(properties, conditionalRules)],
      hasFeedback: true,
      valuePropName: properties.type === 'boolean' ? 'checked' : 'value',
      dependencies: gatherDependencies(name, conditionalRules),
      initialValue: properties.default,
      ...translations,
      ...(itemExtraConfig || {})
    },
    component: Component ? <Component /> : buildComponent(properties, componentProps)
  }
}

const gatherTranslatedConfig = (t, fieldName, additionalScope) => {
  if (!t) {
    return {}
  }

  const translationKey = (additionalScope ? ['field', additionalScope, fieldName] : ['field', fieldName])
    .flat()
    .filter((scope) => scope)
    .join('.')

  return t(translationKey, { defaultValue: {}, returnObjects: true })
}

const buildFields = (schema, extraFieldConfigs = {}, namePrefix = null, t, typeFieldValue = null) => {
  const { properties, required, allOf: conditionalRules } = schema

  const fields = Object.entries(properties)
    .map(([name, entrySchema]) => {
      const { type } = entrySchema

      if (type === 'object') {
        extraFieldConfigs = extraFieldConfigs[name] || {}

        if (entrySchema.anyOf) {
          entrySchema = entrySchema.anyOf.find(({ of_type }) => of_type === typeFieldValue) // type cannot be used as it is a reserved keyword in JSONSchema
          extraFieldConfigs = extraFieldConfigs[typeFieldValue] || {}
        }

        return buildFields(entrySchema, extraFieldConfigs, name, t, typeFieldValue)
      }

      return buildFieldConfig(
        [name, entrySchema],
        required.includes(name),
        conditionalRules,
        extraFieldConfigs[name],
        namePrefix,
        gatherTranslatedConfig(t, name, [namePrefix, typeFieldValue])
      )
    })
    .flat()

  return fields
}

let testExports = {}
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == 'test') {
  testExports = { buildFieldConfig }
}

export { testExports }

export default buildFields
