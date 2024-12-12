import { useLocation, useNavigate } from '~su/hooks/routingHooks'
import { renderHook, act } from '@testing-library/react'

describe('Routing Hooks', () => {
  describe('useLocation', () => {
    it('returns current location', () => {
      const { result } = renderHook(() => useLocation())

      expect(result.current).toEqual(window.location)
    })
  })

  describe('useNavigate', () => {
    const { location } = window

    beforeAll(() => {
      delete window.location
      window.location = { replace: jest.fn() }
    })

    afterAll(() => {
      window.location = location
    })

    it('navigates', () => {
      const { result } = renderHook(() => useNavigate())

      expect(result.current).toEqual(expect.any(Function))

      act(() => {
        result.current('/test')
      })

      expect(window.location.replace).toBeCalledWith('/test')
    })
  })
})
