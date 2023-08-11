import { Result, Spin } from 'antd'
import PropTypes from 'prop-types'

const LoadingBlock = ({ size, spinning, showTip, children }) => {
  const tip = showTip ? 'Loading...' : null

  return children ? (
    <Spin tip={tip} size={size} spinning={spinning}>
      {children}
    </Spin>
  ) : (
    <Result icon={<Spin size={size} />} title={tip} />
  )
}

LoadingBlock.propTypes = {
  spinning: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  showTip: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default LoadingBlock
