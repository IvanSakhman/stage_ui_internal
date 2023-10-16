import PropTypes from 'prop-types'
import { Menu } from 'antd'

import { useLocation } from '~su/hooks'

import DynamicIcon from '../../DynamicIcon'

import { SideMenuContainer, StyledLink } from './index.styled'
import getDefaultMenuKeys from './utilities/getDefaultMenuKeys'

const SideMenu = ({ sidebarItems, onSideMenuSelect, pathname = '' }) => {
  const location = useLocation()

  const defaultMenuKeys = getDefaultMenuKeys(location, sidebarItems, pathname)
  const handleMenuItemClick = (e, key) => {
    e.preventDefault()
    e.stopPropagation()

    onSideMenuSelect({ key })
  }

  const transformItems = (items, parentKey = '') =>
    items.map((item) => {
      const key = `${parentKey}${item.key}`
      return {
        ...item,
        key,
        label: (
          <StyledLink
            $isSelected={key === defaultMenuKeys?.defaultSelectedKey}
            onClick={(e) => handleMenuItemClick(e, item.key)}
          >
            {item.label}
          </StyledLink>
        ),
        icon: <DynamicIcon name={item.icon} />,
        ...(item.children ? { children: transformItems(item.children, key) } : {})
      }
    })

  const sidebarMenuItems = transformItems(sidebarItems)

  return (
    <SideMenuContainer>
      <Menu
        defaultOpenKeys={defaultMenuKeys?.defaultOpenKeys}
        defaultSelectedKeys={[defaultMenuKeys?.defaultSelectedKey]}
        theme="dark"
        mode="inline"
        items={sidebarMenuItems}
        onSelect={onSideMenuSelect}
      />
    </SideMenuContainer>
  )
}

function recursiveSidebarItems(...args) {
  const sidebarItemType = PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: recursiveSidebarItems
  })
  return PropTypes.oneOfType([PropTypes.arrayOf(sidebarItemType), sidebarItemType])(...args)
}

SideMenu.propTypes = {
  sidebarItems: recursiveSidebarItems,
  onSideMenuSelect: PropTypes.func.isRequired,
  pathname: PropTypes.string
}

export default SideMenu
