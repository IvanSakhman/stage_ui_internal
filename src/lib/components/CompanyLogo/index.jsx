import PropTypes from 'prop-types'
import logoImage from './img/assembly-cropped-logo.png'
import { BorderedContainer, LogoContainer, CompanyName } from './index.styled'

const CompanyLogo = ({ companyName, variant = 'card' }) => {
  const imageHeight = variant === 'card' ? 29 : 24
  const imageWidth = variant === 'card' ? 31 : 26

  return (
    <BorderedContainer $variant={variant}>
      <LogoContainer $variant={variant}>
        <CompanyName $variant={variant}>{companyName.toUpperCase()}</CompanyName>
        <img src={logoImage} alt={`${companyName} logo`} height={imageHeight} width={imageWidth} />
      </LogoContainer>
    </BorderedContainer>
  )
}

CompanyLogo.propTypes = {
  companyName: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['card', 'header'])
}

export default CompanyLogo
