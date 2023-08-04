import styled from 'styled-components'
import { Dropdown, Menu } from 'antd'
import Button from './Button'
import { DownOutlined } from '@ant-design/icons'
import { memo } from 'react'

import { proWrapped } from '~su/hoc'

// type Props = {
//   items: any[]
// }

const StyledMenuItem = styled(Menu.Item)`
  &.ant-dropdown-menu-item-active:not(:hover) {
    background: inherit !important; // TODO: remove it with antd dropdown warning refactor
  }
`

const DropdownMenu = ({ display, items, trigger = ['click'], ...rest }) => {
  if (!items || items.length === 0) {
    return null
  }

  const MenuItem = ({ item, index }) => {
    return (
      <StyledMenuItem key={index} onClick={() => item.onSelect()} style={{ width: '100%' }}>
        {item.display}
      </StyledMenuItem>
    )
  }

  const ProMenuItem = proWrapped(MenuItem)({
    badge: 'tag',
    disable: true,
    badgeStyle: { fontSize: 9, padding: '0 5px' },
    style: { display: 'flex', alignItems: 'center', color: 'red' }
  })

  const menu = (
    <Menu>
      {items.map((item, index) => {
        const Comp = item.pro ? ProMenuItem : MenuItem
        return <Comp key={index} item={item} index={index} />
      })}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={trigger} {...rest}>
      <Button {...rest.buttonProps}>
        {display}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default memo(DropdownMenu)
