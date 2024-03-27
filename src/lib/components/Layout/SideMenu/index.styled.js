import styled from 'styled-components'

import { Layout } from 'antd'

import Typography from '../../Typography'

export const SideMenuContainer = styled(Layout.Sider)`
  &,
  .ant-menu {
    color: ${({ theme }) => theme.sideMenuItemDefault};
    background: ${({ theme }) => theme.sideMenuBackground} !important;
  }
  & .ant-menu-item,
  & .ant-menu-submenu-title {
    color: ${({ theme }) => theme.sideMenuItemDefault};
  }
  // those styles should be !important here to override antd :where selector styles https://github.com/ant-design/ant-design/issues/38660#issuecomment-1325365203
  & .ant-menu-submenu-title:hover,
  & .ant-menu-submenu-open > .ant-menu-submenu-title {
    color: ${({ theme }) => theme.sideMenuItemOpen} !important;
  }
  & .ant-menu-item-selected,
  & .ant-menu-submenu-title:active,
  & .ant-menu-item:active {
    background: transparent !important;
  }

  & .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: ${({ theme }) => theme.sideMenuItemOpen};
  }

  // collapsed menu styles
  & .ant-menu-inline-collapsed {
    .ant-menu-submenu-selected .ant-menu-submenu-title > .anticon,
    .ant-menu-item-selected .anticon {
      color: ${({ theme }) => theme.sideMenuItemActive};
    }
  }
  & .ant-layout-sider-trigger {
    background: ${({ theme }) => theme.sideMenuBackground} !important;
  }
`

export const StyledLink = styled(Typography.Link)`
  // those styles should be !important here to override antd :where selector styles https://github.com/ant-design/ant-design/issues/38660#issuecomment-1325365203
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.sideMenuItemActive : 'inherit')} !important;
  :hover {
    color: ${({ theme }) => theme.sideMenuItemActive} !important;
  }
`
