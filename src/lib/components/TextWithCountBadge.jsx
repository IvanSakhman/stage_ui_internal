import { Badge } from 'antd'

// type Props = {
//   text: string
//   count?: string | number
// }

const TextWithCountBadge = ({ text, count = null }) => {
  if (count === null) {
    return text
  }

  return [text, <Badge key="badge" count={count} showZero style={{ backgroundColor: '#1890ff' }} />]
}

export default TextWithCountBadge
