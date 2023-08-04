import { Tabs } from 'antd'
import string from '~su/utilities/string'

const horizontalTabStyle = { margin: '0 24px', width: 'calc(100% - 48px)' }
const horizontalTopBarStyle = { background: '#fff', padding: '0 24px' }

const buildTabItem = ({ key, children, ...rest }) => ({
  key,
  label: string.humanize(key, { titleize: true }),
  children,
  ...rest
})

export default ({ tabsItems, isHorizontal = true, ...rest }) => {
  const position = isHorizontal ? 'top' : 'right'

  const items = tabsItems.map((tabItem) =>
    buildTabItem({
      ...tabItem,
      style: isHorizontal ? { ...horizontalTabStyle, ...tabItem.style } : tabItem.style
    })
  )

  return (
    <Tabs
      items={items}
      tabPosition={position}
      destroyInactiveTabPane
      tabBarStyle={isHorizontal ? horizontalTopBarStyle : null}
      {...rest}
    />
  )
}
