import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons'

import ActionButtons from '../ActionButtons'
import ErrorsList from '../ErrorsList'

import { StyledResult } from './index.styled'

const ResponseResult = ({ response, handlers, isLoading, loadingTitle = 'Loading', ...rest }) => {
  const { success, errors, message, actions, data } = response
  const status = success ? 'success' : 'error'

  const resultParams = isLoading
    ? {
        icon: <LoadingOutlined />,
        title: loadingTitle
      }
    : {
        status,
        title: message,
        subTitle: errors && <ErrorsList errors={errors} />,
        extra: <ActionButtons actions={actions?.modal} record={data} functionHandlers={handlers} />
      }

  return <StyledResult {...resultParams} {...rest} />
}

ResponseResult.propTypes = {
  response: PropTypes.object.isRequired,
  handlers: PropTypes.object,
  isLoading: PropTypes.bool,
  loadingTitle: PropTypes.string
}

export default ResponseResult
