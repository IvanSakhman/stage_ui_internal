import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'

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

export const useLayoutConfig = () => useConfigStore(useShallow(({ layout }) => layout))
export const useBranding = () => useConfigStore(useShallow(({ branding }) => branding))
export const useAppConfig = () => useConfigStore(useShallow(({ app }) => app))
export const usePro = () =>
  useConfigStore(
    useShallow(({ app: { pro } }) => (typeof pro === 'boolean' ? { enabled: pro, copy: 'pro', color: '#36cfc9' } : pro))
  )

export const useRootModal = () => useUIStore(useShallow(({ modal }) => modal))

export const useIsWebsocketAvailable = () => useUIStore(useShallow(({ isWebsocketAvailable }) => isWebsocketAvailable))

export const useGlobalAlerts = () => useUIStore(useShallow(({ globalAlerts }) => globalAlerts))

export const getApiConfig = () => useConfigStore.getState().api

export const useTranslationsStore = create((set) => ({
  translations: {},
  setTranslations: (translations) => set({ translations })
}))
export const useTranslations = () => useTranslationsStore(useShallow(({ translations }) => translations))
