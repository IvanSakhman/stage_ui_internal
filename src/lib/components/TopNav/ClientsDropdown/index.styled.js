import styled from 'styled-components'
import Menu from '~su/components/Menu'

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
      color: ${({ theme }) => theme.sideMenuItemDefault};
    }
  }

  .ant-menu-submenu-disabled {
    .ant-menu-submenu-title {
      cursor: default;
    }

    .ant-menu-submenu-arrow {
      display: none;
    }
  }

  .ant-menu-submenu::after,
  .ant-menu-submenu:hover::after {
    border-bottom: none !important;
    transition: none !important;
  }
`
