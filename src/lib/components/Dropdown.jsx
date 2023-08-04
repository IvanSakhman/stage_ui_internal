import { memo, useState, isValidElement, Children } from 'react'
import { Dropdown as AntdDropdown, Menu } from 'antd'
import Button from './Button'
import IconButton from './IconButton'

// type Props = {
//   display: string
//   icon: Node
//   children?: Children
//   buttonProps?: object
//   autohide?: boolean
// }

const Dropdown = ({ display, icon, children, buttonProps, autohide = true, ...rest }) => {
  const [open, setOpen] = useState(false)

  const handleMenuClick = (_e) => {
    if (autohide) {
      setOpen(!open)
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return <Menu.Item key={index}>{child}</Menu.Item>
        }
      })}
    </Menu>
  )

  let button = null

  if (display && icon) {
    button = (
      <Button icon={icon} {...buttonProps}>
        {display}
      </Button>
    )
  }

  if (icon && !display) {
    button = <IconButton icon={icon} {...buttonProps} />
  }

  if (display && !icon) {
    button = <Button {...buttonProps}>{display}</Button>
  }

  return (
    <AntdDropdown overlay={menu} open={open} onOpenChange={(flag) => setOpen(flag)} {...rest}>
      {button}
    </AntdDropdown>
  )
}

export default memo(Dropdown)
