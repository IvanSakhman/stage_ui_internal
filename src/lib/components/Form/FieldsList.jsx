import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form as AntdForm, Button, Row, Divider } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import Field from './Field'

import string from '~su/utilities/string'

// type Props = {
//   fields: any
//   name?: string
//   disable?: boolean
//   dynamic?: boolean
//   showTitle?: boolean
// }

const FieldsList = ({
  fields: fieldsConfig,
  fieldsInitialValues,
  disable = false,
  name = null,
  dynamic = false,
  actions = { isAddAllowed: true, isRemoveAllowed: true },
  showTitle = false,
  separateItems = false,
  rules = [],
  className,
  onAdd
}) => {
  const renderFields = (_formFields, _controlActions, extras = {}) => {
    const fields = dynamic && typeof fieldsConfig === 'function' ? fieldsConfig(extras) : fieldsConfig

    return fields.map((field, index) => {
      return (
        <Field
          key={index}
          field={field}
          index={index}
          disable={disable || field.item?.disable}
          dynamic={dynamic}
          extras={extras}
        />
      )
    })
  }

  const renderDynamicFields = (formFields, { add, remove }, { errors }) => {
    let f = formFields.map((formField, index) => {
      return (
        <Row gutter={[10, 5]} key={index} style={{ position: 'relative', paddingRight: 20 }}>
          {renderFields(formFields, { add, remove }, { formField })}
          {actions.isRemoveAllowed && (
            <MinusCircleOutlined onClick={() => remove(formField.name)} style={{ position: 'absolute', right: 5 }} />
          )}
          {separateItems ? <Divider /> : null}
        </Row>
      )
    })

    return (
      <>
        <AntdForm.ErrorList errors={errors} />
        {f}
        {actions.isAddAllowed && (
          <AntdForm.Item>
            <Button
              type="dashed"
              onClick={() => add(fieldsInitialValues)}
              block
              icon={<PlusOutlined />}
              disabled={disable}
            >
              Add {string.singularize(string.humanize(Array.isArray(name) ? name[name.length - 1] : name))}
            </Button>
          </AntdForm.Item>
        )}
      </>
    )
  }

  const Wrapper = dynamic ? Fragment : Row
  const wrapperProps = dynamic ? {} : { className, gutter: [10, 5] }

  return (
    <>
      {showTitle ? <h3>{string.humanize(name, { capitalize: true })}</h3> : null}
      <Wrapper {...wrapperProps}>
        {name ? (
          <AntdForm.List name={name} rules={rules}>
            {dynamic ? renderDynamicFields : renderFields}
          </AntdForm.List>
        ) : (
          renderFields(null, {})
        )}
      </Wrapper>
    </>
  )
}

FieldsList.propTypes = {
  fields: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.shape({ disable: PropTypes.bool })
      })
    )
  ]).isRequired,
  fieldsInitialValues: PropTypes.object,
  disable: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  dynamic: PropTypes.bool,
  actions: PropTypes.shape({
    isAddAllowed: PropTypes.bool,
    isRemoveAllowed: PropTypes.bool
  }),
  showTitle: PropTypes.bool,
  separateItems: PropTypes.bool,
  rules: PropTypes.array,
  className: PropTypes.string
}

export default FieldsList
