import { Space } from 'antd'

// type Props = {
//   children: any
//   className?: string
// }

export default ({ children, className = null, style }) => {
  return (
    <Space className={className} orientation="horizontal" gap={5} style={style}>
      {children}
    </Space>
  )
}
