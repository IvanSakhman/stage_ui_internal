import { Space } from 'antd'

const TableToolbar = ({ children }) => {
  return <Space style={{ width: '100%', justifyContent: 'space-between' }}>{children}</Space>
}

export default TableToolbar
