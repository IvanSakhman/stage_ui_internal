import PropTypes from 'prop-types'
import { COLORS } from '~su/constants'
import { Row, Col, Typography, Button } from '~su/components'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const ConfirmModalContent = ({ title, description, closeButton, actionButton }) => {
  return (
    <Row gutter={16} wrap={false} style={{ padding: '12px 8px 4px 8px' }}>
      <Col flex="none">
        <ExclamationCircleOutlined style={{ color: COLORS.error, fontSize: '22px' }} />
      </Col>
      <Col flex="auto">
        <Typography.Title level={5}>{title}</Typography.Title>
        {description && <Typography.Text>{description}</Typography.Text>}
        <Row gutter={8} justify="end" style={{ marginTop: '24px' }}>
          <Col>
            <Button onClick={closeButton.onClick}>{closeButton.label}</Button>
          </Col>
          <Col>
            <Button
              onClick={actionButton.onClick}
              type="primary"
              danger={actionButton.danger}
              loading={actionButton.loading}
            >
              {actionButton.label}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const buttonProp = PropTypes.shape({
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  danger: PropTypes.bool,
  loading: PropTypes.bool
}).isRequired

ConfirmModalContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  closeButton: buttonProp,
  actionButton: buttonProp
}

export default ConfirmModalContent
