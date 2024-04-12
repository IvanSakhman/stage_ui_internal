import PropTypes from 'prop-types'

import { UserOutlined } from '@ant-design/icons'

import { array } from '~su/utilities'

import { StyledUserMenu } from './index.styled'

const UserDropdown = ({ helpdeskUrl, handleLogout }) => {
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
          label: <a onClick={handleLogout}>Logout</a>
        }
      ])
    }
  ]

  return <StyledUserMenu mode="horizontal" items={items} triggerSubMenuAction="click" />
}

UserDropdown.propTypes = {
  helpdeskUrl: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
}

export default UserDropdown
