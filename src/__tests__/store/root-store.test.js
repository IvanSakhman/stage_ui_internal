import * as store from '~su/store/root-store'

import { renderHook, act } from '@testing-library/react'

describe('Root Store', () => {
  describe('useConfigStore', () => {
    it('has defaults', () => {
      expect(store.useConfigStore.getState()).toEqual({
        layout: {},
        api: {
          baseUrl: null,
          config_path: null
        },
        branding: {
          token: {}
        },
        app: {
          pro: null
        },
        update: expect.any(Function)
      })
    })

    describe('update', () => {
      it('updates the config store w/o removing defaults', () => {
        const { result: configStore } = renderHook(() => store.useConfigStore())

        act(() => {
          configStore.current.update({
            layout: {
              test: true
            },
            api: {
              baseUrl: 'test.xyz',
              load_resource_path: '/resource/:id'
            },
            branding: {},
            app: {
              demo: false
            }
          })
        })

        expect(configStore.current).toEqual({
          layout: {
            test: true
          },
          api: {
            baseUrl: 'test.xyz',
            config_path: null,
            load_resource_path: '/resource/:id'
          },
          branding: {
            token: {}
          },
          app: {
            pro: null,
            demo: false
          },
          update: expect.any(Function)
        })
      })
    })
  })

  describe('useUIStore', () => {
    it('has defaults', () => {
      expect(store.useUIStore.getState()).toEqual({
        modal: {
          isOpen: false,
          content: null,
          title: '',
          width: null
        },
        isWebsocketAvailable: false,
        globalAlerts: []
      })
    })
  })

  describe('useLayoutConfig', () => {
    it('returns current config value', () => {
      const { result: layout } = renderHook(() => store.useLayoutConfig())

      expect(layout.current).toEqual(store.useConfigStore.getState().layout)
    })
  })

  describe('useBranding', () => {
    it('returns current config value', () => {
      const { result: branding } = renderHook(() => store.useBranding())

      expect(branding.current).toEqual(store.useConfigStore.getState().branding)
    })
  })

  describe('useAppConfig', () => {
    it('returns current config value', () => {
      const { result: app } = renderHook(() => store.useAppConfig())

      expect(app.current).toEqual(store.useConfigStore.getState().app)
    })
  })

  describe('usePro', () => {
    const initialConfigStoreState = store.useConfigStore.getState()

    beforeEach(() => {
      store.useConfigStore.setState(initialConfigStoreState, true)
    })

    describe('when pro value is a boolean', () => {
      it('returns an object with enabled flag, copy and colors for the styling', () => {
        store.useConfigStore.getState().update({ app: { pro: false } })

        const { result: proConfig } = renderHook(() => store.usePro())

        expect(proConfig.current).toEqual({ enabled: false, copy: 'pro', color: '#36cfc9' })
      })
    })

    describe('when pro is an object', () => {
      it('returns it w/o modifying', () => {
        store.useConfigStore.getState().update({
          app: { pro: { enabled: true, copy: 'test', color: 'fancygray' } }
        })

        const { result: proConfig } = renderHook(() => store.usePro())

        expect(proConfig.current).toEqual(store.useConfigStore.getState().app.pro)
      })
    })

    describe('when pro is null', () => {
      it('returns it w/o modifying', () => {
        const { result: proConfig } = renderHook(() => store.usePro())

        expect(proConfig.current).toEqual(null)
      })
    })
  })

  describe('useRootModal', () => {
    it('returns current modal value', () => {
      const { result: modal } = renderHook(() => store.useRootModal())

      expect(modal.current).toEqual(store.useUIStore.getState().modal)
    })
  })

  describe('useGlobalAlerts', () => {
    it('returns current globalAlerts value', () => {
      const { result: globalAlerts } = renderHook(() => store.useGlobalAlerts())

      expect(globalAlerts.current).toEqual(store.useUIStore.getState().globalAlerts)
    })
  })

  describe('useIsWebsocketAvailable', () => {
    it('returns current isWebsocketAvailable value', () => {
      const { result: isWebsocketAvailable } = renderHook(() => store.useIsWebsocketAvailable())

      expect(isWebsocketAvailable.current).toEqual(store.useUIStore.getState().isWebsocketAvailable)
    })
  })

  describe('getApiConfig', () => {
    it('returns configStore.api', () => {
      expect(store.getApiConfig()).toEqual(store.useConfigStore.getState().api)
    })
  })
})
