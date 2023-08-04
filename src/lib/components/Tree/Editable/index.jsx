import { useState, useEffect } from 'react'
import { Input, message } from 'antd'

import { PlusOutlined } from '@ant-design/icons'

import IconButton from '~su/components/IconButton'
import tree from '~su/utilities/tree'

import Tree from '../index'
import FormInDrawer from './FormInDrawer'
import NodeTitle from './NodeTitle'

// type Props = {
//   items: any[]
//   searchable?: boolean
//   selectable?: boolean
//   onItemSelect?: Function
// }

const EditableTree = (props) => {
  const [editNodeDrawer, setEditNodeDrawer] = useState({ visible: false })
  const [addFailed, setAddFailed] = useState(false)
  const [searchComponentValue, setSearchComponentValue] = useState(null)

  const { editable: formProps, data } = props

  useEffect(() => {
    if (props.data && props.data.find((node) => node.title === searchComponentValue)) {
      setSearchComponentValue(null)
    }
  }, [props.data])

  const handleEditNodeFormSubmit = (values) => {
    props.onUpdate(editNodeDrawer.key, values)

    setEditNodeDrawer({ visible: false })
  }

  const onNewAdded = (_ev) => {
    const value = searchComponentValue
    if (!value) {
      message.error({ content: 'You need to provide the name for new node', duration: 2.5 })
      setAddFailed(true)
      return
    }

    setAddFailed(false)
    props.onNodeAdded(value)
  }

  const titleComponent = (node) => {
    return (
      <NodeTitle
        node={node}
        onUpdate={props.onUpdate}
        allowDeletionOfRoots={data.length > 1}
        onNodeDeleted={props.onNodeDeleted}
        setEditNodeDrawer={setEditNodeDrawer}
      />
    )
  }

  const searchComponent = (
    <Input
      placeholder="Search nodes or add new"
      onPressEnter={onNewAdded}
      value={searchComponentValue}
      onChange={(event) => setSearchComponentValue(event.target.value)}
      addonAfter={<IconButton icon={<PlusOutlined />} onClick={onNewAdded} className={'ant-input-search-button'} />}
      status={addFailed ? 'error' : null}
      className="ant-input-search"
    />
  )

  return (
    <div>
      <Tree titleRender={titleComponent} data={data} searchComponent={searchComponent} {...props} />

      {editNodeDrawer.visible ? (
        <FormInDrawer
          initialValues={tree.findNode(props.data, editNodeDrawer.key, 'key')}
          nodeDrawer={editNodeDrawer}
          onClose={() => setEditNodeDrawer({ visible: false })}
          onFormSubmit={handleEditNodeFormSubmit}
          {...formProps}
        />
      ) : null}
    </div>
  )
}

export default EditableTree

// ant-btn ant-btn-icon-only ant-input-search-button
