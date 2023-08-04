import { Space } from 'antd'
import { blue, red, green } from '@ant-design/colors'
import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons'

import IconButton from '~su/components/IconButton'

import { StyledBadge } from './index.styled'

const EditableNodeTitle = ({ node: nodeData, onUpdate, onNodeDeleted, setEditNodeDrawer, allowDeletionOfRoots }) => {
  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Space align="start">
        <span>
          {nodeData.required ? <sup style={{ color: red[4] }}>*</sup> : null}
          {nodeData.title}
        </span>
        <StyledBadge
          count={nodeData.column ? nodeData.column : null}
          onClick={() => onUpdate(nodeData.key, { column: null })}
          title="Click to unlink"
        />
        <StyledBadge
          $color={green[8]}
          count={nodeData.text_value ? nodeData.text_value : null}
          title={`Text value: ${nodeData.text_value}`}
        />
      </Space>
      <Space align="end">
        <StyledBadge
          $color={blue[8]}
          count={nodeData.attributes?.length > 0 ? 'has attributes' : null}
          title={nodeData.attributes?.map((attr) => `${attr.name}: ${attr.value}`).join('\n')}
        />
        <IconButton
          key={'edit-node-btn'}
          icon={<EditOutlined />}
          tooltip="Edit"
          size="small"
          onClick={(_e) => setEditNodeDrawer({ key: nodeData.key, title: nodeData.title, visible: true })}
        />
        <IconButton
          key={'delete-node-btn'}
          icon={<MinusCircleOutlined />}
          danger
          size="small"
          tooltip="Delete"
          disabled={allowDeletionOfRoots ? false : nodeData.root && nodeData.children?.length > 0}
          onClick={() => onNodeDeleted(nodeData.key)}
          popconfirm={{ title: 'Are you sure to delete this node?', placement: 'bottomRight' }}
        />
      </Space>
    </Space>
  )
}

export default EditableNodeTitle
