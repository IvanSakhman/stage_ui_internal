import { Modal as AntdModal, Grid } from 'antd'

const { useBreakpoint } = Grid

const Modal = (props) => {
  const defaultWidth = useBreakpoint().xxl ? '80vw' : '100vw'

  return (
    <AntdModal width={props.width || defaultWidth} footer={null} destroyOnClose={true} keyboard={false} {...props} />
  )
}

export default Modal
