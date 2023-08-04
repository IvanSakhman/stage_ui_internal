import styled from 'styled-components'
import { Breadcrumb } from 'antd'

import { COLORS } from '~su/constants'

const StyledBreadcrumb = styled(Breadcrumb)`
  // NOTE: for some reason this style is not applied...
  margin: 8px 0;

  li:last-child {
    color: ${COLORS.text};
  }
`

export default (props) => {
  return <StyledBreadcrumb {...props} />
}
