import { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Form as AntdForm, Button, Row, Col, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import string from '~su/utilities/string'

import getContainer from './utilities'
import Field from './Field'
import { DeleteIcon } from './index.styled'
import Space from '../Space'

// type Props = {
//   fields: any
//   name?: string
//   disable?: boolean
//   dynamic?: boolean
//   showTitle?: boolean
// }

const defaultActions = {
  isAddAllowed: true,
  isRemoveAllowed: true,
  preventLastItemRemoval: false,
  isDeleteButtonInGrid: false
}

const FieldsList = ({
  fields: fieldsConfig,
  fieldsInitialValues,
  disable = false,
  name = null,
  dynamic = false,
  actions: { isAddAllowed, isRemoveAllowed, preventLastItemRemoval, isDeleteButtonInGrid } = defaultActions,
  title,
  showTitle = false,
  separateItems = false,
  rules = [],
  className,
  onAdd,
  container,
  boldLabels,
  gutter = [10, 5]
}) => {
  const renderFields = (_formFields, { remove }, extras = {}) => {
    const fields = dynamic && typeof fieldsConfig === 'function' ? fieldsConfig(extras) : fieldsConfig

    return (
      <Fragment>
        {fields.map((field, index) => (
          <Field
            key={index}
            field={field}
            index={index}
            disable={disable || field.item?.disable}
            dynamic={dynamic}
            extras={extras}
            boldLabel={boldLabels}
          />
        ))}
        {extras?.isDynamic && extras?.isDeleteButtonVisible && isDeleteButtonInGrid && (
          <Col>
            <DeleteIcon onClick={() => remove(extras.formField.name)} $isDeleteButtonInGrid />
          </Col>
        )}
      </Fragment>
    )
  }

  const renderDynamicFields = (formFields, { add, remove }, { errors }) => {
    let f = formFields.map((formField, index) => {
      const isDeleteButtonVisible = isRemoveAllowed && !(formFields.length === 1 && preventLastItemRemoval)
      const isDeleteButtonAlignedRight = isDeleteButtonVisible && !isDeleteButtonInGrid

      return (
        <Row
          gutter={gutter}
          key={index}
          style={{ position: 'relative', ...(isDeleteButtonAlignedRight ? { paddingRight: 28 } : {}) }}
        >
          {renderFields(
            formFields,
            { add, remove },
            { formField, rowKey: index, isDynamic: true, isDeleteButtonVisible }
          )}
          {isDeleteButtonAlignedRight && <DeleteIcon onClick={() => remove(formField.name)} />}
          {separateItems ? <Divider /> : null}
        </Row>
      )
    })

    return (
      <>
        <AntdForm.ErrorList errors={errors} />
        {f}
        {isAddAllowed && (
          <AntdForm.Item>
            <Button
              type="dashed"
              onClick={() => (onAdd ? onAdd(add) : add(fieldsInitialValues))}
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

  const Container = useMemo(() => getContainer(container?.type), [container])
  const Wrapper = dynamic ? Fragment : Row
  const wrapperProps = dynamic ? {} : { className, gutter }

  return (
    <Container {...container?.props}>
      {showTitle && (
        <>
          <h3>{title || string.humanize(name, { capitalize: true })}</h3>
          {container?.type === 'Card' && <Divider style={{ marginTop: '12px' }} />}
        </>
      )}
      <Wrapper {...wrapperProps}>
        {name ? (
          <AntdForm.List name={name} rules={rules}>
            {dynamic ? renderDynamicFields : renderFields}
          </AntdForm.List>
        ) : (
          renderFields(null, {})
        )}
      </Wrapper>
    </Container>
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
    isRemoveAllowed: PropTypes.bool,
    preventLastItemRemoval: PropTypes.bool,
    isDeleteButtonInGrid: PropTypes.bool
  }),
  title: PropTypes.string,
  showTitle: PropTypes.bool,
  separateItems: PropTypes.bool,
  rules: PropTypes.array,
  className: PropTypes.string,
  onAdd: PropTypes.func,
  fieldsContainer: PropTypes.shape({
    type: PropTypes.oneOf(['Card']),
    props: PropTypes.object
  }),
  boldLabels: PropTypes.bool,
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number), PropTypes.object])
}

export default FieldsList
