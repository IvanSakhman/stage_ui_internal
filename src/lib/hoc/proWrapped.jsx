import { useRef, useEffect } from 'react'
import { Badge, Tag } from 'antd'
import store from '~su/store'

const TagBadge = ({ color, copy, style }) => {
  return (
    <Tag color={color} style={{ verticalAlign: 'text-bottom', textTransform: 'uppercase', ...style }}>
      {copy}
    </Tag>
  )
}

const withBadge = (Content) => (proConfig, badgeConfig) => (props) => {
  const copy = badgeConfig.title && proConfig.title ? proConfig.title : proConfig.copy,
    { color } = proConfig

  switch (badgeConfig.type) {
    case 'tag': {
      return (
        <>
          <Content {...props} disable={!proConfig.enabled} />
          <TagBadge color={color} style={{ marginLeft: 5, ...badgeConfig.style }} copy={copy} />
        </>
      )
    }
    case 'ribbon': {
      return (
        <Badge.Ribbon
          text={copy}
          color={color}
          style={{ fontSize: 10, height: 15, lineHeight: 1.5, textTransform: 'uppercase', ...badgeConfig.style }}
          placement="start"
        >
          <Content {...props} disable={!proConfig.enabled} />
        </Badge.Ribbon>
      )
    }
    case 'bar': {
      return (
        <>
          <TagBadge
            color={color}
            style={{ marginLeft: 0, width: '100%', ...badgeConfig.style }}
            copy={`${copy} enabled`}
          />
          <Content {...props} disable={!proConfig.enabled} />
        </>
      )
    }
  }
}

const proWrapped =
  (Content) =>
  (wrapperConfig = {}) =>
  (props) => {
    const overlayRef = useRef(null)
    const proConfig = store.usePro()

    if (!Content) {
      Content = () => props.text
    }

    const disable = typeof wrapperConfig.disable === 'boolean' ? wrapperConfig.disable : true

    if (!proConfig || (!proConfig.enabled && !disable)) {
      return <Content {...props} />
    }

    const blockAllClicks = (overlay) => {
      if (!disable) {
        return null
      }
      overlay.addEventListener(
        'click',
        (e) => {
          e.preventDefault()
          e.stopPropagation()
        },
        true
      )
    }

    useEffect(() => {
      if (overlayRef.current) {
        !proConfig.enabled && blockAllClicks(overlayRef.current)
      }
    }, [overlayRef, proConfig])

    const styles = disable && !proConfig.enabled ? { opacity: '0.4', pointerEvents: 'none' } : {}

    return (
      <div ref={overlayRef} style={{ ...wrapperConfig.style, ...styles, position: 'relative' }}>
        {withBadge(Content)(proConfig, {
          type: wrapperConfig.badge || 'ribbon',
          style: wrapperConfig.badgeStyle,
          title: wrapperConfig.title
        })(props)}
      </div>
    )
  }

export const proProps =
  () =>
  (wrapperConfig = {}) =>
  () => {
    const proConfig = store.usePro()
    const { decorate, disable, ...config } = wrapperConfig
    let returnValue = {}

    if (decorate) {
      returnValue[decorate.name] = withBadge(() => decorate.text)(proConfig, {
        type: config.badge || 'ribbon',
        style: config.badgeStyle,
        title: config.title
      })()
    }

    const shouldDisable = typeof disable === 'boolean' ? disable : true
    if (!proConfig) {
      return returnValue
    } else {
      returnValue.disabled = !proConfig.enabled || shouldDisable
    }

    return returnValue
  }

export default proWrapped
