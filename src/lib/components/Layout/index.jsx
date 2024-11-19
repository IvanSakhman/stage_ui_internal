import PropTypes from 'prop-types'

import { theme, Layout as AntdLayout } from 'antd'

import { withLoader } from '~su/hoc'

import GlobalAlert from '../GlobalAlert'
import TopNav from '../TopNav'
import SideMenu from './SideMenu'

import { StyledContent, StyledLayout } from './index.styled'

const { useToken } = theme

const Layout = ({
  menuProps,
  sidebarItems,
  children,
  onSideMenuSelect,
  themeOverrides = {},
  pathname,
  sideMenuChildren,
  layoutStyles,
  contentContainerStyles,
  isSideMenuCollapsible,
  showSideMenu = true,
  shouldTransformItems
}) => {
  const { token: themeToken } = useToken()

  return (
    <StyledLayout $styleOptions={layoutStyles}>
      <TopNav themeOverrides={themeOverrides} {...menuProps} />
      <AntdLayout>
        {showSideMenu && (
          <SideMenu
            sidebarItems={sidebarItems}
            onSideMenuSelect={onSideMenuSelect}
            themeToken={themeToken}
            pathname={pathname}
            isCollapsible={isSideMenuCollapsible}
            shouldTransformItems={shouldTransformItems}
          >
            {sideMenuChildren}
          </SideMenu>
        )}
        <AntdLayout>
          <GlobalAlert />
          <StyledContent $styleOptions={contentContainerStyles}>{children}</StyledContent>
        </AntdLayout>
      </AntdLayout>
    </StyledLayout>
  )
}

Layout.propTypes = {
  menuProps: PropTypes.shape(TopNav.propTypes).isRequired,
  sidebarItems: SideMenu.propTypes.sidebarItems,
  onSideMenuSelect: SideMenu.propTypes.onSideMenuSelect,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  themeOverrides: PropTypes.object,
  pathname: PropTypes.string,
  layoutStyles: PropTypes.string,
  sideMenuChildren: PropTypes.node,
  contentContainerStyles: PropTypes.string,
  isSideMenuCollapsible: PropTypes.bool,
  showSideMenu: PropTypes.bool,
  shouldTransformItems: PropTypes.bool
}

export default withLoader(Layout)
