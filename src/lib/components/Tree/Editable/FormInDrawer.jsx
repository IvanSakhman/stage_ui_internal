import { Drawer } from 'antd'

import Form from '~su/components/Form'

const FormInDrawer = ({ initialValues = {}, nodeDrawer, onClose, onFormSubmit, ...formProps }) => {
  const { visible, title } = nodeDrawer

  const form = (
    <Form
      object={initialValues}
      name={`edit-${nodeDrawer.key}-node`}
      onCancel={onClose}
      onFinish={onFormSubmit}
      {...formProps}
    />
  )

  return (
    <Drawer title={`Edit ${title}`} placement="right" closable={false} onClose={onClose} visible={visible} width={400}>
      {form}
    </Drawer>
  )
}

export default FormInDrawer
