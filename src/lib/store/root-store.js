import { create } from 'zustand'
import { shallow } from 'zustand/shallow'

import createClass from '~su/utilities/createClass'

const Modal = createClass({
  isOpen: false,
  content: null,
  title: '',
  width: null
})

export const useConfigStore = create((set) => ({
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
  update: (loadedConfig, baseUrl) =>
    set((state) => {
      const { layout, api, branding, app } = loadedConfig

      return {
        layout: { ...state.layout, ...layout },
        api: { ...state.api, baseUrl, ...api },
        branding: { ...state.branding, ...branding },
        app: { ...state.app, ...app }
      }
    })
}))

export const useUIStore = create((_set) => ({
  modal: new Modal({}),
  isWebsocketAvailable: false,
  globalAlerts: []
}))

export const useSessionStore = create((set) => ({
  identity: null,
  setIdentity: (identity) => set({ identity })
}))

export const useIdentity = () => useSessionStore(({ identity }) => identity)

export const useLayoutConfig = () => useConfigStore(({ layout }) => layout)
export const useBranding = () => useConfigStore(({ branding }) => branding)
export const useAppConfig = () => useConfigStore(({ app }) => app)
export const usePro = () => {
  return useConfigStore(({ app }) => {
    const { pro } = app

    return typeof pro === 'boolean' ? { enabled: pro, copy: 'pro', color: '#36cfc9' } : pro
  })
}

export const useRootModal = () => useUIStore(({ modal }) => modal)

export const useIsWebsocketAvailable = () => useUIStore(({ isWebsocketAvailable }) => isWebsocketAvailable)

export const useGlobalAlerts = () => {
  return useUIStore(({ globalAlerts }) => {
    return globalAlerts
  }, shallow)
}

export const getApiConfig = () => useConfigStore.getState().api
