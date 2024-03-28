import { theme } from 'antd'

import styled from 'styled-components'

import { COLORS } from '~su/constants'

import { AceEditor } from '../../../utilities/ace'

const { useToken } = theme

const editorFont = () => {
  const { token } = useToken()

  return `
    font-size: ${token.fontSize};
    font-family: ${token.fontFamilyCode};
  `
}

export const StyledAce = styled(AceEditor)`
  &.ace_editor {
    ${(_props) => editorFont()}
  }

  .ace_comment {
    color: ${COLORS.grey};
  }

  .ace_constant.ace_numeric {
    color: ${COLORS.darkOrange};
  }

  .ace_string {
    color: ${COLORS.success};

    &.ace_alias {
      color: ${COLORS.green};
    }

    &.ace_macro {
      color: ${COLORS.secondary};
    }
  }
`
