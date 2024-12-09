import PropTypes from 'prop-types'
import { useTranslation } from '~su/utilities/i18n'
import { useSearchParams } from '~su/hooks'
import { TitleContainer, StyledTabs, Title, Search } from './index.styled'
import Skeleton from '../Skeleton'
import Breadcrumb from '../Breadcrumb'
import Card from '../Card'
import Space from '../Space'
import buildCrumbs from './buildCrumbs'

const PageContainer = ({
  loading,
  search = null,
  children,
  header = {},
  tabs = {},
  buildBreadcrumbNames = null,
  pathname = '',
  homePath = '/',
  homeCrumbStyle = {}
}) => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()

  if (tabs.tabList) {
    if (children) {
      console.error('Cannot pass children when using tabs!')
    }

    children = <StyledTabs tabsItems={tabs.tabList} {...tabs.tabProps} />
  }

  const title = header.title || t('header.title')

  return (
    <>
      <Card style={{ borderRadius: '0 0 6px 6px', marginBottom: '8px' }} bodyStyle={{ padding: '12px 40px' }}>
        <Breadcrumb
          items={buildCrumbs(title, buildBreadcrumbNames, pathname, homePath, homeCrumbStyle)}
          className="ant-page-header-breadcrumb"
        />
        <TitleContainer justify="space-between" align="middle">
          {(title || search) && (
            <Space align="center" size="middle">
              {title && <Title level={4}>{title}</Title>}
              {search && (
                <Search
                  onSearch={search.onSearch}
                  defaultValue={searchParams.get('search') || ''}
                  placeholder={search.placeholder || 'Search'}
                  allowClear
                  $width={search.width}
                />
              )}
            </Space>
          )}
          {header.extra}
        </TitleContainer>
        <Skeleton loading={loading}>{header.content}</Skeleton>
      </Card>
      {children}
    </>
  )
}

PageContainer.propTypes = {
  loading: PropTypes.bool,
  search: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    width: PropTypes.number
  }),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  header: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.element
  }),
  tabs: PropTypes.shape({
    tabList: PropTypes.arrayOf(PropTypes.object),
    tabProps: PropTypes.object
  }),
  buildBreadcrumbNames: PropTypes.func,
  pathname: PropTypes.string,
  homePath: PropTypes.string,
  homeCrumbStyle: PropTypes.object
}

export default PageContainer
