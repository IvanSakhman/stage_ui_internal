import styled from 'styled-components'
import { Layout } from 'antd'
const { Content } = Layout

export const StyledContent = styled(Content)`
  padding: 0 16px;

  ${({ $styleOptions }) => $styleOptions};
`

// colors should be rewritten in scope of https://assembly-tech.atlassian.net/browse/SC-2
export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  min-width: 81.25rem;
  ${({ $styleOptions }) => $styleOptions}
`
