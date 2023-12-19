import AutoComplete from '~su/components/AutoComplete'
import Input from '~su/components/Input'
import Select from '~su/components/Select'
import Switch from '~su/components/Switch'

import renderBasedOnType from '~su/utilities/renderBasedOnType'
import formUtils from '../index'

const buildComponentForReadOnly = (type, schema) => {
  const valueKey = type === 'boolean' ? 'checked' : 'value'

  const { valueEnum } = schema

  return (record) => {
    let value = record[valueKey]

    value = valueEnum ? formUtils.valueFromValueEnum(valueEnum, value) : value
    return renderBasedOnType(type, value)
  }
}

const buildComponentForArrayType = ({ type, ...schema }) => {
  switch (type) {
    case 'string':
      return {
        component: Select,
        props: { mode: 'tags', enums: schema.enum, valueEnum: schema.valueEnum, fixParentNode: true }
      }
    default:
      return { component: Input }
  }
}

const buildComponentForString = ({ enum: enums, valueEnum, userInputAllowed }) => {
  if (enums || valueEnum) {
    const props = userInputAllowed ? {} : { fixParentNode: true, showSearch: true }

    return {
      component: userInputAllowed ? AutoComplete : Select,
      props: { enums: enums, valueEnum: valueEnum, ...props }
    }
  } else {
    return { component: Input }
  }
}

const buildComponentForInteger = ({ enum: enums, valueEnum }) =>
  enums || valueEnum
    ? { component: Select, props: { enums: enums, valueEnum: valueEnum, fixParentNode: true } }
    : { component: Input.Number }

// eslint-disable-next-line react/prop-types
export default ({ type, readOnly, ...schema }, componentProps = {}) => {
  if (Array.isArray(type)) {
    type = type.pop() // eslint-disable-line react/prop-types
  }

  if (readOnly) {
    const Component = buildComponentForReadOnly(type, schema)
    return <Component {...componentProps} />
  }

  // let Component = null
  let builtComponentConfig = null

  switch (type) {
    case 'array': {
      builtComponentConfig = buildComponentForArrayType(schema.items)
      break
    }
    case 'boolean':
      builtComponentConfig = { component: Switch }
      break
    case 'string': {
      builtComponentConfig = buildComponentForString(schema)
      break
    }
    case 'integer': {
      builtComponentConfig = buildComponentForInteger(schema)
      break
    }
    default:
      builtComponentConfig = { component: Input }
      break
  }

  const { component: Component, props = {} } = builtComponentConfig
  return <Component {...props} {...componentProps} />
}

let testExports = {}
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == 'test') {
  testExports = {
    buildComponentForReadOnly,
    buildComponentForArrayType,
    buildComponentForString,
    buildComponentForInteger
  }
}

export { testExports }
