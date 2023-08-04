import { message } from 'antd'

import newRecord from '~su/utilities/newRecord'
import string from '~su/utilities/string'

const { singularize, capitalize } = string

export default (api) => (getApiConfig) => {
  const getMessageKey = (action, recordType, id) =>
    `${action}-${recordType}-${newRecord.checkIsNew({ id }) ? 'new' : id}`

  const getApiPath = ({ action, recordType, id, path, replaceString = ':id' }) => {
    if (path) {
      return path
    }

    const apiConfig = getApiConfig()
    const apiPath = apiConfig[`${action}_${recordType}_path`]

    return id ? apiPath.replace(replaceString, id) : apiPath
  }

  return (collectionName, collectionActions = {}) => {
    const loadCollection = ({ id, replaceString, path, onSuccess, onError, search = null, headers = {} }) => {
      let apiPath = getApiPath({
        action: 'load',
        recordType: collectionName,
        id,
        path,
        replaceString
      })

      if (search) {
        apiPath = apiPath + `?${search}`
      }

      collectionActions.setState?.('isLoading', true)

      return api.get(apiPath, headers).then((response) => {
        const { success, errors: _errors, data, message: responseMessage, actions: actions } = response

        if (!success) {
          message.error(responseMessage)

          if (onError) {
            onError(response)
          }
        } else {
          collectionActions.setData(data, true)

          if (onSuccess) {
            onSuccess(response)
          }
        }

        collectionActions.setState?.('actions', actions)
        collectionActions.setState?.('isLoading', false)
        collectionActions.setState?.('isLoaded', true)
      })
    }

    const saveRecord = (id, resourceId, data, onSuccess, path = null, additionalParams = {}) => {
      const isNewRecord = newRecord.checkIsNew({ id })
      const recordType = singularize(collectionName)
      const messageKey = getMessageKey('saving', recordType, id)

      collectionActions.setState('isSaving', true)
      message.loading({ content: 'Saving...', key: messageKey })

      const handleResponse = ({ success, errors: _errors, data, message: responseMessage, actions: _actions }) => {
        if (!success) {
          message.error({ content: responseMessage, key: messageKey })
        } else {
          message.destroy(messageKey)
          collectionActions.setItem?.(data, isNewRecord)
          onSuccess && onSuccess(data)
        }

        collectionActions.setState('isSaving', false)
      }

      const normalizedData = collectionActions.normalizeForApi ? collectionActions.normalizeForApi(data) : data
      const scope = recordType == 'format' ? 'qformat' : recordType // waiting for investigation https://assembly-tech.atlassian.net/browse/DS-102 to be removed
      const { method, payload, apiPath } = isNewRecord
        ? {
            method: 'post',
            payload: normalizedData,
            apiPath: getApiPath({
              action: 'create',
              recordType,
              id: resourceId,
              path,
              replaceString: ':query_id'
            })
          }
        : {
            method: 'put',
            payload: { ...normalizedData, id },
            apiPath: getApiPath({ action: 'update', recordType, path, id })
          }

      api[method](apiPath, { [scope]: payload, ...additionalParams }).then(handleResponse)
    }

    const deleteRecord = (id, onSuccess = null) => {
      const recordType = singularize(collectionName)
      const apiPath = getApiPath({ action: 'update', recordType, id })
      const messageKey = getMessageKey('deleting', recordType, id)

      message.loading({ content: `Deleting ${recordType}`, key: messageKey })

      api
        .delete(apiPath)
        .then(({ success, errors: _errors, data: _data, message: responseMessage, actions: _actions }) => {
          if (!success) {
            message.error({ content: responseMessage, key: messageKey })
            return
          }

          message.success({
            content: `${capitalize(recordType)} deleted`,
            key: messageKey
          })
          collectionActions.removeItem({ id })

          if (onSuccess) {
            onSuccess()
          }
        })
    }

    return { loadCollection, saveRecord, deleteRecord }
  }
}
