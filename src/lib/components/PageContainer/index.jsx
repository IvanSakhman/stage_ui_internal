import PropTypes from 'prop-types'
import Skeleton from '../Skeleton'
import { Row } from '../Grid'
import Breadcrumb from '../Breadcrumb'
import buildCrumbs from './buildCrumbs'
import { StyledTabs, Header, Title } from './index.styled'

import { useTranslation } from '~su/utilities/i18n'

const PageContainer = ({ loading, children, header = {}, tabs = {}, buildBreadcrumbNames = null }) => {
  const { t } = useTranslation()

  if (tabs.tabList) {
    if (children) {
      console.error('Cannot pass children when using tabs!')
    }

    children = <StyledTabs tabsItems={tabs.tabList} {...tabs.tabProps} />
  }

  const title = t('title', header.title)

  return (
    <>
      <Header>
        <Breadcrumb items={buildCrumbs(title, buildBreadcrumbNames)} className="ant-page-header-breadcrumb" />
        <Row justify="space-between">
          <Title level={4}>{title}</Title>
          {header.extra}
        </Row>
        <Skeleton loading={loading}>{header.content}</Skeleton>
      </Header>
      {children}
    </>
  )
}

PageContainer.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  header: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.element
  }),
  tabs: PropTypes.shape({
    tabList: PropTypes.arrayOf(PropTypes.object),
    tabProps: PropTypes.object
  }),
  buildBreadcrumbNames: PropTypes.func
}

export default PageContainer
