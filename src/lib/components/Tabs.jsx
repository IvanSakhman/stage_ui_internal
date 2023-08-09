import PropTypes from 'prop-types'
import { Tabs as AntdTabs } from 'antd'
import string from '~su/utilities/string'

import { useTranslation } from '~su/utilities/i18n'

const horizontalTabStyle = { margin: '0 24px', width: 'calc(100% - 48px)' }
const horizontalTopBarStyle = { background: '#fff', padding: '0 24px' }

const buildTabItem = ({ key, children, ...rest }, t) => ({
  key,
  label: t(`tabs.${key}`, string.humanize(key, { titleize: true })),
  children,
  ...rest
})

const Tabs = ({ tabsItems, isHorizontal = true, ...rest }) => {
  const { t } = useTranslation()

  const position = isHorizontal ? 'top' : 'right'

  const items = tabsItems.map((tabItem) =>
    buildTabItem(
      {
        ...tabItem,
        style: isHorizontal ? { ...horizontalTabStyle, ...tabItem.style } : tabItem.style
      },
      t
    )
  )

  return (
    <AntdTabs
      items={items}
      tabPosition={position}
      destroyInactiveTabPane
      tabBarStyle={isHorizontal ? horizontalTopBarStyle : null}
      {...rest}
    />
  )
}

Tabs.propTypes = {
  tabsItems: PropTypes.arrayOf(PropTypes.object),
  isHorizontal: PropTypes.bool
}

export default Tabs
