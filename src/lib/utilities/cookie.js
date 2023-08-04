import Cookies from 'js-cookie'

// setCookie = (name: string, value: any, options: any)
const setCookie = (name, value, options) => {
  return Cookies.set(name, value, options)
}

// getCookie = (name: string, onSuccess?: Function)
const getCookie = (name, onSuccess = null) => {
  const cookie = Cookies.get(name)

  return onSuccess ? onSuccess(cookie) : cookie
}

// removeCookie = (name: string, onSuccess?: Function, options?: any)
const removeCookie = (name, _onSuccess = null, options = {}) => {
  Cookies.remove(name, options)
  const cookie = Cookies.get(name)
  if (cookie) {
    throw `Cookie ${name} not removed - you must pass the exact same path and domain attributes that were used to set the cookie`
  }
}

export default { setCookie, getCookie, removeCookie }
