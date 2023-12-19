import PropTypes from 'prop-types'
import { Popover as AntdPopover } from 'antd'

import ActionButtons from '../ActionButtons'
import Space from '../Space'

const Popover = ({ prompt, action, record, functionActionHandlers, children }) => {
  let content = prompt.content

  if (action) {
    content = (
      <Space direction="vertical">
        {prompt.content}
        <ActionButtons actions={[action]} record={record} functionHandlers={functionActionHandlers} />
      </Space>
    )
  }

  return (
    <AntdPopover {...prompt} content={content} destroyTooltipOnHide zIndex={999}>
      {children}
    </AntdPopover>
  )
}

Popover.propTypes = {
  prompt: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    content: PropTypes.string
  }).isRequired,
  action: PropTypes.shape({
    name: PropTypes.string.isRequired,
    display: PropTypes.string,
    type: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
  }),
  record: PropTypes.object,
  functionActionHandlers: PropTypes.object,
  children: PropTypes.PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired
}

export default Popover
