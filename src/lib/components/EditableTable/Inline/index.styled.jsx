import Field from '~su/components/Form/Field'
import styled from 'styled-components'

export const StyledCell = styled.td`
  vertical-align: baseline;
`

export const StyledField = styled(Field)`
  margin-bottom: 0;

  > .ant-form-item-label {
    display: none;
  }
`
