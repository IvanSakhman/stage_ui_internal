import styled from 'styled-components'
import { Typography } from 'antd'

import Tabs from '../Tabs'
import { COLORS } from '../../constants'

export const Title = styled(Typography.Title)`
  margin-top: 6px;
  padding-bottom: 8px;
`

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    min-height: ${({ $isHorizontal }) => ($isHorizontal ? 0 : 50)}vh;
    background: ${COLORS.white};
    border-radius: 6px;

    .ant-tabs-nav-list {
      margin-block: ${({ $isHorizontal }) => ($isHorizontal ? 0 : 8)}px;
      margin-inline: 20px 0;
    }
  }

  .ant-tabs-content-holder {
    border-color: transparent;
  }
`
