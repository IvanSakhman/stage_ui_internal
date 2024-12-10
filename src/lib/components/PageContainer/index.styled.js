import styled from 'styled-components'
import { Typography } from 'antd'

import { Row } from '../Grid'
import Input from '../Input'
import Tabs from '../Tabs'
import { COLORS } from '../../constants'

const { Search: AntdSearch } = Input

export const TitleContainer = styled(Row)`
  padding: 8px 0;
`

export const Title = styled(Typography.Title)`
  margin-bottom: 0 !important;
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

export const Search = styled(AntdSearch)`
  width: ${({ $width }) => $width || 350}px;
`
