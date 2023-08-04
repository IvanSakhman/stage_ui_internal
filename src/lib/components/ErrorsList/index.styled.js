import styled from 'styled-components'

import { COLORS } from '~su/constants'

export const Container = styled.div`
  margin-top: 24px;
  padding: 24px 40px;
  color: ${COLORS.text};
  background: ${COLORS.background};
  border: ${(props) => (props.$bordered ? `1px solid ${COLORS.grey}` : 'none')};
  border-radius: 10px;
`

export const List = styled.ol`
  padding-left: 0;
  margin: 0;

  > li > ol {
    padding-left: 20px;
  }
`

export const ListItem = styled.li`
  text-align: left;
`
