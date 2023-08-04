import styled from 'styled-components'

import Button from '~su/components/Button'

export const StyledControlButton = styled(Button)`
  display: ${(props) => (props.$hide ? 'none' : 'inherit')};
`
