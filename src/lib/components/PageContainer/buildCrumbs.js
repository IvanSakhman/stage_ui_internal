import { HomeOutlined } from '@ant-design/icons'
import { useLocation } from '~su/hooks'
import { string, baseRoute } from '~su/utilities'

export default (headerTitle, buildBreadcrumbNames, pathname, homePath = '/', isButtonRole) => {
  const location = useLocation()
  const { navigate } = baseRoute()
  const homeCrumb = {
    href: isButtonRole ? null : homePath,
    role: isButtonRole ? 'button' : undefined,
    title: <HomeOutlined />,
    onClick: isButtonRole ? (e) => navigate(homePath, e) : undefined
  }

  const currentPathname = pathname || location.pathname

  // split location by /, reject first and last items and build rest into crumbs
  const splitPathname = currentPathname.split('/')
  const crumbsTree = splitPathname.slice(1, -1).map((parentPath, index) => {
    const breadcrumbName = string.humanize(parentPath, { titleize: true })
    const href = splitPathname.slice(0, index - (splitPathname.length - 2)).join('/')

    return {
      href: isButtonRole ? null : href,
      role: isButtonRole ? 'button' : undefined,
      title: buildBreadcrumbNames ? buildBreadcrumbNames(breadcrumbName) : breadcrumbName,
      onClick: isButtonRole ? (e) => navigate(href, e) : undefined
    }
  })

  const currentPathCrumb = {
    title: buildBreadcrumbNames ? buildBreadcrumbNames(headerTitle) : headerTitle
  }

  return [homeCrumb, ...crumbsTree, currentPathCrumb]
}
