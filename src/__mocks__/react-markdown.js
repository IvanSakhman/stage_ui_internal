import PropTypes from 'prop-types'

function ReactMarkdown({ children }) {
  return <>{children}</>
}

ReactMarkdown.propTypes = {
  children: PropTypes.node.isRequired
}

export default ReactMarkdown
