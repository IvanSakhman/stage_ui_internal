import { useConfigStore, useUIStore } from './root-store'
import { storeActions } from '~su/actions'

import { websocketClient } from '~su/clients'

export const init = (configuration, baseUrl, messageApi) => {
  try {
    const { websocketClientConfig, ...config } = configuration

    if (websocketClientConfig) {
      websocketClient(websocketClientConfig)
    }

    useConfigStore.getState().update(config, baseUrl)
  } catch (error) {
    console.error(error)
    messageApi.error('Error initializing application')
  }
}

export const showModal = (params) => {
  const modal = {
    isOpen: true,
    ...params
  }

  useUIStore.setState({ modal })
}

export const hideModal = () => {
  const modal = {
    isOpen: false
  }

  useUIStore.setState({ modal })
}

export const { setField: setUIStoreProperty } = storeActions(useUIStore, '')

const { setItem: setGlobalAlert, removeItem: removeAlert } = storeActions(useUIStore, 'globalAlert')

export const removeGlobalAlert = (alertConfig) => removeAlert(alertConfig)

export const triggerGlobalAlert = (alertConfig, overwrite = false) => {
  const { globalAlerts: globalAlertsInStore } = useUIStore.getState()

  const areThereAlertsInStore = globalAlertsInStore.length > 0

  return setGlobalAlert(alertConfig, !overwrite || !areThereAlertsInStore, false)
}
