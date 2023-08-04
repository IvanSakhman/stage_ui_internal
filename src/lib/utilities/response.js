import store from '~su/store'
import ResponseResult from '../components/ResponseResult'

export const handleResponseResult = ({ response, ...props }) => {
  const closable = !response.actions || response.actions.length === 0

  if (!response.success && !response.message) {
    response.message = 'Something went wrong.'
  }

  store.showModal({
    closable,
    maskClosable: closable,
    width: '50%',
    children: <ResponseResult response={response} {...props} />
  })
}
