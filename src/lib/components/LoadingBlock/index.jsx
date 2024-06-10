import { Result, Spin, Flex } from 'antd'
import PropTypes from 'prop-types'

const LoadingBlock = ({ size, spinning, tip, showTip, children, fullscreen = false, brandedFullscreen = false }) => {
  tip ||= showTip ? 'Loading...' : null

  const customizedSpin = <Result icon={<Spin size={size} />} title={tip} />

  if (brandedFullscreen) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        {customizedSpin}
      </Flex>
    )
  }

  return children || fullscreen ? (
    <Spin tip={tip} size={size} spinning={spinning} fullscreen={fullscreen}>
      {children}
    </Spin>
  ) : (
    customizedSpin
  )
}

LoadingBlock.propTypes = {
  spinning: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  showTip: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  fullscreen: PropTypes.bool,
  tip: PropTypes.node,
  brandedFullscreen: PropTypes.bool // the default fullscreen mode styles are overridden by antd
}

export default LoadingBlock
