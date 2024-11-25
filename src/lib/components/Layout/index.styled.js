import styled from 'styled-components'
import { Layout } from 'antd'
import { MEDIA } from '~su/constants/mediaQueries'
const { Content } = Layout

export const StyledContent = styled(Content)`
  padding: 0 16px;

  ${({ $styleOptions }) => $styleOptions};
`

// colors should be rewritten in scope of https://assembly-tech.atlassian.net/browse/SC-2
export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  min-width: 1576px;

  ${MEDIA.screen.lg} {
    min-width: initial;
  }
`
