import { Dropdown, Menu } from 'antd'
import Button from './Button'
import { memo, isValidElement, Children } from 'react'

// type Props = {
//   display: string
//   children?: Children
// }

const ButtonMenu = ({ display, children, ...rest }) => {
  const menu = (
    <Menu>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return <Menu.Item key={index}>{child}</Menu.Item>
        }
      })}
    </Menu>
  )

  return children ? (
    <Dropdown.Button overlay={menu} {...rest}>
      {display}
    </Dropdown.Button>
  ) : (
    <Button {...rest}>{display}</Button>
  )
}

export default memo(ButtonMenu)
