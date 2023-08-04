import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Typography } from 'antd'
import { SaveOutlined, EditOutlined, CloseOutlined, MinusCircleOutlined } from '@ant-design/icons'

import ButtonGroup from '~su/components/ButtonGroup'
import Button from '~su/components/Button'
import DropdownMenu from '~su/components/DropdownMenu'
import IconButton from '~su/components/IconButton'
import Table from '~su/components/Table'
import newRecord from '~su/utilities/newRecord'

import string from '~su/utilities/string'

// type Props = {
//   type: string
//   editingKey: string
//   data: object[]
//   variants: string[]
//   columns: object[]
//   controlFunctions: object
//   dataType: string
//   submitDisabled?: boolean
// }
const EditableTable = forwardRef(
  (
    {
      title,
      type,
      editingKey,
      dataSource: data,
      variants,
      columns: contentColumns,
      controlFunctions,
      extraControls = [],
      dataType,
      submitDisabled = false,
      addingDisabled = false,
      newRecordInitialValues = {},
      ...tableProps
    },
    ref
  ) => {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
      setDataSource(data)
    }, [data])

    useImperativeHandle(
      ref,
      () => ({
        cancel: cancel,
        edit: edit
      }),
      []
    )

    // isEditing = (record: object)
    const isEditing = (record) => record.id === editingKey
    const humanizedVariant = (variant = null) => {
      if (!variant) {
        return null
      }

      return string.translate(dataType, variant, (variant) => string.humanize(variant, { titleize: true }))
    }

    // cancel = (record: object)
    const cancel = (record) => {
      if (newRecord.checkIsNew(record)) {
        setDataSource((state) => state.filter((item) => !newRecord.checkIsNew(item)))
      }

      controlFunctions.onCancel()
    }

    // edit = (record: object)
    const edit = (record) => {
      controlFunctions.onEdit(record)
    }

    // add = (variant: string)
    const add = (variant = null) => {
      const record = newRecord.build({
        new: true,
        key: 'newRecord',
        title: humanizedVariant(variant),
        variant,
        ...newRecordInitialValues
      })

      setDataSource((state) => {
        return [record, ...state]
      })

      edit(record)
    }

    const addNewButton = () => {
      if (variants.length === 0) {
        return (
          <Button disabled={addingDisabled || editingKey != ''} onClick={() => add()}>
            Add new
          </Button>
        )
      }

      const variantsConfig = variants.map((variant) => {
        const type = typeof variant == 'string' ? variant : variant.type,
          pro = typeof variant == 'string' ? null : variant.pro

        return {
          display: humanizedVariant(type),
          onSelect: () => add(type),
          pro
        }
      })

      return (
        <DropdownMenu disabled={editingKey != ''} display="Add new" items={variantsConfig} placement="bottomRight" />
      )
    }

    const columns = [
      ...contentColumns,
      {
        title: 'Actions',
        dataIndex: 'actions',
        width: 150,
        // render: (_: any, record: object)
        render: (_, record) => {
          const editable = isEditing(record)
          return editable && type === 'inline' ? (
            <ButtonGroup>
              <IconButton
                icon={<SaveOutlined />}
                type="primary"
                tooltip={`Save ${dataType}`}
                onClick={() => controlFunctions.onSave(record)}
                disabled={submitDisabled}
              />
              <IconButton
                icon={<CloseOutlined />}
                danger
                tooltip="Cancel"
                onClick={() => cancel(record)}
                popconfirm={{ title: 'Are you sure to cancel?', placement: 'bottomRight', cancelText: 'No' }}
              />
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <IconButton
                icon={<EditOutlined />}
                warn
                tooltip={`Edit ${dataType}`}
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
              />
              <IconButton
                icon={<MinusCircleOutlined />}
                danger
                tooltip={`Delete ${dataType}`}
                disabled={editingKey !== ''}
                onClick={() => controlFunctions.onDelete(record)}
                popconfirm={{
                  title: string.translate(
                    'popconfirm_delete_title',
                    dataType,
                    () => `Are you sure to delete this ${dataType}?`
                  ),
                  placement: 'bottomRight',
                  cancelText: 'No'
                }}
              />
              {extraControls.map((control, index) => {
                const { onClick, if: controlCondition, ...controlProps } = control
                if (controlCondition(record)) {
                  return (
                    <IconButton
                      key={index}
                      {...controlProps}
                      onClick={() => onClick(record)}
                      disabled={editingKey !== ''}
                    />
                  )
                }
              })}
            </ButtonGroup>
          )
        }
      }
    ]

    const tableTitle = title ? (
      <>
        <Typography.Title level={5}>{title}</Typography.Title>
        {addNewButton()}
      </>
    ) : (
      addNewButton()
    )

    return <Table title={tableTitle} dataSource={dataSource} columns={columns} className="editable" {...tableProps} />
  }
)

export default EditableTable
