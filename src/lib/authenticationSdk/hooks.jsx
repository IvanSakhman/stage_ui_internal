import { useState, useEffect } from 'react'
import store from '~su/store'
import ory from './index'

export function useLogoutFlow(callback) {
  const [logoutToken, setLogoutToken] = useState(null)

  const identity = store.useSessionStore((state) => state.identity)
  const setIdentity = store.useSessionStore((state) => state.setIdentity)

  useEffect(() => {
    if (identity) {
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
    }
  }, [identity])

  return () => {
    if (logoutToken) {
      ory.updateLogoutFlow({ token: logoutToken }).then(() => {
        setIdentity(null)
        callback()
      })
    }
  }
}

export function useSessionFlow(callback, redirects) {
  const [isLoaded, setIsLoaded] = useState(false)

  const identity = store.useSessionStore((state) => state.identity)
  const setIdentity = store.useSessionStore((state) => state.setIdentity)

  useEffect(() => {
    if (redirects && window.location.pathname !== redirects.login) {
      ory
        .toSession()
        .then(({ data }) => {
          if (!identity) {
            setIdentity(data.identity)
          }
          setIsLoaded(true)
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            callback()
            return
          }

          setIdentity(null)
          setIsLoaded(true)

          return Promise.reject(err)
        })
    } else {
      setIsLoaded(true)
    }
  }, [callback, redirects, identity, setIdentity])

  return isLoaded
}
