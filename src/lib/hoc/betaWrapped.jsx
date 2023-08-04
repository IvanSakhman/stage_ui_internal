import { useRef } from 'react'
import { Badge, Tag } from 'antd'

import string from '~su/utilities/string'

const withBadge = (Content) => (betaConfig, badgeConfig) => (props) => {
  const copy = badgeConfig.title && betaConfig.title ? betaConfig.title : betaConfig.copy,
    humanizedCopy = string.humanize(copy.toUpperCase()),
    { color } = betaConfig

  switch (badgeConfig.type) {
    case 'tag': {
      return (
        <>
          <Content {...props} />
          <Tag color={color} style={{ verticalAlign: 'text-bottom', marginLeft: 5, ...badgeConfig.style }}>
            {humanizedCopy}
          </Tag>
        </>
      )
    }
    case 'ribbon': {
      return (
        <Badge.Ribbon text={humanizedCopy} color={color} style={{ ...badgeConfig.style }} placement="end">
          <Content {...props} />
        </Badge.Ribbon>
      )
    }
  }
}

const betaWrapped =
  (Content) =>
  (wrapperConfig = {}) =>
  (props) => {
    const overlayRef = useRef(null)
    const betaConfig = { copy: 'beta', color: '#ffc53d' }

    if (!Content) {
      Content = () => props.text
    }

    if (!betaConfig) {
      return <Content {...props} />
    }

    return (
      <div ref={overlayRef}>
        {withBadge(Content)(betaConfig, {
          type: wrapperConfig.badge || 'ribbon',
          style: wrapperConfig.badgeStyle,
          title: wrapperConfig.title
        })(props)}
      </div>
    )
  }

export default betaWrapped
