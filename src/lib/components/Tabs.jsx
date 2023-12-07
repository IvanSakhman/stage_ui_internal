import PropTypes from 'prop-types'
import { Tabs as AntdTabs } from 'antd'
import { styled } from 'styled-components'

import { COLORS } from '~su/constants'

import string from '~su/utilities/string'

import { useTranslation } from '~su/utilities/i18n'

const StyledTabs = styled(AntdTabs)`
  .ant-tabs-nav {
    padding-inline: ${({ $isHorizontal }) => ($isHorizontal ? 24 : 0)}px;
    background: ${({ $isHorizontal }) => ($isHorizontal ? COLORS.white : 'initial')};
  }

  .ant-tabs-tabpane {
    margin-inline: ${({ $isHorizontal }) => ($isHorizontal ? 24 : 0)}px;
    width: ${({ $isHorizontal }) => ($isHorizontal ? 'calc(100% - 48px)' : '100%')};
  }
`

const buildTabItem = ({ key, children, ...rest }, t) => ({
  key,
  label: t(`tabs.${key}`, string.humanize(key, { titleize: true })),
  children,
  ...rest
})

const Tabs = ({ tabsItems, isHorizontal, tabPosition = 'top', ...rest }) => {
  const { t } = useTranslation()

  if (isHorizontal !== undefined) {
    console.warn('[DEPRECATED] v1.59.1: Tabs isHorizontal property is deprecated. Use tabPosition instead.')
  }

  isHorizontal = ['top', 'bottom'].includes(tabPosition)

  const items = tabsItems.map((tabItem) => buildTabItem(tabItem, t))

  return (
    <StyledTabs items={items} tabPosition={tabPosition} destroyInactiveTabPane $isHorizontal={isHorizontal} {...rest} />
  )
}

Tabs.propTypes = {
  tabsItems: PropTypes.arrayOf(PropTypes.object),
  isHorizontal: PropTypes.bool,
  tabPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
}

export default Tabs
