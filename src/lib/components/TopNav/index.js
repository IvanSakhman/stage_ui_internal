import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { sessionStore } from '~su/authenticationSdk'
import { useNavigate } from '~su/hooks'
import { Row, Col } from '~su/components/Grid'
import Space from '~su/components/Space'
import LoadingBlock from '~su/components/LoadingBlock'

import HomeButton from './HomeButton'
import ClientsDropdown from './ClientsDropdown'
import SystemsMenu from './SystemsMenu'
import UserDropdown from './UserDropdown'
import CompanyLogo from '../CompanyLogo'

import logo from './img/assembly_stage_logo_digital_light_rgb.png'

import { StyledLayoutHeader, DynamicLeftSideContainer, DynamicLogo } from './index.styled'

const StageTopNav = ({
  clients,
  currentClient,
  systems,
  currentSystem,
  helpdeskUrl,
  themeOverrides,
  clientsDropdownTitle,
  currentClientDropdownTitle,
  homeUrl,
  clientLogoUrl,
  variant = 'default',
  authUrl = '/auth'
}) => {
  const [hostedZone, setHostedZone] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const { useSessionStatus, useSessionActions } = sessionStore
  const { isInitialized } = useSessionStatus()
  const { handleLogout: handleSessionLogout } = useSessionActions()
  const handleLogout = isInitialized ? () => handleSessionLogout(() => navigate(authUrl), setIsLoading) : null

  useEffect(() => {
    if (currentSystem) {
      setHostedZone(new URL(window.location).hostname.replace(`${currentSystem}.`, ''))
    }
  }, [currentSystem])

  const renderLeftSide = () => {
    return (
      <Row align="middle" justify="start">
        {hostedZone && (
          <Col span={3}>
            <HomeButton hostedZone={hostedZone} homeUrl={homeUrl} />
          </Col>
        )}
        <Col span={21}>
          <ClientsDropdown clients={clients} currentClient={currentClient} customTitle={currentClientDropdownTitle} />
        </Col>
      </Row>
    )
  }

  const renderRightSide = () => {
    return (
      <Row align="middle" justify="end" gutter={8}>
        <Col span={3}>
          <UserDropdown hostedZone={hostedZone} helpdeskUrl={helpdeskUrl} handleLogout={handleLogout} />
        </Col>
        <Col span={8}>
          <HomeButton hostedZone={hostedZone} large customLogoUrl={themeOverrides?.logoUrl} homeUrl={homeUrl} />
        </Col>
      </Row>
    )
  }

  const renderDefaultTopNav = () => (
    <Row align="middle">
      <Col span={5}>{renderLeftSide()}</Col>

      {hostedZone && (
        <Col span={14}>
          <SystemsMenu systems={systems} currentSystem={currentSystem} hostedZone={hostedZone} />
        </Col>
      )}

      {hostedZone && <Col span={5}>{renderRightSide()}</Col>}
    </Row>
  )

  const renderDynamicLogo = () => {
    if (clientLogoUrl) {
      return <DynamicLogo src={clientLogoUrl} />
    } else if (currentClient?.display_name) {
      return <CompanyLogo companyName={currentClient.display_name} inHeader />
    }

    return <DynamicLogo src={logo} />
  }

  const renderDynamicLogoTopNav = () => (
    <Row align="middle" justify="space-between">
      <DynamicLeftSideContainer align="middle" justify="start">
        {homeUrl && <a href={homeUrl}>{renderDynamicLogo()}</a>}
        <ClientsDropdown
          clients={clients}
          currentClient={currentClient}
          title={clientsDropdownTitle}
          customTitle={currentClientDropdownTitle}
          disabledOverflow
        />
      </DynamicLeftSideContainer>
      <Space size="middle">
        <UserDropdown hostedZone={hostedZone} helpdeskUrl={helpdeskUrl} handleLogout={handleLogout} />
      </Space>
    </Row>
  )

  return (
    <StyledLayoutHeader>
      {variant === 'with-dynamic-left-logo' ? renderDynamicLogoTopNav() : renderDefaultTopNav()}
      <LoadingBlock spinning={isLoading} showTip={false} size="large" fullscreen />
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
  systems: PropTypes.arrayOf(PropTypes.string.isRequired),
  currentSystem: PropTypes.string,
  themeOverrides: PropTypes.shape({
    logoUrl: PropTypes.string
  }),
  helpdeskUrl: PropTypes.string,
  clientsDropdownTitle: PropTypes.string,
  currentClientDropdownTitle: PropTypes.string,
  homeUrl: PropTypes.string,
  clientLogoUrl: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'with-dynamic-left-logo']),
  authUrl: PropTypes.string
}

export default StageTopNav
