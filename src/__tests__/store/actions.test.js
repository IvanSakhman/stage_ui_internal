import { useConfigStore, useUIStore } from '~su/store/root-store'
import * as actions from '~su/store/actions'

const message = {
  open: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  loading: jest.fn()
}

jest.mock('~su/clients/websocketClient', () => jest.fn())

import websocketClient from '~su/clients/websocketClient'

describe('Root Actions', () => {
  describe('init', () => {
    it('updates configStore with config and baseUrl', async () => {
      expect(useConfigStore.getState()).toMatchObject({
        layout: {},
        api: {
          baseUrl: null
        }
      })

      await actions.init({ layout: {} }, 'baseUrl', message)

      expect(useConfigStore.getState()).toMatchObject({
        layout: {},
        api: {
          baseUrl: 'baseUrl'
        }
      })
    })

    describe('with websocketClientConfig', () => {
      const mockWebsocketClientConfig = {
        appKey: 123
      }

      it('calls websocketClient', async () => {
        await actions.init({ websocketClientConfig: mockWebsocketClientConfig }, null, message)

        expect(websocketClient).toBeCalledWith(mockWebsocketClientConfig)
      })
    })

    describe('when errored', () => {
      beforeEach(() => {
        console.error = jest.fn()
        message.error = jest.fn()
      })

      it('shows a message', () => {
        actions.init(null, null, message)

        expect(console.error).toBeCalled()
        expect(message.error).toBeCalledWith('Error initializing application')
      })
    })
  })

  describe('showModal', () => {
    const initialStoreState = useUIStore.getState()

    beforeEach(() => useUIStore.setState(initialStoreState, true))

    it('marks the modal as open with params', () => {
      expect(useUIStore.getState().modal).toEqual({
        isOpen: false,
        content: null,
        title: '',
        width: null
      })

      actions.showModal({
        content: 'test',
        title: 'Test',
        width: 200
      })

      expect(useUIStore.getState().modal).toEqual({
        isOpen: true,
        content: 'test',
        title: 'Test',
        width: 200
      })
    })
  })

  describe('hideModal', () => {
    const initialStoreState = useUIStore.getState()

    beforeEach(() => useUIStore.setState(initialStoreState, true))

    it('marks the modal as not open and resets its params', () => {
      expect(useUIStore.getState().modal).toEqual({
        isOpen: false,
        content: null,
        title: '',
        width: null
      })

      actions.hideModal()

      expect(useUIStore.getState().modal).toEqual({
        isOpen: false
      })
    })
  })

  describe('setUIStoreProperty', () => {
    const initialStoreState = useUIStore.getState()

    beforeEach(() => useUIStore.setState(initialStoreState, true))

    it('is able to set a property on the uiStore', () => {
      expect(useUIStore.getState().isWebsocketAvailable).toEqual(false)

      actions.setUIStoreProperty('isWebsocketAvailable', true)

      expect(useUIStore.getState().isWebsocketAvailable).toEqual(true)
    })
  })

  describe('triggerGlobalAlert', () => {
    const initialStoreState = useUIStore.getState()

    beforeEach(() => useUIStore.setState(initialStoreState, true))

    describe('with overwrite', () => {
      describe('when there are any globalAlerts', () => {
        beforeEach(() => {
          useUIStore.setState({ ...initialStoreState, globalAlerts: [{ id: 'test', message: 'TEST' }] }, true)
        })

        it('updates the globalAlert by id', () => {
          expect(useUIStore.getState().globalAlerts).toEqual([{ id: 'test', message: 'TEST' }])

          actions.triggerGlobalAlert({ id: 'test', message: 'TEST_2' }, true)

          expect(useUIStore.getState().globalAlerts).toEqual([{ id: 'test', message: 'TEST_2' }])
        })
      })

      describe('when there are no globalAlerts', () => {
        it('adds the globalAlert to the store collection', () => {
          expect(useUIStore.getState().globalAlerts).toEqual([])

          actions.triggerGlobalAlert({ id: 'test', message: 'TEST' }, true)

          expect(useUIStore.getState().globalAlerts).toEqual([{ id: 'test', message: 'TEST' }])
        })
      })
    })

    describe('without overwrite', () => {
      describe('when there is a globalAlert with given id', () => {
        beforeEach(() => {
          useUIStore.setState({ ...initialStoreState, globalAlerts: [{ id: 'test', message: 'TEST' }] }, true)
        })

        it('appends the globalAlert to the store collection', () => {
          expect(useUIStore.getState().globalAlerts).toEqual([{ id: 'test', message: 'TEST' }])

          actions.triggerGlobalAlert({ id: 'test', message: 'TEST 2' })

          expect(useUIStore.getState().globalAlerts).toEqual([
            { id: 'test', message: 'TEST' },
            { id: 'test', message: 'TEST 2' }
          ])
        })
      })

      describe('when there is not globalAlert with given id', () => {
        it('appends the globalAlert to the store collection', () => {
          expect(useUIStore.getState().globalAlerts).toEqual([])

          actions.triggerGlobalAlert({ id: 'test', message: 'TEST' })

          expect(useUIStore.getState().globalAlerts).toEqual([{ id: 'test', message: 'TEST' }])
        })
      })
    })
  })
})
