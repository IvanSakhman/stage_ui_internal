import Cookies from 'js-cookie'
import cookieUtilities from '~su/utilities/cookie'

const { setCookie, getCookie, removeCookie } = cookieUtilities

describe('Cookie utilities', () => {
  beforeEach(() => Cookies.remove('test'))

  describe('setCookie', () => {
    it('sets cookie', () => {
      expect(Cookies.get('test')).toBe(undefined)

      setCookie('test', 'I was set!')

      expect(Cookies.get('test')).toBe('I was set!')
    })
  })

  describe('getItem', () => {
    it('gets the cookie', () => {
      expect(getCookie('test')).toBe(undefined)

      Cookies.set('test', 'I was set for get!')

      expect(getCookie('test')).toBe('I was set for get!')
    })
  })

  describe('removeItem', () => {
    it('removes the cookie', () => {
      setCookie('test', 'I am doomed!')

      expect(getCookie('test')).toBe('I am doomed!')

      removeCookie('test')

      expect(getCookie('test')).toBe(undefined)
    })
  })
})
