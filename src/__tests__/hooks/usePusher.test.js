import initializePusherHooks from '~su/hooks/usePusher'
import { renderHook, act } from '@testing-library/react'

import { PusherMock } from 'pusher-js-mock'

import { pusher, string } from '~su/utilities'

const { translate } = string

const uiStoreActions = {
  removeGlobalAlert: jest.fn(),
  triggerGlobalAlert: jest.fn(),
  setUIStoreProperty: jest.fn()
}

describe('Pusher hooks', () => {
  describe('usePusherCreateItem', () => {
    const collection = [
      {
        state: 'submitted',
        id: 2
      },
      {
        state: 'submitted',
        id: 1
      }
    ]
    const channelName = 'my-test-in-hook-usePusherCreateItem'
    const channel = pusher(new PusherMock()).subscribe(channelName)

    it('updates the collection with item received via pusher', () => {
      const { result } = renderHook(() => initializePusherHooks(uiStoreActions).usePusherCreateItem(collection, channelName))

      expect(result.current).toEqual(collection)

      act(() => {
        channel.emit('create', { id: 3, state: 'running' })
      })

      expect(result.current).toEqual([{ id: 3, state: 'running' }, ...collection])
    })

    it('ignores item received via pusher if collection already contains item with same id', () => {
      const { result } = renderHook(() => initializePusherHooks(uiStoreActions).usePusherCreateItem(collection, channelName))

      expect(result.current).toEqual(collection)

      act(() => {
        channel.emit('create', { id: 2, state: 'running' })
      })

      expect(result.current).toEqual([...collection])
    })

    describe('with rootId', () => {
      const { result } = renderHook(() =>
        initializePusherHooks(uiStoreActions).usePusherCreateItem(collection, channelName, { prop_name: 'root_id', value: '1' })
      )

      expect(result.current).toEqual(collection)

      act(() => {
        channel.emit('create', { id: 3, state: 'running', root_id: 1 })
      })

      expect(result.current).toEqual([{ id: 3, state: 'running', root_id: 1 }, ...collection])

      act(() => {
        channel.emit('create', { id: 4, state: 'running', root_id: 2 })
      })

      expect(result.current).toEqual([{ id: 3, state: 'running', root_id: 1 }, ...collection])
    })
  })

  describe('usePusherEditItem', () => {
    const item = {
      state: 'submitted',
      nonupdated: 'this should be the same',
      id: 1
    }

    const channelName = 'my-test-in-hook-usePusherEditItem'
    const pusher = () => new PusherMock()
    const channel = pusher().subscribe(channelName)

    it('updates the item with data received via pusher', () => {
      const { result } = renderHook(() => initializePusherHooks(uiStoreActions).usePusherEditItem(item, channelName))

      expect(result.current).toEqual(item)

      act(() => {
        channel.emit('edit', { id: 1, state: 'running' })
      })

      expect(result.current).toEqual({
        state: 'running',
        nonupdated: 'this should be the same',
        id: 1
      })

      act(() => {
        channel.emit('edit', { id: 2, state: 'failed' })
      })

      expect(result.current).toEqual({
        state: 'running',
        nonupdated: 'this should be the same',
        id: 1
      })
    })
  })

  describe('usePusherNotify', () => {
    const screenRootId = {
      prop_name: 'id',
      value: 1
    }

    const channelName = 'my-test-in-hook-usePusherNotify'
    const pusher = () => new PusherMock()
    const channel = pusher().subscribe(channelName)
    const initial = { description: 'This is my test description.' }

    it('updates the item matching screenRootId with data received via pusher', () => {
      const { result } = renderHook(() => initializePusherHooks(uiStoreActions).usePusherNotify(initial, channelName, screenRootId))

      expect(result.current).toEqual(initial)

      act(() => {
        channel.emit('notify', { id: 1, description: 'It really is my test description!' })
      })

      expect(result.current).toEqual({
        id: 1,
        description: 'It really is my test description!'
      })

      act(() => {
        channel.emit('notify', { id: 2, description: 'Another test description' })
      })

      expect(result.current).toEqual({
        description: 'It really is my test description!',
        id: 1
      })
    })
  })

  describe('usePusherConnection', () => {
    const pusher = () => new PusherMock()
    const connection = pusher().connection

    it('removes pusher global alerts and does not trigger alert on state changes if connection was automatically restoring', () => {
      renderHook(() => initializePusherHooks(uiStoreActions).usePusherConnection())

      expect(uiStoreActions.removeGlobalAlert).toBeCalledTimes(0)
      expect(uiStoreActions.triggerGlobalAlert).toBeCalledTimes(0)

      act(() => {
        connection.emit('state_change', { previous: 'failed', current: 'connecting' })
      })

      expect(uiStoreActions.removeGlobalAlert).toBeCalledWith({ id: 'pusher' })
      expect(uiStoreActions.removeGlobalAlert).toBeCalledTimes(1)
      expect(uiStoreActions.triggerGlobalAlert).toBeCalledTimes(0)
    })

    it('does not trigger and alert if state was changed to "connected" without manual reconnect being triggered', () => {
      renderHook(() => initializePusherHooks(uiStoreActions).usePusherConnection())

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledTimes(0)

      act(() => {
        connection.emit('state_change', { previous: 'connecting', current: 'connected' })
      })

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledTimes(0)
    })

    it('triggers global alerts if manual reconnect have been triggered for any state', () => {
      connection.isManualReconnectTriggered = true
      renderHook(() => initializePusherHooks(uiStoreActions).usePusherConnection())

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledTimes(0)

      act(() => {
        connection.emit('state_change', { previous: 'failed', current: 'connecting' })
      })

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledWith(
        {
          id: 'pusher',
          message: translate('websocket_global_alerts', 'connecting'),
          type: 'warning',
          action: null
        },
        true
      )

      act(() => {
        connection.emit('state_change', { previous: 'connecting', current: 'connected' })
      })

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledWith(
        {
          id: 'pusher',
          message: translate('websocket_global_alerts', 'connected'),
          type: 'success',
          action: null
        },
        true
      )

      act(() => {
        connection.emit('state_change', { previous: 'connected', current: 'failed' })
      })

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledWith(
        {
          id: 'pusher',
          message: translate('websocket_global_alerts', 'failed'),
          type: 'error',
          action: <a onClick={expect.any(Function)}>Reconnect</a>
        },
        true
      )

      act(() => {
        connection.emit('state_change', { previous: 'connected', current: 'unavailable' })
      })

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledWith(
        {
          id: 'pusher',
          message: translate('websocket_global_alerts', 'unavailable'),
          type: 'error',
          action: <a onClick={expect.any(Function)}>Reconnect</a>
        },
        true
      )
    })

    it('triggers global alerts on state changes to "failed" or "unavailable" despite manual reconnect have been triggered', () => {
      connection.isManualReconnectTriggered = true
      renderHook(() => initializePusherHooks(uiStoreActions).usePusherConnection())

      act(() => {
        connection.emit('state_change', { previous: 'connected', current: 'failed' })
      })

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledWith(
        {
          id: 'pusher',
          message: translate('websocket_global_alerts', 'failed'),
          type: 'error',
          action: <a onClick={expect.any(Function)}>Reconnect</a>
        },
        true
      )

      act(() => {
        connection.emit('state_change', { previous: 'connected', current: 'unavailable' })
      })

      expect(uiStoreActions.triggerGlobalAlert).toBeCalledWith(
        {
          id: 'pusher',
          message: translate('websocket_global_alerts', 'unavailable'),
          type: 'error',
          action: <a onClick={expect.any(Function)}>Reconnect</a>
        },
        true
      )
    })

    it('automatically removes "connected" alert in 5 seconds after it have been triggered and updates manual reconnect flag', () => {
      jest.useFakeTimers()
      connection.isManualReconnectTriggered = true
      jest.spyOn(global, 'setTimeout')
      renderHook(() => initializePusherHooks(uiStoreActions).usePusherConnection())

      act(() => {
        connection.emit('state_change', { previous: 'connecting', current: 'connected' })
      })

      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)

      jest.runOnlyPendingTimers()

      expect(uiStoreActions.removeGlobalAlert).toBeCalledWith({
        id: 'pusher'
      })
    })

    it('updates uiStore with websocket availability flag', () => {
      renderHook(() => initializePusherHooks(uiStoreActions).usePusherConnection())

      act(() => {
        connection.emit('state_change', { previous: 'connecting', current: 'connected' })
      })

      expect(uiStoreActions.setUIStoreProperty).toBeCalledWith('isWebsocketAvailable', true)

      act(() => {
        connection.emit('state_change', { previous: 'connected', current: 'failed' })
      })

      expect(uiStoreActions.setUIStoreProperty).toBeCalledWith('isWebsocketAvailable', false)
    })
  })
})
