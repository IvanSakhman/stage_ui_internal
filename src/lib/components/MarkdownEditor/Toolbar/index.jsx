import PropTypes from 'prop-types'
import {
  FontSizeOutlined,
  BoldOutlined,
  ItalicOutlined,
  MessageOutlined,
  CodeOutlined,
  LinkOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  CheckSquareOutlined
} from '@ant-design/icons'

import ButtonGroup from '~su/components/ButtonGroup'
import IconButton from '~su/components/IconButton'

import { SNIPPETS, insertSnippet } from '../utilities'

const ICONS = {
  heading: <FontSizeOutlined />,
  bold: <BoldOutlined />,
  italic: <ItalicOutlined />,
  quote: <MessageOutlined />,
  code: <CodeOutlined />,
  link: <LinkOutlined />,
  bulletList: <UnorderedListOutlined />,
  numberedList: <OrderedListOutlined />,
  checkList: <CheckSquareOutlined />
}

const MarkdownEditorToolbar = ({ editor, disabled }) => {
  const renderSnippetButton = (snippetName, index) => {
    return (
      <IconButton
        key={index}
        size="small"
        iconSize={14}
        disabled={disabled}
        tooltip={snippetName}
        icon={ICONS[snippetName]}
        onClick={() => insertSnippet(snippetName, editor)}
      >
        {snippetName}
      </IconButton>
    )
  }

  return <ButtonGroup>{Object.keys(SNIPPETS).map(renderSnippetButton)}</ButtonGroup>
}

MarkdownEditorToolbar.propTypes = {
  editor: PropTypes.object,
  disabled: PropTypes.bool
}

export default MarkdownEditorToolbar
