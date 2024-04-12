import { useState, useEffect } from 'react'
import ory from './index'

// Returns a function which will log the user out
export function useLogoutFlow(callback) {
  const [logoutToken, setLogoutToken] = useState('')

  useEffect(() => {
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
  }, [])

  return () => {
    if (logoutToken) {
      ory.updateLogoutFlow({ token: logoutToken }).then(() => callback())
    }
  }
}
