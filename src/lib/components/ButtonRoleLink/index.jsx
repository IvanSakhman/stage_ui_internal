import PropTypes from 'prop-types'
import { baseRoute } from '~su/utilities'

const ButtonRoleLink = ({ children, isButtonRole = true, url }) => {
  const { navigate } = baseRoute()

  return (
    <a
      onClick={isButtonRole ? (e) => navigate(url, e) : undefined}
      href={isButtonRole ? undefined : url}
      role={isButtonRole ? 'button' : undefined}
    >
      {children}
    </a>
  )
}

ButtonRoleLink.propTypes = {
  children: PropTypes.node.isRequired,
  isButtonRole: PropTypes.bool,
  url: PropTypes.string.isRequired
}

export default ButtonRoleLink
