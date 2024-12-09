import { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'

import { Col } from '~su/components/Grid'
import Checkbox from '~su/components/Checkbox'

import { StyledField } from './index.styled'
import ProField from './Pro'

import string from '~su/utilities/string'

import { useTranslation, withScopedTranslations } from '~su/utilities/i18n'

const Field = ({ field, index, disable = false, dynamic = false, extras = {}, className = '' }) => {
  const { t } = useTranslation()

  const { item } = field
  let { component } = field

  if (disable) {
    component = cloneElement(component, { disabled: disable }, null)
  }

  if (component?.type === Checkbox) {
    component = cloneElement(component, {
      ...component.props,
      checked: undefined
    })
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

  const { name: itemName, label, dependencies, hideUnless, width, fieldCol = {}, pro, prefix: _prefix, ...rest } = item

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
      label={label === false ? null : label || t(`${itemName}.label`, string.humanize(itemName, { capitalize: true }))}
      className={[className].join(' ')}
      valuePropName={component?.type === Checkbox ? 'checked' : 'value'}
      dependencies={fieldDependencies}
      {...rest}
    >
      {component}
    </FieldComponent>
  )

  fieldComponent = (
    <Col span={width || 24} key={index} {...fieldCol}>
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

const fieldNamePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired
])

Field.propTypes = {
  field: PropTypes.shape({
    item: PropTypes.shape({
      name: fieldNamePropType,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.node]),
      dependencies: PropTypes.arrayOf(fieldNamePropType),
      hideUnless: PropTypes.func,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      pro: PropTypes.bool,
      prefix: PropTypes.string,
      fieldCol: Col.types
    }),
    component: PropTypes.element
  }),
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  extras: PropTypes.shape({}),
  disable: PropTypes.bool,
  dynamic: PropTypes.bool,
  className: PropTypes.string
}

export default withScopedTranslations(Field, 'field')
