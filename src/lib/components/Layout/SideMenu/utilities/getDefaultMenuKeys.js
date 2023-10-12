const checkBetterMatch = (closestMatch, key) =>
  !closestMatch.defaultSelectedKey || key?.length >= closestMatch.defaultSelectedKey.length

const findKeys = (
  pathname,
  items,
  parentsKeys = [],
  closestMatch = { defaultSelectedKey: null, defaultOpenKeys: [] }
) => {
  for (const item of items) {
    const parentKey = parentsKeys.length ? parentsKeys[parentsKeys.length - 1] : ''
    const key = `${parentKey}${item.key}`
    const updatedOpenKeys = item.children ? [...parentsKeys, key] : parentsKeys

    if (item.key === pathname && !(item.children && item.children.some((child) => child.key === pathname))) {
      return { defaultOpenKeys: updatedOpenKeys, defaultSelectedKey: key, keyFound: true }
    }

    if (pathname.includes(item.key) && checkBetterMatch(closestMatch, key)) {
      closestMatch = { defaultSelectedKey: key, defaultOpenKeys: updatedOpenKeys }
    }

    if (item.children) {
      const childrenMatch = findKeys(pathname, item.children, updatedOpenKeys, closestMatch)

      if (childrenMatch.keyFound) return childrenMatch
      if (checkBetterMatch(closestMatch, childrenMatch.defaultSelectedKey)) {
        closestMatch = childrenMatch
      }
    }
  }
  return closestMatch
}

export default (location, sidebarItems) => {
  if (!location) return { defaultOpenKeys: [], defaultSelectedKey: '' }

  const { pathname } = location

  return findKeys(pathname, sidebarItems)
}
