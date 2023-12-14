import styled from 'styled-components'
import { Radio } from 'antd'

const { Group, Button } = Radio

export const StyledRadioGroup = styled(Group)`
  margin: 1rem 0 0.5rem 1.75rem;
  &.ant-radio-group-solid .ant-radio-button-wrapper-checked {
    &::before {
      background-color: ${({ theme }) => theme.sideMenuItemActive};
      box-sizing: content-box;
    }
  }
`

export const RadioButton = styled(Button)`
  &:hover {
    color: ${({ theme }) => theme.sideMenuItemActive};
  }
`
