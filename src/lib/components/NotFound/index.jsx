import { Flex } from 'antd'
import PropTypes from 'prop-types'
import Typography from '~su/components/Typography'
import Button from '~su/components/Button'

const { Title, Paragraph } = Typography

const NotFound = ({ onClick, buttonLabel }) => (
  <Flex vertical align="center" justify="center" style={{ height: '100vh' }}>
    <Title level={2}>404 Not Found</Title>
    <Paragraph>The server cannot find the requested resource</Paragraph>
    <Button type="primary" onClick={onClick}>
      {buttonLabel}
    </Button>
  </Flex>
)

NotFound.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NotFound
