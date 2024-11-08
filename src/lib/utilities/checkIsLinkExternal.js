const checkIsLinkExternal = (url) => !(url.startsWith('/') || url.startsWith('#'))

export default checkIsLinkExternal
