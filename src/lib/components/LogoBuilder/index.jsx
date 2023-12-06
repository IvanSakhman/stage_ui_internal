import PropTypes from 'prop-types'
import logoImage from './img/assembly-cropped-logo.png'
import { BorderedContainer, LogoContainer, CompanyName } from './index.styled'

const LogoBuilder = ({ companyName }) => {
  return (
    <BorderedContainer>
      <LogoContainer>
        <CompanyName>{companyName.toUpperCase()}</CompanyName>
        <img src={logoImage} alt={`${companyName} logo`} height={29} width={31} />
      </LogoContainer>
    </BorderedContainer>
  )
}

LogoBuilder.propTypes = {
  companyName: PropTypes.string.isRequired
}

export default LogoBuilder
