import PropTypes from 'prop-types'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form as AntdForm, Col } from 'antd'
import formUtils from '~su/utilities/form'
import { StyledForm, StyledRow } from './index.styled'
import FieldsList from './FieldsList'
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'

const Form = forwardRef(
  (
    {
      name,
      className,
      object,
      fields = [],
      onFinish,
      globalFields = null,
      onCancel,
      fieldsListName = null,
      fieldsListDynamic = false,
      dynamicFieldsInitialValues,
      showFieldsListTitle = false,
      disable = false,
      submitDisabledProp = true,
      children = null,
      onValuesChange = null,
      remoteControls = false,
      controlsProps = {},
      isModalForm = false,
      fieldsContainer,
      layout = 'vertical',
      boldLabels,
      horizontalGlobalFields,
      horizontalFields,
      ...formProps
    },
    ref
  ) => {
    const [form] = AntdForm.useForm()
    const [submitDisabled, setSubmitDisabled] = useState(submitDisabledProp)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useImperativeHandle(
      ref,
      () => ({
        setFieldsValue: (fieldsValue) => form.setFieldsValue(fieldsValue),
        setFieldValue: (field, fieldValue) => form.setFieldValue(field, fieldValue),
        getFieldsValue: (fields) => form.getFieldsValue(fields),
        getFieldValue: (field) => form.getFieldValue(field),
        validate: () => form.validateFields(),
        resetFields: () => form.resetFields()
      }),
      []
    )

    useEffect(() => {
      setSubmitDisabled(submitDisabledProp)
    }, [submitDisabledProp])

    const cancel = () => {
      form.resetFields()
      onCancel()
    }

    const onChange = (fields) => {
      const errors = fields.flatMap((field) => field.errors)
      if (errors.length > 0) {
        setSubmitDisabled(true)
      } else {
        setSubmitDisabled(false)
        setIsSubmitting(false)
      }
    }

    form.setErrorsFromResponse = (errors) => {
      if (errors) {
        form.setFields(formUtils.getFormErrors(errors))
      }
    }

    const handleFinish = (values) => {
      setIsSubmitting(true)
      onFinish({ values, form }).then(() => setIsSubmitting(false))
    }

    useEffect(() => {
      if (disable) {
        setSubmitDisabled(true)
      }
    }, [disable])

    const renderControls = () => {
      let { submitButton: submitButtonProps, cancelButton: cancelButtonProps } = controlsProps

      cancelButtonProps = {
        onClick: cancel,
        danger: true,
        popconfirm: { title: 'Are you sure to cancel?', placement: 'bottomRight', cancelText: 'No' },
        display: 'Cancel',
        disabled: isSubmitting,
        ...cancelButtonProps
      }

      submitButtonProps = {
        type: 'primary',
        htmlType: 'submit',
        disabled: submitDisabled,
        loading: isSubmitting,
        display: 'Save',
        ...submitButtonProps
      }

      return (
        <ButtonGroup style={{ flexDirection: isModalForm ? 'row-reverse' : 'row' }}>
          <Button {...submitButtonProps}>{submitButtonProps.display}</Button>
          {onCancel && <Button {...cancelButtonProps}>{cancelButtonProps.display}</Button>}
        </ButtonGroup>
      )
    }

    return (
      <StyledForm
        name={name}
        className={className}
        layout={layout}
        initialValues={object}
        onFinish={handleFinish}
        form={form}
        onFieldsChange={onChange}
        onValuesChange={onValuesChange}
        $isModalForm={isModalForm}
        {...formProps}
      >
        {globalFields && (
          <FieldsList
            fields={globalFields}
            container={fieldsContainer}
            boldLabels={boldLabels}
            horizontal={horizontalGlobalFields}
          />
        )}

        {!!fields.length && (
          <FieldsList
            dynamic={fieldsListDynamic}
            fields={fields}
            fieldsInitialValues={dynamicFieldsInitialValues}
            name={fieldsListName}
            disable={disable}
            showTitle={showFieldsListTitle}
            container={fieldsContainer}
            boldLabels={boldLabels}
            horizontal={horizontalFields}
          />
        )}

        {children}

        {!remoteControls && (
          <StyledRow justify="center" $isModalForm={isModalForm}>
            <Col>{renderControls()}</Col>
          </StyledRow>
        )}
      </StyledForm>
    )
  }
)

Form.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  object: PropTypes.object,
  fields: PropTypes.array,
  onFinish: PropTypes.func.isRequired,
  globalFields: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.shape({ disable: PropTypes.bool })
      })
    )
  ]),
  onCancel: PropTypes.func,
  fieldsListName: PropTypes.string,
  fieldsListDynamic: PropTypes.bool,
  dynamicFieldsInitialValues: PropTypes.object,
  showFieldsListTitle: PropTypes.bool,
  disable: PropTypes.bool,
  submitDisabledProp: PropTypes.bool,
  children: PropTypes.node,
  onValuesChange: PropTypes.func,
  remoteControls: PropTypes.bool,
  controlsProps: PropTypes.object,
  isModalForm: PropTypes.bool,
  fieldsContainer: PropTypes.shape({
    type: PropTypes.oneOf(['Card']),
    props: PropTypes.object
  }),
  layout: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
  boldLabels: PropTypes.bool,
  horizontalGlobalFields: PropTypes.bool,
  horizontalFields: PropTypes.bool
}

Form.useFormInstance = AntdForm.useFormInstance
Form.useWatch = AntdForm.useWatch
Form.List = AntdForm.List
Form.Item = AntdForm.Item

export default Form
