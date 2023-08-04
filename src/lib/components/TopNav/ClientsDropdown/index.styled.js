import styled from 'styled-components'
import Menu from '~su/components/Menu'

import { COLORS } from '~su/constants'

export const StyledClientsMenu = styled(Menu)`
  .ant-menu-submenu-arrow {
    display: block;
    right: -15px;
    transform: rotate(90deg);
  }

  .ant-menu-overflow-item::after {
    display: none;
  }

  .ant-menu-submenu-selected:not(.ant-menu-submenu-open) {
    &,
    & * {
      color: ${COLORS.white};
    }
  }

  .ant-menu-submenu-disabled {
    color: ${COLORS.white} !important;

    .ant-menu-submenu-title {
      cursor: default;
    }

    .ant-menu-submenu-arrow {
      display: none;
    }
  }
`
