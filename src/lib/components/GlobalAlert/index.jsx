import { useGlobalAlerts } from '~su/store/root-store'

import { StyledAlert } from './index.styled'

const GlobalAlert = () => {
  const globalAlerts = useGlobalAlerts()

  return globalAlerts.map((globalAlert, index) => {
    return <StyledAlert closable {...globalAlert} key={index} />
  })
}

export default GlobalAlert
