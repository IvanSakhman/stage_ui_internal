import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { sessionStore } from '~su/authenticationSdk'
import { LoadingBlock } from '~su/components'

const withAppInit = (Component) => {
  const ComponentWithAppInit = (props) => {
    const { useSessionActions, useSessionStatus } = sessionStore
    const { initializeApp } = useSessionActions()
    const { isInitialized } = useSessionStatus()

    useEffect(() => {
      if (props.initConfig) {
        const initialize = async () => {
          await initializeApp(props.initConfig)
        }
        initialize()
      }
    }, [props.initConfig, initializeApp])

    return props.initConfig && !isInitialized ? <LoadingBlock brandedFullscreen /> : <Component {...props} />
  }

  ComponentWithAppInit.propTypes = {
    initConfig: PropTypes.shape({
      config: PropTypes.object.isRequired,
      authUrl: PropTypes.string.isRequired,
      failureCallback: PropTypes.func,
      skipSessionCheck: PropTypes.bool,
      translations: PropTypes.object
    })
  }

  return ComponentWithAppInit
}

export default withAppInit
