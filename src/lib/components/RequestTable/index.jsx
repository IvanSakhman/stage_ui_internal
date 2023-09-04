import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { App } from 'antd'

import { api } from '~su/utilities'
import { initializeApi } from '~su/actions'
import { getApiConfig } from '~su/store/root-store'
import { useTranslation } from '~su/utilities/i18n'

import Table from '../Table'
import Button from '../Button'

const RequestTable = ({ id, replaceString, collectionName, TableComponent, ...tableProps }) => {
  const { t } = useTranslation()
  const { message } = App.useApp()

  const initialState = { isLoading: true, actions: {}, isLoaded: false }
  const [state, setState] = useState(initialState)
  const [data, setData] = useState([])

  const updateState = (field, value) => {
    return setState((currentState) => {
      return { ...currentState, [field]: value }
    })
  }

  const apiActions = initializeApi(api, message)(getApiConfig)
  const { loadCollection } = apiActions(collectionName, { setState: updateState, setData })

  useEffect(() => {
    loadCollection({ id, replaceString })

    return () => {
      setData([])
      setState(initialState)
    }
  }, [id, replaceString, collectionName])

  const tableTitle = [
    t(collectionName, tableProps.title || collectionName),
    <Button.Reload
      key="table-reload"
      iconOnly
      onClick={() => loadCollection({ id, replaceString })}
      disabled={state.isLoading}
    />
  ]

  const Component = TableComponent || Table

  return (
    <Component dataSource={data} loading={state.isLoading} actions={state.actions} {...tableProps} title={tableTitle} />
  )
}

RequestTable.propTypes = {
  id: PropTypes.number.isRequired,
  replaceString: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  TableComponent: PropTypes.elementType
}

export default RequestTable
