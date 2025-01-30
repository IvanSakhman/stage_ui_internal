import styled from 'styled-components'

import Table from '../Table'

const StyledTable = styled(Table)`
  .ant-table {
    background-color: transparent;
  }
  .ant-table-thead > tr > th {
    background-color: transparent !important;
  }
  .ant-table-tbody > tr > td {
    background-color: transparent !important;
  }
  .ant-table-expanded-row {
    background-color: transparent !important;
  }
  .ant-pagination {
    background-color: transparent;
  }
  .ant-pagination-item {
    background-color: transparent;
  }
`
export default StyledTable
