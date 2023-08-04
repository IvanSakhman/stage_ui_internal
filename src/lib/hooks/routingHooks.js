export const useLocation = () => window.location
export const useNavigate = () => {
  return (path) => {
    window.location.replace(path)
  }
}
