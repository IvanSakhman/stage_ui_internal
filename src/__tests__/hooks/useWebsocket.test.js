import initializeWebsocketHooks from '~su/hooks/useWebsocket'

jest.mock('~su/hooks/usePusher', () => {
  const mockPusherHooks = {
    usePusherConnection: jest.fn(),
    usePusherCreateItem: jest.fn(),
    usePusherEditItem: jest.fn(),
    usePusherNotify: jest.fn()
  }

  return jest.fn().mockResolvedValue(mockPusherHooks)
})

import initializePusherHooks from '~su/hooks/usePusher'

import { websocketClient } from '~su/clients'
import { triggerGlobalAlert, removeGlobalAlert, setUIStoreProperty } from '~su/store/actions'

describe('Websocket hooks', () => {
  it('initializes Pusher Hooks', () => {
    initializeWebsocketHooks()

    expect(initializePusherHooks).toBeCalledWith({
      triggerGlobalAlert, removeGlobalAlert, setUIStoreProperty, websocketClient
    })
  })

  it('returns initialized pusher hooks', () => {
    const mockPusherHooks = initializePusherHooks()

    expect(initializeWebsocketHooks()).toEqual({
      useWebsocketConnection: mockPusherHooks.usePusherConnection,
      useWebsocketCreateItem: mockPusherHooks.usePusherCreateItem,
      useWebsocketEditItem: mockPusherHooks.usePusherEditItem,
      useWebsocketNotify: mockPusherHooks.usePusherNotify,
    })
  })
})
