import styled, { css } from 'styled-components'
import { Layout } from 'antd'
import { headerHeight } from '~su/App/styleProvider'
import Typography from '../../Typography'

export const SideMenuContainer = styled(Layout.Sider)`
  &,
  .ant-menu {
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
    position: sticky !important;
  }
`

export const StickyContainer = styled.div`
  ${({ $isScrollable }) =>
    $isScrollable &&
    css`
      position: sticky;
      top: 0;
      max-height: calc(100vh - ${headerHeight}px);
      overflow-y: auto;
    `}
`

const { Paragraph } = Typography
export const Label = styled(Paragraph)`
  // those styles should be !important here to override antd :where selector styles https://github.com/ant-design/ant-design/issues/38660#issuecomment-1325365203
  margin-bottom: 0 !important;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.sideMenuItemActive : 'inherit')} !important;
  :hover {
    color: ${({ theme }) => theme.sideMenuItemActive} !important;
  }
`
