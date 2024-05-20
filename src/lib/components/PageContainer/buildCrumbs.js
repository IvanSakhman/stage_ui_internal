import { HomeOutlined } from '@ant-design/icons'
import { useLocation } from '~su/hooks'
import { string } from '~su/utilities'

export default (headerTitle, buildBreadcrumbNames, pathname, homePath) => {
  const location = useLocation()
  const homeCrumb = { href: homePath, title: <HomeOutlined /> }

  const currentPathname = pathname || location.pathname

  // split location by /, reject first and last items and build rest into crumbs
  const splitPathname = currentPathname.split('/')
  const crumbsTree = splitPathname.slice(1, -1).map((parentPath, index) => {
    const breadcrumbName = string.humanize(parentPath, { titleize: true })

    return {
      href: splitPathname.slice(0, index - (splitPathname.length - 2)).join('/'),
      title: buildBreadcrumbNames ? buildBreadcrumbNames(breadcrumbName) : breadcrumbName
    }
  })

  const currentPathCrumb = {
    title: buildBreadcrumbNames ? buildBreadcrumbNames(headerTitle) : headerTitle
  }

  return [homeCrumb, ...crumbsTree, currentPathCrumb]
}
