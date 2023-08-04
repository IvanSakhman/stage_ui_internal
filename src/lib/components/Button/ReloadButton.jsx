import { ReloadOutlined } from '@ant-design/icons'

import Button from './base'

export default ({ children, ...props }) => {
  return (
    <Button type="primary-dashed" icon={<ReloadOutlined />} iconSize={14} {...props}>
      {children || 'Refresh'}
    </Button>
  )
}
