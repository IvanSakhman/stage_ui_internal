import styled from 'styled-components'
import Menu from '~su/components/Menu'

import { COLORS } from '~su/constants'

export const StyledUserMenu = styled(Menu)`
  .ant-menu-overflow-item::after {
    display: none;
  }

  .ant-menu-overflow-item {
    padding: 0;

    &,
    .ant-menu-submenu-title .anticon {
      font-size: 18px;
      min-width: 18px;
    }
  }

  .ant-menu-submenu-open,
  .ant-menu-submenu-active,
  .ant-menu-overflow-item:hover {
    &,
    & * {
      color: ${COLORS.navLink};
    }
  }

  .ant-menu-submenu-selected:not(.ant-menu-submenu-open) {
    &,
    & * {
      color: ${COLORS.white};
    }
  }
`
