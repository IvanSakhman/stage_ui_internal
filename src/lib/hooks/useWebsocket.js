import { triggerGlobalAlert, removeGlobalAlert, setUIStoreProperty } from '~su/store/actions'

import { websocketClient } from '~su/clients'

import initializePusherHooks from './usePusher'

export default () => {
  const { usePusherConnection, usePusherCreateItem, usePusherEditItem, usePusherNotify } = initializePusherHooks({
    triggerGlobalAlert,
    removeGlobalAlert,
    setUIStoreProperty,
    websocketClient
  })

  return {
    useWebsocketConnection: usePusherConnection,
    useWebsocketCreateItem: usePusherCreateItem,
    useWebsocketEditItem: usePusherEditItem,
    useWebsocketNotify: usePusherNotify
  }
}
