import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import authenticationSdk from './index'

const useSessionStore = create((set, get) => ({
  identity: null,
  ory: null,
  translations: {},
  isLoading: true,
  isInitialized: false,

  initializeApp: async ({ config, failureCallback, authUrl, skipSessionCheck, translations }) => {
    try {
      const ory = authenticationSdk(config)
      set({ ory })

      if (translations) {
        set({ translations })
      }

      if (!skipSessionCheck && window.location.href !== authUrl) {
        const { data: sessionData } = await ory.toSession()
        set({ identity: sessionData.identity })
      }

      set({ isInitialized: true })
    } catch (err) {
      set({ identity: null, isInitialized: false })
      console.error('Session initialization failed', err)

      if (err.response?.status === 401 && failureCallback) {
        failureCallback()
      }
    } finally {
      set({ isLoading: false })
    }
  },

  handleLogout: async (logoutCallback, setIsLoading) => {
    const { ory } = get()
    if (!ory) return

    setIsLoading(true)
    try {
      const { data } = await ory.createBrowserLogoutFlow()
      await ory.updateLogoutFlow({ token: data.logout_token })
      set({ identity: null })
      logoutCallback()
    } catch (error) {
      console.error('Logout failed: ', error)

      if (error.response?.status === 401) {
        set({ identity: null })
        logoutCallback()
      }
    } finally {
      setIsLoading(false)
    }
  }
}))

export const useSessionIdentity = () => useSessionStore(useShallow(({ identity }) => identity))
export const useSessionSdk = () => useSessionStore(useShallow(({ ory }) => ory))
export const useTranslations = () => useSessionStore(useShallow(({ translations }) => translations))
export const useSessionStatus = () =>
  useSessionStore(useShallow(({ isLoading, isInitialized }) => ({ isLoading, isInitialized })))
export const useSessionActions = () =>
  useSessionStore(useShallow(({ initializeApp, handleLogout }) => ({ initializeApp, handleLogout })))

export default { useSessionIdentity, useSessionSdk, useTranslations, useSessionStatus, useSessionActions }
