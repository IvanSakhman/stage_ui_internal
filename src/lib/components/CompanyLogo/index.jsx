import PropTypes from 'prop-types'
import logoImage from './img/assembly-cropped-logo.png'
import { BorderedContainer, LogoContainer, CompanyName } from './index.styled'

const CompanyLogo = ({ companyName, inHeader = false }) => {
  const imageHeight = inHeader ? 24 : 29
  const imageWidth = inHeader ? 26 : 31

  return (
    <BorderedContainer $inHeader={inHeader}>
      <LogoContainer $inHeader={inHeader}>
        <CompanyName $inHeader={inHeader}>{companyName.toUpperCase()}</CompanyName>
        <img src={logoImage} alt={`${companyName} logo`} height={imageHeight} width={imageWidth} />
      </LogoContainer>
    </BorderedContainer>
  )
}

CompanyLogo.propTypes = {
  companyName: PropTypes.string.isRequired,
  inHeader: PropTypes.bool
}

export default CompanyLogo
