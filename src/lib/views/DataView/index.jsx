import { useEffect } from 'react'
import PropTypes from 'prop-types'

import ActionButtons from '~su/components/ActionButtons'
import PageContainer from '~su/components/PageContainer'

import SmartDataDisplay from '~su/components/SmartDataDisplay'

import setupActions from './actions'
import setupStore from './store'
import useDataViewSetup from './hooks'

const DataView = ({
  store,
  loadData,
  pageHeader = {},
  displayDataIn = 'table',
  dataDisplayComponentProps = {},
  children
}) => {
  const { useData, useDataStates, usePagination, useFilters, useViewActions } = store
  const entries = useData()
  const { isLoading } = useDataStates()
  const pagination = usePagination()
  const filters = useFilters()
  const viewActions = useViewActions()

  useEffect(() => {
    loadData(window.location.search)
  }, [])

  const renderData = () => {
    return (
      <>
        {children}
        <SmartDataDisplay
          dataSource={entries}
          pagination={pagination}
          loading={isLoading}
          actions={viewActions}
          filters={filters}
          displayDataIn={displayDataIn}
          {...dataDisplayComponentProps}
        />
      </>
    )
  }

  if (pageHeader) {
    const { actionsTranslateOptions, ...pageHeaderProps } = pageHeader
    const containerProps = {
      loading: isLoading,
      header: {
        ...pageHeaderProps,
        extra: <ActionButtons actions={viewActions?.page_header} {...actionsTranslateOptions} />
      }
    }

    return <PageContainer {...containerProps}>{renderData()}</PageContainer>
  }

  return renderData()
}

DataView.setupActions = setupActions
DataView.setupStore = setupStore
DataView.useDataViewSetup = useDataViewSetup

DataView.propTypes = {
  store: PropTypes.shape({
    useData: PropTypes.func.isRequired,
    useDataStates: PropTypes.func.isRequired,
    usePagination: PropTypes.func.isRequired,
    useFilters: PropTypes.func.isRequired,
    useViewActions: PropTypes.func.isRequired
  }).isRequired,
  loadData: PropTypes.func.isRequired,
  pageHeader: PropTypes.oneOfType([
    PropTypes.bool, // used to disable
    PropTypes.shape({
      actionsTranslateOptions: PropTypes.object
    })
  ]),
  displayDataIn: PropTypes.oneOf(['table', 'list']),
  dataDisplayComponentProps: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}

export default DataView
