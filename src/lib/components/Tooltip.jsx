import { Tooltip as AntdTooltip } from 'antd'

// export interface Props extends HTMLAttributes<HTMLElement> {
//   title: string
// }

const Tooltip = ({ children, size, overlayStyle: overlayStyleProp, ...otherProps }) => {
  const overlayStyle = {
    ...overlayStyleProp,
    fontSize: size === 'small' ? 12 : null
  }

  return (
    <AntdTooltip destroyTooltipOnHide overlayStyle={overlayStyle} {...otherProps}>
      {children}
    </AntdTooltip>
  )
}

export default Tooltip
