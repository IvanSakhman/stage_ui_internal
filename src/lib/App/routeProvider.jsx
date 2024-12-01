import { useEffect } from 'react'
import PropTypes from 'prop-types'

// utilities
import { baseRoute as setBaseRoute } from '~su/utilities'

const RouteProvider = ({ children, initialConfig }) => {
  useEffect(() => {
    setBaseRoute(initialConfig.api.baseRoute)
  }, [initialConfig])

  return <>{children}</>
}

RouteProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialConfig: PropTypes.shape({
    api: PropTypes.shape({
      baseRoute: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
}

export default RouteProvider
