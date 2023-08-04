import PropTypes from 'prop-types'
import styled from 'styled-components'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Empty from '~su/components/Empty'
import Typography from '~su/components/Typography'

const StyledQuote = styled.blockquote`
  color: #666;
  margin: 0;
  padding-left: 1rem;
  border-left: 0.3rem #eee solid;
`

const COMPONENTS = {
  h1: Typography.Title,
  h2: Typography.Title,
  h3: Typography.Title,
  h4: Typography.Title,
  h5: Typography.Title,
  blockquote: StyledQuote,
  code: ({ children }) => <Typography.Text code>{children}</Typography.Text>
}

const MarkdownPreview = ({ value, dimensions }) => {
  const renderMarkdown = () => {
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS} height="40vh">
        {value}
      </ReactMarkdown>
    )
  }

  return <div style={{ maxHeight: dimensions.height, overflow: 'scroll' }}>{value ? renderMarkdown() : <Empty />}</div>
}

MarkdownPreview.propTypes = {
  value: PropTypes.string,
  dimensions: PropTypes.shape({
    height: PropTypes.string.isRequired
  }).isRequired
}

export default MarkdownPreview
