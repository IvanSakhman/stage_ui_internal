import canWorkInBrowser from '~su/utilities/canWorkInBrowser'

export const useLocation = () => (canWorkInBrowser() ? window.location : '')
export const useNavigate = () => {
  return (path) => {
    if (canWorkInBrowser()) {
      window.location.replace(path)
    }
  }
}
