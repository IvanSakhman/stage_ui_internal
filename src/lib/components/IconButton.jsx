import { forwardRef } from 'react'

import Button from './Button'

const IconButton = forwardRef((props, ref) => {
  if (!props.icon) {
    return null
  }

  return <Button ref={ref} {...props} iconOnly />
})

export default IconButton
