import styled from 'styled-components'
import { COLORS } from '~su/constants'
import Empty from '../Empty'

export const StyledEmpty = styled(Empty)`
  margin: 0;
  border: 1px solid ${COLORS.border};
  padding-bottom: 108px;
  background-color: ${COLORS.emptyBackground};
`
