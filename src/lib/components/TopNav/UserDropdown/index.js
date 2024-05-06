import PropTypes from 'prop-types'

import { UserOutlined } from '@ant-design/icons'

import { array } from '~su/utilities'

import { StyledUserMenu } from './index.styled'

const UserDropdown = ({ hostedZone, handleLogout, helpdeskUrl }) => {
  const items = [
    {
      key: 'trigger',
      label: <UserOutlined />,
      children: array.compact([
        helpdeskUrl
          ? {
              key: 'helpdesk',
              label: <a href={helpdeskUrl}>Helpdesk</a>
            }
          : null,
        {
          key: 'logout',
          label: (
            <a
              {...(handleLogout ? { onClick: handleLogout } : { href: `https://authentication.${hostedZone}/logout` })}
            >
              Logout
            </a>
          )
        }
      ])
    }
  ]

  return <StyledUserMenu mode="horizontal" items={items} triggerSubMenuAction="click" />
}

UserDropdown.propTypes = {
  hostedZone: PropTypes.string.isRequired,
  handleLogout: PropTypes.func,
  helpdeskUrl: PropTypes.string
}

export default UserDropdown
