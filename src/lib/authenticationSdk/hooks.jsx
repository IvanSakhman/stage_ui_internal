import { useState, useEffect } from 'react'
import store from '~su/store'
import authSdk from './index'

export default (oryConfig) => {
  const ory = authSdk(oryConfig)

  if (!ory) {
    return { useLogoutFlow: () => null, useSessionFlow: () => null }
  }

  const useLogoutFlow = (callback) => {
    const [logoutToken, setLogoutToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const setIdentity = store.useSessionStore((state) => state.setIdentity)

    useEffect(() => {
      ory
        .createBrowserLogoutFlow()
        .then(({ data }) => {
          setLogoutToken(data.logout_token)
        })
        .catch((err) => {
          switch (err.response?.status) {
            case 401:
              return
          }

          return Promise.reject(err)
        })
    }, [])

    const handleLogout = async () => {
      setIsLoading(true)
      await ory
        .updateLogoutFlow({ token: logoutToken })
        .then(() => {
          setIdentity(null)
          setIsLoading(false)
          callback()
        })
        .catch(() => {
          setIsLoading(false)
        })
    }

    return { isLoading, ...(logoutToken ? { handleLogout } : {}) }
  }

  const useSessionFlow = (callback, authUrl) => {
    const [isInitialized, setIsInitialized] = useState(false)

    const identity = store.useSessionStore((state) => state.identity)
    const setIdentity = store.useSessionStore((state) => state.setIdentity)

    useEffect(() => {
      if (window.location.href !== authUrl) {
        ory
          .toSession()
          .then(({ data }) => {
            if (!identity) {
              setIdentity(data.identity)
            }
            setIsInitialized(true)
          })
          .catch((err) => {
            if (err.response?.status === 401) {
              callback()
              return
            }

            setIdentity(null)
            setIsInitialized(true)

            return Promise.reject(err)
          })
      } else {
        setIsInitialized(true)
      }
    }, [callback, identity, setIdentity])

    return isInitialized
  }

  return {
    useLogoutFlow: useLogoutFlow,
    useSessionFlow: useSessionFlow
  }
}
