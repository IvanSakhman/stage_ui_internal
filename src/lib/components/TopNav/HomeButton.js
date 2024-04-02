import PropTypes from 'prop-types'

import styled from 'styled-components'
import Button from '~su/components/Button'

import iconLogo from './img/assembly_icon_print_4c.png'
import logo from './img/assembly_stage_logo_digital_light_rgb.png'

const StyledButton = styled(Button)`
  float: left;
  width: 100%;
  position: relative;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const HomeButton = ({ hostedZone, customLogoUrl, large, homeUrl } = { large: false }) => {
  const defaultLogoUrl = large ? logo : iconLogo
  const logoUrl = customLogoUrl || defaultLogoUrl
  const url = homeUrl || `https://authentication.${hostedZone}`

  return (
    <StyledButton type="link" href={url}>
      <StyledImage src={logoUrl} alt="logo" />
    </StyledButton>
  )
}

HomeButton.propTypes = {
  hostedZone: PropTypes.string.isRequired,
  large: PropTypes.bool,
  customLogoUrl: PropTypes.string,
  homeUrl: PropTypes.string
}

export default HomeButton
