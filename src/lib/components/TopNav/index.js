import PropTypes from 'prop-types'

import { Row, Col } from '~su/components/Grid'

import HomeButton from './HomeButton'
import ClientsDropdown from './ClientsDropdown'
import SystemsMenu from './SystemsMenu'
import UserDropdown from './UserDropdown'

import { StyledLayoutHeader } from './index.styled'

const StageTopNav = ({ clients, currentClient, systems, currentSystem, helpdeskUrl, themeOverrides }) => {
  const hostedZone = new URL(window.location).hostname.replace(`${currentSystem}.`, '')

  const renderLeftSide = () => {
    return (
      <Row align="middle" justify="start">
        <Col span={3}>
          <HomeButton hostedZone={hostedZone} />
        </Col>
        <Col span={21}>
          <ClientsDropdown clients={clients} currentClient={currentClient} />
        </Col>
      </Row>
    )
  }

  const renderRightSide = () => {
    return (
      <Row align="middle" justify="end" gutter={8}>
        <Col span={3}>
          <UserDropdown hostedZone={hostedZone} helpdeskUrl={helpdeskUrl} />
        </Col>
        <Col span={8}>
          <HomeButton hostedZone={hostedZone} large customLogoUrl={themeOverrides?.logoUrl} />
        </Col>
      </Row>
    )
  }

  return (
    <StyledLayoutHeader>
      <Row align="middle">
        <Col span={5}>{renderLeftSide()}</Col>

        <Col span={14}>
          <SystemsMenu systems={systems} currentSystem={currentSystem} hostedZone={hostedZone} />
        </Col>

        <Col span={5}>{renderRightSide()}</Col>
      </Row>
    </StyledLayoutHeader>
  )
}

const clientType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  display_name: PropTypes.string.isRequired
})

StageTopNav.propTypes = {
  clients: PropTypes.shape({
    available: PropTypes.arrayOf(clientType).isRequired,
    path: PropTypes.string.isRequired
  }),
  currentClient: clientType,
  systems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentSystem: PropTypes.string.isRequired,
  themeOverrides: PropTypes.shape({
    logoUrl: PropTypes.string
  }),
  helpdeskUrl: PropTypes.string
}

export default StageTopNav
