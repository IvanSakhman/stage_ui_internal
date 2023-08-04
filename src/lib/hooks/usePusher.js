/*eslint react-hooks/exhaustive-deps: "off"*/
import { useEffect, useState } from 'react'

import { string, pusher } from '~su/utilities'

export default ({ triggerGlobalAlert, removeGlobalAlert, setUIStoreProperty, websocketClient }) => ({
  usePusherConnection: () => {
    const pusherclient = websocketClient ? websocketClient() : pusher()

    useEffect(() => {
      if (pusherclient) {
        const handleManualReconnect = () => {
          pusherclient.connection.isManualReconnectTriggered = true
          pusherclient.connection.retryIn(0)
        }

        const reconnectWithPusher = <a onClick={handleManualReconnect}>Reconnect</a>

        const STATE_ALERTS = {
          connecting: { type: 'warning', action: null },
          connected: { type: 'success', action: null },
          failed: {
            type: 'error',
            action: reconnectWithPusher
          },
          unavailable: {
            type: 'error',
            action: reconnectWithPusher
          }
        }

        pusherclient.connection.bind('state_change', ({ previous: _previousState, current: currentState }) => {
          const isWebsocketAvailable = ['connected', 'connecting'].includes(currentState)

          if (!pusherclient.connection.isManualReconnectTriggered && isWebsocketAvailable) {
            removeGlobalAlert({ id: 'pusher' })
          } else {
            triggerGlobalAlert(
              {
                id: 'pusher',
                message: string.translate('websocket_global_alerts', currentState),
                ...STATE_ALERTS[currentState]
              },
              true
            )

            if (pusherclient.connection.isManualReconnectTriggered && currentState === 'connected') {
              setTimeout(() => {
                removeGlobalAlert({ id: 'pusher' })
                pusherclient.connection.isManualReconnectTriggered = false
              }, 5000)
            }
          }

          setUIStoreProperty('isWebsocketAvailable', isWebsocketAvailable)
        })

        return () => {
          pusherclient.unbind_all()
        }
      }
    }, [pusherclient])

    return pusherclient?.connection
  },
  usePusherCreateItem: (initialCollection, channelName, rootId = null) => {
    const [collection, setCollection] = useState([])
    const pusherclient = websocketClient ? websocketClient() : pusher()

    useEffect(() => {
      setCollection(initialCollection)
    }, [initialCollection])

    useEffect(() => {
      if (pusherclient) {
        const channel = pusherclient.subscribe(channelName)

        channel.bind('create', (itemData) => {
          if (rootId) {
            if (parseInt(itemData[rootId.prop_name]) !== parseInt(rootId.value)) {
              return
            }
          }

          setCollection((items) => (items.some(({ id }) => id === itemData.id) ? items : [itemData, ...items]))
        })

        return () => {
          channel.unbind('create')
          pusherclient.unsubscribe(channelName)
        }
      }
    }, [])

    return collection
  },
  usePusherEditItem: (initial, channelName, event = 'edit') => {
    const [item, setItem] = useState(null)
    const pusherclient = websocketClient ? websocketClient() : pusher()

    useEffect(() => {
      setItem(initial)
    }, [initial])

    useEffect(() => {
      if (pusherclient) {
        const channel = pusherclient.subscribe(channelName)

        channel.bind(event, (itemData) => {
          setItem((item) => {
            if (item.id == itemData.id) {
              return { ...item, ...itemData }
            }

            return item
          })
        })

        return () => {
          channel.unbind(event)
          pusherclient.unsubscribe(channelName)
        }
      }
    }, [])

    return item
  },
  usePusherNotify: (initial, channelName, screenRootId = null) => {
    const [item, setItem] = useState(initial)
    const pusherclient = websocketClient ? websocketClient() : pusher()

    useEffect(() => {
      if (pusherclient) {
        const channel = pusherclient.subscribe(channelName)

        channel.bind('notify', (itemData) => {
          if (screenRootId) {
            if (parseInt(itemData[screenRootId.prop_name]) !== parseInt(screenRootId.value)) {
              return
            }
          }

          setItem(itemData)
        })

        return () => {
          channel.unbind('notify')
          pusherclient.unsubscribe(channelName)
        }
      }
    }, [])

    return item
  }
})
