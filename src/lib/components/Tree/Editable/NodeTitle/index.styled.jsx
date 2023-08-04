import { Badge } from 'antd'
import { green } from '@ant-design/colors'
import styled from 'styled-components'

export const NodeTitle = styled.span``

export const StyledBadge = styled(Badge)`
  margin: 2px 0;

  .ant-badge-count {
    box-shadow: none;
    background: ${(props) => props.$color || green[7]};
  }
`
