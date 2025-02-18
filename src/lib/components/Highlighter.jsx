import ReactHighlighter from 'react-highlight-words'
import { COLORS } from '~su/constants'

const Highlighter = (props) => {
  return <ReactHighlighter {...props} autoEscape highlightStyle={{ backgroundColor: COLORS.highlight, padding: 0 }} />
}

export default Highlighter
