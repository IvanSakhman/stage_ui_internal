import styled, { css } from 'styled-components'
import { Form, Row } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { COLORS } from '~su/constants'

export const StyledForm = styled(Form)`
  ${({ $isModalForm }) =>
    $isModalForm &&
    css`
      margin-top: 15px;
      padding-top: 20px;
      border-top: 1px solid ${COLORS.border};
      min-height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`

export const StyledRow = styled(Row)`
  ${({ $isModalForm }) =>
    $isModalForm &&
    css`
      padding-top: 20px;
      border-top: 1px solid ${COLORS.border};
      justify-content: flex-end;
    `}
`

export const DeleteIcon = styled(DeleteOutlined)`
  position: absolute;
  top: 9px;
  right: 7px;
  color: ${COLORS.error};
`
