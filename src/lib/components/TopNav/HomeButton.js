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

const HomeButton = ({ hostedZone, customLogoUrl, large } = { large: false }) => {
  const defaultLogoUrl = large ? logo : iconLogo
  const logoUrl = customLogoUrl || defaultLogoUrl

  return <StyledButton type="link" href={`https://authentication.${hostedZone}`} $backgroundUrl={logoUrl} />
}

HomeButton.propTypes = {
  hostedZone: PropTypes.string.isRequired,
  large: PropTypes.bool,
  customLogoUrl: PropTypes.string
}

export default HomeButton
