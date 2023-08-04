import { useEffect } from 'react'
import { theme } from 'antd'
import Prism from 'prismjs'

const { useToken } = theme

const CodeBlock = ({ language, code }) => {
  const { token } = useToken()

  useEffect(() => {
    Prism.highlightAll()
  }, [language, code])

  return (
    <pre className="line-numbers">
      <code className={`language-${language}`} style={{ fontFamily: token.fontFamilyCode }}>
        {code}
      </code>
    </pre>
  )
}

export default CodeBlock
