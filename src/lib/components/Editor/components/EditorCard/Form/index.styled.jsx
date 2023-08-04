import styled from 'styled-components'

import { Card } from 'antd'

export const StyledCard = styled(Card)`
  .ant-form-item {
    .ant-form-item-explain {
      display: none;
    }
  }

  .ant-card-body {
    .ant-form-item {
      &.ant-form-item-has-error {
        border: 1px solid #ff4d4f;
      }
    }
  }
`
