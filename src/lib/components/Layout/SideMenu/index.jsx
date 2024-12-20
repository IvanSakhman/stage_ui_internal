import { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { Menu } from 'antd'

import { useLocation } from '~su/hooks'

import { Grid } from '~su/components/Grid'
const { useBreakpoint } = Grid
import DynamicIcon from '../../DynamicIcon'

import { SideMenuContainer, StickyContainer, Label } from './index.styled'
import getDefaultMenuKeys from './utilities/getDefaultMenuKeys'

const SideMenu = ({
  sidebarItems,
  onSideMenuSelect,
  pathname = '',
  isCollapsible = true,
  isScrollable = false,
  children,
  shouldTransformItems = true
}) => {
  const location = useLocation()
  const currentBreakpoints = useBreakpoint()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const defaultMenuKeysInitial = getDefaultMenuKeys(location, sidebarItems, pathname)
  const [defaultMenuKeys, setDefaultMenuKeys] = useState(defaultMenuKeysInitial)

  useEffect(() => {
    // needs to be done manually because we're overwriting the breakpoints, and Sider has them hardcoded:
    // https://github.com/ant-design/ant-design/blob/master/components/layout/Sider.tsx#L13
    isCollapsible && setIsCollapsed(currentBreakpoints.xl === false) // collapse on screens smaller than 1441px
  }, [currentBreakpoints])

  useEffect(() => {
    if (pathname) {
      setDefaultMenuKeys(getDefaultMenuKeys(location, sidebarItems, pathname))
    }
  }, [pathname])

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
          <Label
            $isSelected={key === defaultMenuKeys?.defaultSelectedKey}
            onClick={(e) => handleMenuItemClick(e, item.key)}
            {...(!isCollapsed && {
              ellipsis: { tooltip: { title: item.label, placement: 'right' }, onEllipsis: () => {} } // We need this empty function for ellipsis to work
            })}
          >
            {item.label}
          </Label>
        ),
        icon: <DynamicIcon name={item.icon} />,
        ...(item.children ? { children: transformItems(item.children, key) } : {})
      }
    })

  const sidebarMenuItems = shouldTransformItems ? transformItems(sidebarItems) : sidebarItems

  return (
    <SideMenuContainer
      collapsed={isCollapsed}
      onCollapse={(collapsed) => setIsCollapsed(collapsed)}
      collapsible={isCollapsible}
    >
      <StickyContainer $isScrollable={isScrollable}>
        {children}
        <Menu
          defaultOpenKeys={defaultMenuKeys?.defaultOpenKeys}
          defaultSelectedKeys={[defaultMenuKeys?.defaultSelectedKey]}
          selectedKeys={[defaultMenuKeys?.defaultSelectedKey]}
          openKeys={defaultMenuKeys?.defaultOpenKeys}
          onOpenChange={(openKeys) => {
            setDefaultMenuKeys(({ defaultSelectedKey }) => ({
              defaultOpenKeys: openKeys,
              defaultSelectedKey
            }))
          }}
          mode="inline"
          items={sidebarMenuItems}
          {...(!shouldTransformItems && { onSelect: onSideMenuSelect })}
        />
      </StickyContainer>
    </SideMenuContainer>
  )
}

function recursiveSidebarItems(...args) {
  const sidebarItemType = PropTypes.shape({
    icon: PropTypes.node,
    key: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    children: recursiveSidebarItems
  })
  return PropTypes.oneOfType([PropTypes.arrayOf(sidebarItemType), sidebarItemType])(...args)
}

SideMenu.propTypes = {
  sidebarItems: recursiveSidebarItems,
  onSideMenuSelect: PropTypes.func.isRequired,
  pathname: PropTypes.string,
  isCollapsible: PropTypes.bool,
  isScrollable: PropTypes.bool,
  children: PropTypes.node,
  shouldTransformItems: PropTypes.bool
}

export default SideMenu
