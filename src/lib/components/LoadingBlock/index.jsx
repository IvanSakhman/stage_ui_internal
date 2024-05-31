import { Result, Spin } from 'antd'
import PropTypes from 'prop-types'

const LoadingBlock = ({ size, spinning, tip, showTip, children, fullscreen = false }) => {
  tip ||= showTip ? 'Loading...' : null

  return children || fullscreen ? (
    <Spin tip={tip} size={size} spinning={spinning} fullscreen={fullscreen}>
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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  fullscreen: PropTypes.bool,
  tip: PropTypes.node
}

export default LoadingBlock
