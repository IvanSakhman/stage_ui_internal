import React from 'react'
import Modal from './Modal'
import store from '~su/store'

const RootModal = () => {
  const { isOpen, children, closable, maskClosable, title, width } = store.useRootModal()

  return (
    <Modal
      onCancel={store.hideModal}
      closable={closable}
      maskClosable={maskClosable}
      title={title}
      width={width}
      open={isOpen}
    >
      {children}
    </Modal>
  )
}

export default RootModal
