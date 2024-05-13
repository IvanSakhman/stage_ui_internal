import { useState, useEffect } from 'react'
import store from '~su/store'
import ory from './index'

export function useLogoutFlow(callback) {
  const [logoutToken, setLogoutToken] = useState(null)

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

  return logoutToken
    ? () => {
        ory.updateLogoutFlow({ token: logoutToken }).then(() => {
          setIdentity(null)
          callback()
        })
      }
    : null
}

export function useSessionFlow(callback) {
  const [isInitialized, setIsInitialized] = useState(false)

  const identity = store.useSessionStore((state) => state.identity)
  const setIdentity = store.useSessionStore((state) => state.setIdentity)

  useEffect(() => {
    if (window.location.href !== 'https://accounts.assemblyglobal.dev/auth') {
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
