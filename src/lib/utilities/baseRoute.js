import checkIsLinkExternal from './checkIsLinkExternal'

let _baseRouteFunction = null

export default function baseRoute(routeFunction) {
  if (typeof routeFunction === 'function') {
    _baseRouteFunction = routeFunction
  }

  const navigate = (href, e) => {
    if (typeof _baseRouteFunction === 'function' && !checkIsLinkExternal(href)) {
      e.preventDefault()
      _baseRouteFunction(href)
    } else {
      window.location.href = href
    }
  }

  return { navigate, isFunction: () => typeof _baseRouteFunction === 'function' }
}
