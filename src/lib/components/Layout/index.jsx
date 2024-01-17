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
  contentContainerStyles,
  customTrigger
}) => {
  const { token: themeToken } = useToken()

  return (
    <StyledLayout>
      <TopNav themeOverrides={themeOverrides} {...menuProps} />
      <AntdLayout>
        {!!sidebarItems.length && (
          <SideMenu
            sidebarItems={sidebarItems}
            onSideMenuSelect={onSideMenuSelect}
            themeToken={themeToken}
            pathname={pathname}
            customTrigger={customTrigger}
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
  sideMenuChildren: PropTypes.node,
  contentContainerStyles: PropTypes.string,
  customTrigger: PropTypes.oneOfType([PropTypes.node, null])
}

export default withLoader(Layout)
