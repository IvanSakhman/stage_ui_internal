import Skeleton from '../Skeleton'
import { Row } from '../Grid'
import Breadcrumb from '../Breadcrumb'
import buildCrumbs from './buildCrumbs'
import { StyledTabs, Header, Title } from './index.styled'

const PageContainer = ({ loading, children, header = {}, tabs = {}, buildBreadcrumbNames = null }) => {
  if (tabs.tabList) {
    if (children) {
      console.error('Cannot pass children when using tabs!')
    }

    children = <StyledTabs tabsItems={tabs.tabList} {...tabs.tabProps} />
  }

  return (
    <>
      <Header>
        <Breadcrumb items={buildCrumbs(header.title, buildBreadcrumbNames)} className="ant-page-header-breadcrumb" />
        <Row justify="space-between">
          <Title level={4}>{header.title}</Title>
          {header.extra}
        </Row>
        <Skeleton loading={loading}>{header.content}</Skeleton>
      </Header>
      {children}
    </>
  )
}

export default PageContainer
