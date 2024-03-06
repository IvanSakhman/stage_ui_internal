import PropTypes from 'prop-types'

import styled from 'styled-components'
import Button from '~su/components/Button'

import iconLogo from './img/assembly_icon_print_4c.png'
import logo from './img/assembly_stage_logo_digital_light_rgb.png'

const StyledButton = styled(Button)`
  float: left;
  width: 100%;
  background: ${(props) => `url(${props.$backgroundUrl})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

const HomeButton = ({ hostedZone, customLogoUrl, large, homeUrl } = { large: false }) => {
  const defaultLogoUrl = large ? logo : iconLogo
  const logoUrl = customLogoUrl || defaultLogoUrl
  const url = homeUrl || `https://authentication.${hostedZone}`

  return <StyledButton type="link" href={url} $backgroundUrl={logoUrl} />
}

HomeButton.propTypes = {
  hostedZone: PropTypes.string.isRequired,
  large: PropTypes.bool,
  customLogoUrl: PropTypes.string,
  homeUrl: PropTypes.string
}

export default HomeButton
