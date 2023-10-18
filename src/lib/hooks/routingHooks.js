import isBrowser from '~su/utilities/isBrowser'

export const useLocation = () => (isBrowser() ? window.location : '')
export const useNavigate = () => {
  return (path) => {
    if (isBrowser()) {
      window.location.replace(path)
    }
  }
}
