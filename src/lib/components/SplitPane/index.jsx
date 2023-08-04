import { forwardRef } from 'react'
import { StyledSplitPane } from './index.styled'

const SplitPane = forwardRef((props, ref) => {
  return <StyledSplitPane {...props} ref={ref} />
})

export default SplitPane
