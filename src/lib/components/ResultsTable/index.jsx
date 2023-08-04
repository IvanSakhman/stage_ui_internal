import PropTypes from 'prop-types'

import { useState, useEffect } from 'react'

import Table from '../Table'

import { buildFromResults as buildColumnsFromResults, normalizeResults } from './utilities/tableSupport'

const ResultsTable = ({ result, isLoading, extendColumnsConfig = null }) => {
  const [visibleRows, setVisibleRows] = useState(result?.length)

  useEffect(() => {
    setVisibleRows(result.length)
  }, [result])

  const normalizedResults = normalizeResults(result)
  const columns = buildColumnsFromResults(normalizedResults)

  return (
    <Table
      scroll={{ x: '100%', y: 'calc(100vh - 200px)' }}
      dataSource={normalizedResults.slice(0, visibleRows)}
      columns={extendColumnsConfig ? extendColumnsConfig(columns) : columns}
      loading={isLoading}
    />
  )
}

ResultsTable.propTypes = {
  result: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  extendColumnsConfig: PropTypes.func
}

export default ResultsTable
