import PropTypes from 'prop-types'
import logoImage from './img/assembly-cropped-logo.png'
import { Container, LogoContainer, Logo } from './index.styled'

const CompanyLogo = ({ companyName }) => (
  <Container companyNameLength={companyName.length}>
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
