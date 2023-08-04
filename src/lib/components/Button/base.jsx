import { forwardRef, isValidElement, cloneElement } from 'react'
import { Popconfirm } from 'antd'
import Tooltip from '../Tooltip'
import keyboardShortcuts from '~su/utilities/keyboardShortcuts'

import { StyledButton } from './base.styled'

const ICON_SIZE = 18

// export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children: any
//   icon?: object
//   iconSize?: number
//   tooltip?: string | object
//   disabled?: boolean
//   shortcut?: string
//   onClick: Function
//   popconfirm?: any
//   className?: string
//   warn?: boolean
//   light?: boolean
//   iconOnly?: boolean
// }
// export type Ref = HTMLButtonElement

const Button = forwardRef(
  (
    {
      children,
      icon,
      iconSize = null,
      tooltip,
      disabled,
      shortcut,
      onClick,
      popconfirm,
      type,
      warn = false,
      light = false,
      iconOnly = false,
      ...rest
    },
    ref
  ) => {
    if (icon && isValidElement(icon)) {
      const iconFontSize = iconSize || ICON_SIZE

      icon = cloneElement(
        icon,
        { style: { fontSize: iconFontSize, lineHeight: `${iconFontSize}px`, verticalAlign: 'middle' } },
        null
      )
    }

    const buttonProps = {
      ref,
      disabled,
      onClick,
      type: type == 'primary-dashed' ? 'primary' : type,
      $primaryDashed: type == 'primary-dashed',
      $light: light,
      $warn: warn,
      ...rest
    }

    let btn
    if (iconOnly) {
      btn = <StyledButton icon={icon} {...buttonProps} />
    } else {
      btn = (
        <StyledButton {...buttonProps}>
          {icon}
          {children && icon && <span style={{ width: 4 }} />}
          {children}
        </StyledButton>
      )
    }

    if (popconfirm) {
      const onPopconfirmClicked = (e) => {
        e.stopPropagation()
      }

      btn = (
        <Popconfirm
          title={popconfirm.title || 'Are you sure?'}
          onClick={onPopconfirmClicked}
          onCancel={onPopconfirmClicked}
          onConfirm={onClick}
          placement={popconfirm.placement || (tooltip ? 'bottom' : 'top')}
          cancelText={popconfirm.cancelText || 'Cancel'}
          okText={popconfirm.okText || 'Yes'}
          disabled={disabled}
        >
          {cloneElement(btn, { onClick: null }, btn.props.children)}
        </Popconfirm>
      )
    }

    // If the button is disabled the tooltip gets weird on hover
    if ((!shortcut && !tooltip) || disabled) {
      return btn
    }

    if (typeof tooltip == 'string') {
      tooltip = { title: tooltip }
    }

    if (shortcut) {
      const humanizedShortcut = keyboardShortcuts.humanReadableShortcut(shortcut, 1) // show only primary shortcut
      tooltip = tooltip || {}
      tooltip.title = (
        <>
          {tooltip.title} (<i>{humanizedShortcut}</i>)
        </>
      )
    }

    return (
      <Tooltip {...tooltip} size="small" destroyTooltipOnHide={true} keepParent={false}>
        {btn}
      </Tooltip>
    )
  }
)

export default Button
