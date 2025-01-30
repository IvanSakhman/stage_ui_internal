import StyledTable from './index.styled'

const ExpandedRowTable = ({ dataSource, columnsConfig, keyPrefix, rowKey, ...restProps }) => {
  return (
    <StyledTable
      dataSource={dataSource}
      columnsConfig={columnsConfig}
      keyPrefix={keyPrefix}
      rowKey={rowKey}
      {...restProps}
    />
  )
}

export default ExpandedRowTable
