import { Tooltip as AntdTooltip } from 'antd'

// export interface Props extends HTMLAttributes<HTMLElement> {
//   title: string
// }

interface TooltipProps {
  children: React.ReactNode
  size?: 'small' | 'default'
  overlayStyle?: React.CSSProperties
}

const Tooltip = ({ children, size, overlayStyle: overlayStyleProp, ...otherProps }: TooltipProps) => {
  const overlayStyle = {
    ...overlayStyleProp,
    fontSize: size === 'small' ? 12 : undefined
  }

  return (
    <AntdTooltip destroyTooltipOnHide overlayStyle={overlayStyle} {...otherProps}>
      {children}
    </AntdTooltip>
  )
}

export default Tooltip
