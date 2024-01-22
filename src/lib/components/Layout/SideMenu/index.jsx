import { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { Menu } from 'antd'

import { useLocation } from '~su/hooks'

import { Grid } from '~su/components/Grid'
const { useBreakpoint } = Grid
import DynamicIcon from '../../DynamicIcon'

import { SideMenuContainer, StyledLink } from './index.styled'
import getDefaultMenuKeys from './utilities/getDefaultMenuKeys'

const SideMenu = ({ sidebarItems, onSideMenuSelect, pathname = '', isCollapsible = true, children }) => {
  const location = useLocation()
  const currentBreakpoints = useBreakpoint()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // needs to be done manually because we're overwriting the breakpoints, and Sider has them hardcoded:
    // https://github.com/ant-design/ant-design/blob/master/components/layout/Sider.tsx#L13
    isCollapsible && setIsCollapsed(currentBreakpoints.xl === false) // collapse on screens smaller than 1441px
  }, [currentBreakpoints])

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
    <SideMenuContainer
      collapsed={isCollapsed}
      onCollapse={(collapsed) => setIsCollapsed(collapsed)}
      collapsible={isCollapsible}
    >
      {children}
      <Menu
        defaultOpenKeys={defaultMenuKeys?.defaultOpenKeys}
        defaultSelectedKeys={[defaultMenuKeys?.defaultSelectedKey]}
        selectedKeys={[defaultMenuKeys?.defaultSelectedKey]}
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
  pathname: PropTypes.string,
  isCollapsible: PropTypes.bool,
  children: PropTypes.node
}

export default SideMenu
