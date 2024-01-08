import PropTypes from 'prop-types'
import logoImage from './img/assembly-cropped-logo.png'
import { Container, LogoContainer, Logo } from './index.styled'

const CompanyLogo = ({ companyName, inHeader = false }) => (
  <Container companyNameLength={companyName.length} $inHeader={inHeader}>
    <LogoContainer>
      {companyName} <Logo src={logoImage} alt={`${companyName} logo`} />
    </LogoContainer>
  </Container>
)

CompanyLogo.propTypes = {
  companyName: PropTypes.string.isRequired,
  inHeader: PropTypes.bool
}

export default CompanyLogo
