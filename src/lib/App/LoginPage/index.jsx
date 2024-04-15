import { useState, useRef, useEffect } from 'react'
import store from '~su/store'
import { useSearchParams, useNavigate } from '~su/hooks'
import { Form, Row, Col, Button, Typography, Flex, Space, GlobalAlert } from '~su/components'
import ory, { handleGetFlowError, handleFlowError } from '~su/sdk'
import fields from './fields'
import FeaturesList from './components/FeaturesList'
import PillButton from './components/PillButton'
import headerLogo from './assets/header-logo.svg'
import heroImage from './assets/hero.png'
import patternImage from './assets/pattern.svg'
import oktaLogo from './assets/okta.svg'
import microsoftLogo from './assets/microsoft.svg'
import footerLogo from './assets/footer-logo.svg'
import {
  Container,
  Wrapper,
  HeaderLogo,
  StyledRow,
  HeroImage,
  Pattern,
  Message,
  FormContainer,
  Providers,
  Footer,
  FooterLogo,
  StyledDivider,
  Copyright,
  StyledLink
} from './index.styled'

const { Title, Text } = Typography

const featuresList = [
  'End-to-end data solutions',
  'Secure platform',
  'Agile Technology',
  'Empowers Custom Solutions',
  'Promotes Business Growth'
]

const LoginPage = () => {
  const [flow, setFlow] = useState()

  const form = useRef(null)
  const searchParams = useSearchParams()
  const navigate = useNavigate()

  const redirects = store.useRedirects()
  const setIdentity = store.useSessionStore((state) => state.setIdentity)

  const flowId = searchParams.get('flow')
  const returnTo = searchParams.get('return_to')

  const triggerGlobalAlert = (message) =>
    store.triggerGlobalAlert(
      {
        id: 'login-error',
        type: 'error',
        message
      },
      true
    )

  const handleLogin = async ({ values: { identifier, password } }) => {
    store.removeGlobalAlert({ id: 'login-error' })

    if (flow) {
      const csrf_token = flow.ui.nodes.find(
        (node) => node.group === 'default' && node.attributes.type === 'hidden' && node.attributes.name === 'csrf_token'
      ).attributes.value

      window.history.pushState(null, '', `${redirects.login}?flow=${flow.id}`)

      ory
        .updateLoginFlow({
          flow: String(flow.id),
          updateLoginFlowBody: {
            csrf_token,
            identifier,
            password,
            method: 'password'
          }
        })
        .then(({ data }) => {
          setIdentity(data.session.identity)
          if (flow?.return_to) {
            window.location.href = flow?.return_to
            return
          }
          navigate(redirects.home)
        })
        .catch(
          handleFlowError({
            router: navigate,
            flowType: 'login',
            resetFlow: setFlow,
            redirects,
            triggerError: triggerGlobalAlert
          })
        )
        .catch((err) => {
          // If the previous handler did not catch the error it's most likely a form validation error
          if (err.response?.status === 400) {
            // Yup, it is!
            triggerGlobalAlert('Wrong email address or password')
            return
          }

          return Promise.reject(err)
        })
    } else {
      triggerGlobalAlert('Something went wrong')
    }
  }

  const handleMicrosoftLogin = async () => {}

  const handleOktaLogin = async () => {}

  useEffect(() => {
    if (flow || redirects) {
      return
    }

    const handleFlowObject = {
      router: navigate,
      flowType: 'login',
      resetFlow: setFlow,
      redirects,
      triggerError: triggerGlobalAlert
    }

    if (flowId) {
      ory
        .getLoginFlow({ id: String(flowId) })
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleGetFlowError(handleFlowObject))
      return
    }

    ory
      .createBrowserLoginFlow({
        returnTo: returnTo ? String(returnTo) : undefined
      })
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(handleFlowObject))
  }, [flow, flowId, returnTo, navigate, redirects])

  return (
    <Container justify="center">
      <Wrapper vertical justify="space-between" align="flex-end">
        <a href="/">
          <HeaderLogo src={headerLogo} alt="Logo" />
        </a>
        <StyledRow>
          <Col flex="auto">
            <HeroImage src={heroImage} alt="Girl with VR kit" />
            <Pattern src={patternImage} alt="" />
            <Message>Welcome.</Message>
          </Col>
          <FormContainer flex="28rem">
            <Title level={3}>Log in to your account</Title>
            <Form
              remoteControls
              ref={form}
              fields={fields}
              onFinish={handleLogin}
              name="login"
              style={{ marginBottom: '1rem' }}
            >
              <Button type="primary" size="large" danger htmlType="submit" block>
                Log in
              </Button>
            </Form>
            <GlobalAlert />
            <Providers vertical gap={8}>
              <Text>OR login with</Text>
              <Row gutter={[8, 0]}>
                <Col span={12}>
                  <PillButton icon={oktaLogo} alt="Okta icon" onClick={handleOktaLogin} />
                </Col>
                <Col span={12}>
                  <PillButton
                    icon={microsoftLogo}
                    alt="Microsoft icon"
                    onClick={handleMicrosoftLogin}
                    label="Microsoft"
                  />
                </Col>
              </Row>
            </Providers>
            <FeaturesList items={featuresList} />
          </FormContainer>
        </StyledRow>
        <Footer gap={54} justify="between">
          <Col flex="4rem">
            <a href="/">
              <FooterLogo src={footerLogo} alt="Logo" />
            </a>
          </Col>
          <Col flex="auto">
            <StyledDivider />
            <Flex justify="space-between">
              <Copyright>©2024 Assembly Global · All rights reserved</Copyright>
              <Space size="middle">
                <StyledLink href="/">Privacy Policy</StyledLink>
                <StyledLink href="/">Services</StyledLink>
              </Space>
            </Flex>
          </Col>
        </Footer>
      </Wrapper>
    </Container>
  )
}

export default LoginPage
