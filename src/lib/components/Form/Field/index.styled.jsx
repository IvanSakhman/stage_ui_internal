import { Form } from 'antd'
import styled, { css } from 'styled-components'

export const StyledField = styled(Form.Item)`
  .ant-input-number-group-wrapper,
  .ant-input-number {
    width: 100%;
  }
`

export const Label = styled.span`
  ${({ $isBold }) =>
    $isBold &&
    css`
      font-weight: bold;
    `}
`
