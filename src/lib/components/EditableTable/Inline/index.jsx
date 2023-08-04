import { useState, useEffect } from 'react'
import { Form } from 'antd'
import newRecordUtilities from '~su/utilities/newRecord'

import EditableTable from '../index'

import { StyledCell, StyledField } from './index.styled'

// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//   editing: boolean
//   dataIndex: string
//   title: any
//   record: object
//   index: number
//   children: React.ReactNode
//   field: object
// }

const EditableCell = ({ editing, dataIndex, _title, _record, _index, children, field, ...restProps }) => {
  return <StyledCell {...restProps}>{editing ? <StyledField field={field} index={dataIndex} /> : children}</StyledCell>
}

const EditableRow = ({ form, record = {}, children, controlFunctions, ...restProps }) => {
  const { variant } = record
  const isNew = newRecordUtilities.checkIsNew(record)
  const newRecord = isNew ? controlFunctions?.useNew() : {}

  useEffect(() => {
    if (isNew) {
      controlFunctions.onAdd(variant)
    }
  }, [isNew, variant])

  useEffect(() => {
    if (isNew) {
      form.setFieldsValue({ ...newRecord })
    }
  }, [isNew, newRecord])

  return <tr {...restProps}>{children}</tr>
}

const InlineEditableTable = ({ columns: contentColumns, fields, controls: controlFunctions, ...rest }) => {
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(null)
  const newRecordInitialValues = controlFunctions?.useNew()

  // isEditing = (record: object)
  const isEditing = (record) => {
    return record.id === editingKey
  }

  const edit = (record) => {
    form.setFieldsValue({ ...record })
    setSubmitDisabled(!record.new)
    setEditingKey(record.id)
  }

  // const save = async (record)
  const save = async (record) => {
    try {
      const row = await form.validateFields()

      controlFunctions.onSave(record.id, { ...record, ...row }, () => setEditingKey(''))
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const mergedColumns = contentColumns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      // onCell: (record) => ({
      onCell: (record) => ({
        record,
        field: fields.find((field) => field.item.name == col.key),
        dataIndex: record.id || col.dataIndex || col.key,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  const onFieldsChange = (fields) => {
    const errors = fields.flatMap((field) => field.errors)
    if (errors.length > 0) {
      setSubmitDisabled(true)
    } else {
      setSubmitDisabled(false)
    }
  }

  return (
    <Form form={form} preserve={false} component={false} onFieldsChange={onFieldsChange}>
      <EditableTable
        type="inline"
        editingKey={editingKey}
        newRecordInitialValues={newRecordInitialValues}
        components={{
          body: {
            cell: EditableCell,
            row: EditableRow
          }
        }}
        onRow={(record, _rowIndex) => {
          return { record, controlFunctions, form }
        }}
        columns={mergedColumns}
        controlFunctions={{
          ...controlFunctions,
          onEdit: edit,
          onSave: save,
          onCancel: () => setEditingKey('')
        }}
        submitDisabled={submitDisabled}
        {...rest}
      />
    </Form>
  )
}

export default InlineEditableTable
