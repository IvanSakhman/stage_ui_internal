import { Input, Space, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import string from '~su/utilities/string'

// type Props = {
//   columnKey: string
//   selectedKeys: array
//   setSelectedKeys: Function
//   confirm: Function
//   clearFilters: Function
// }

const SearchBox = ({ columnKey, selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${string.humanize(columnKey)}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={confirm}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button type="primary" onClick={confirm} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
          Search
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  )
}

export default SearchBox
