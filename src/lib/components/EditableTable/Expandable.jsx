import { useState, useRef } from 'react'

import EditableTable from './index'

const ExpandableEditableTable = ({ Form, controls: controlFunctions, queryId, ...rest }) => {
  const editableTable = useRef(null)
  const [editingKey, setEditingKey] = useState('')

  // handleSave = (values: object)
  const handleSave = (values) => {
    return controlFunctions.onSave(values.id, values, () => setEditingKey(''))
  }

  return (
    <EditableTable
      ref={editableTable}
      type="expandable"
      editingKey={editingKey}
      expandable={{
        expandIconColumnIndex: -1,
        expandedRowKeys: [editingKey],
        expandedRowRender: (record, index, _indent, expanded) => {
          return expanded ? (
            <Form
              key={index}
              object={record}
              queryId={queryId}
              onFormSubmit={handleSave}
              onCancel={() => editableTable.current?.cancel(record)}
            />
          ) : null
        }
      }}
      controlFunctions={{
        ...controlFunctions,
        onEdit: ({ id, key }) => setEditingKey(id || key),
        onCancel: () => setEditingKey('')
      }}
      {...rest}
    />
  )
}

export default ExpandableEditableTable
