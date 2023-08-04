import styled from 'styled-components'
import { STYLE_VARS } from '~su/constants'

import { Card } from 'antd'

export const StyledCard = styled(Card)`
  box-shadow: ${({ bordered }) => (bordered ? STYLE_VARS.box_shadow : 'none')} !important;

  > .ant-card-body {
    padding: 0;
  }

  .ant-card-actions {
    border-bottom-left-radius: 10px; // @card-radius
    border-bottom-right-radius: 10px; // @card-radius

    > li {
      margin: 0; // @card-actions-li-margin; not sure if should be applied globally
    }
  }
`
