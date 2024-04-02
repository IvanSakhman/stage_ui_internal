import { Layout } from 'antd'
import { Row } from '~su/components/Grid'
import styled from 'styled-components'

export const StyledLayoutHeader = styled(Layout.Header)`
  padding-inline: 15px;
  background: ${({ theme }) => theme.topNavBackground};

  .ant-menu-item,
  .ant-menu-submenu-title {
    color: ${({ theme }) => theme.topNavTextDefault};
  }

  .ant-menu {
    font-size: 1rem;
    font-weight: 400;

    background: ${({ theme }) => theme.topNavBackground};

    .ant-menu-submenu-open,
    .ant-menu-submenu-active,
    .ant-menu-item-active,
    .ant-menu-item-selected,
    .ant-menu-overflow-item:hover,
    .ant-menu-item:hover {
      &:not(.ant-menu-submenu-disabled) {
        &,
        & * {
          color: ${({ theme }) => theme.topNavTextActive};
        }

        &::after {
          border-bottom-color: ${({ theme }) => theme.topNavTextActive};
        }
      }
    }
  }
`

export const DynamicLeftSideContainer = styled(Row)`
  width: 50%;
`

export const DynamicLogo = styled.img`
  width: auto;
  height: 32px;
`
