import { useState, useEffect } from 'react'
import store from '~su/store'
import ory from './index'

// Returns a function which will log the user out
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
              // do nothing, the user is not logged in
              return
          }

          // Something else happened!
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

// Returns a boolean indicating whether the session was verified
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
            // User is not logged in, redirect to the login page
            callback()
            return
          }

          setIdentity(null)
          setIsLoaded(true)

          // Something else happened!
          return Promise.reject(err)
        })
    } else {
      setIsLoaded(true)
    }
  }, [callback, redirects, identity, setIdentity])

  return isLoaded
}
