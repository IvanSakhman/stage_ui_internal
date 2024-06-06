import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form as AntdForm, Row, Col } from 'antd'
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import formUtils from '~su/utilities/form'

import FieldsList from './FieldsList'

// type Props = {
//   name: string
//   className: string
//   object: any
//   fields: any
//   globalFields?: object[]
//   onFinish: Function
//   onCancel: Function
//   deleteItem?: Function
//   fieldsListName?: string
//   disable?: boolean
//   submitDisabledProp?: boolean
//   isNew?: boolean
// }

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
      _deleteItem,
      fieldsListName = null,
      fieldsListDynamic = false,
      disable = false,
      submitDisabledProp = true,
      children = null,
      onValuesChange = null,
      remoteControls = false,
      controlsProps = {},
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
        getFieldsValue: (fields) => form.getFieldsValue(fields),
        getFieldValue: (field) => form.getFieldValue(field),
        validate: () => form.validateFields()
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
        <ButtonGroup>
          <Button {...submitButtonProps}>{submitButtonProps.display}</Button>
          {onCancel && <Button {...cancelButtonProps}>{cancelButtonProps.display}</Button>}
        </ButtonGroup>
      )
    }

    return (
      <AntdForm
        name={name}
        className={className}
        layout="vertical"
        initialValues={object}
        onFinish={handleFinish}
        form={form}
        onFieldsChange={onChange}
        onValuesChange={onValuesChange}
        {...formProps}
      >
        {globalFields ? <FieldsList fields={globalFields} /> : null}
        {fields.length > 0 ? (
          <FieldsList dynamic={fieldsListDynamic} fields={fields} name={fieldsListName} disable={disable} />
        ) : null}

        {children}

        {!remoteControls ? (
          <Row justify="center">
            <Col>{renderControls()}</Col>
          </Row>
        ) : null}
      </AntdForm>
    )
  }
)

Form.useFormInstance = AntdForm.useFormInstance
Form.useWatch = AntdForm.useWatch

export default Form
