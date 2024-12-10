import { SearchOutlined } from '@ant-design/icons'
import Input from '~su/components/Input'
import Space from '~su/components/Space'
import Button from '~su/components/Button'
import { COLORS } from '~su/constants'

const getColumnSearchProps = (dataIndex) => {
  const confirmOptions = { closeDropdown: false }

  const handleReset = (clearFilters, confirm) => {
    clearFilters()
    confirm(confirmOptions)
  }

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm(confirmOptions)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm(confirmOptions)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? COLORS.primary : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
  }
}

export default getColumnSearchProps
