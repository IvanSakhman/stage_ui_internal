import PropTypes from 'prop-types'
import { Modal as AntdModal, Grid } from 'antd'
import ConfirmModalContent from './ConfirmModalContent'

const { useBreakpoint } = Grid

const Modal = (props) => {
  const defaultWidth = useBreakpoint().xxl ? '80vw' : '100vw'

  return (
    <AntdModal width={props.width || defaultWidth} footer={null} destroyOnClose={true} keyboard={false} {...props} />
  )
}

Modal.useModal = AntdModal.useModal
Modal.ConfirmModalContent = ConfirmModalContent

Modal.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Modal
