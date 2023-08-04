import { cloneElement } from 'react'
import { Form, Col } from 'antd'
import { StyledField } from './index.styled'
import ProField from './Pro'

import string from '~su/utilities/string'

// type Props = {
//   field: any
//   index: number | string
//   extras?: any
//   disable?: boolean
//   dynamic?: boolean
//   className?: string
// }

const Field = ({ field, index, disable = false, dynamic = false, extras = {}, className = '' }) => {
  const { item } = field
  let { component } = field

  if (disable) {
    component = cloneElement(component, { disabled: disable }, null)
  }

  if (component?.type?.name == 'FieldsList') {
    component = cloneElement(component, { name: [extras.formField.name, component.props.name] }, null)
  }

  if (!item) {
    return (
      <Col span={24} key={index}>
        {component}
      </Col>
    )
  }

  const { name: itemName, label, dependencies, hideUnless, width, pro, prefix: _prefix, ...rest } = item

  const fieldName = dynamic ? [extras.formField.name, itemName].flat() : itemName,
    fieldKey = dynamic ? [extras.formField.fieldKey, itemName].flat() : [itemName, index],
    fieldDependencies = dynamic
      ? dependencies?.map((dependency) => {
          const copy = dependency.slice()
          copy.splice(1, 0, extras.formField.name)
          return copy
        })
      : dependencies

  const FieldComponent = pro ? ProField : StyledField

  let fieldComponent = (
    <FieldComponent
      key={index}
      name={fieldName}
      fieldKey={fieldKey}
      label={label === false ? null : label || string.humanize(itemName, { capitalize: true })}
      className={[className].join(' ')}
      dependencies={fieldDependencies}
      {...rest}
    >
      {component}
    </FieldComponent>
  )

  fieldComponent = (
    <Col span={width || 24} key={index}>
      {fieldComponent}
    </Col>
  )

  if (hideUnless) {
    return (
      <Form.Item noStyle dependencies={fieldDependencies}>
        {({ getFieldValue }) => {
          const dependenciesValues = fieldDependencies.map((fieldDependency) => getFieldValue(fieldDependency))
          return hideUnless(dependenciesValues) ? fieldComponent : null
        }}
      </Form.Item>
    )
  }

  return fieldComponent
}

export default Field
