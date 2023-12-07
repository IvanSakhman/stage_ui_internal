import canWorkInBrowser from '~su/utilities/canWorkInBrowser'

export const useLocation = () => (canWorkInBrowser() ? window.location : '')
export const useSearchParams = () => (canWorkInBrowser() ? new URLSearchParams(window.location.search) : null)
export const useNavigate = () => {
  return (path) => {
    if (canWorkInBrowser()) {
      window.location.replace(path)
    }
  }
}
