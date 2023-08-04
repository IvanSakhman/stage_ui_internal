import React, { lazy, Suspense } from 'react'

const DynamicIcon = ({ name }) => {
  if (!name) {
    return null
  }

  const Icon = lazy(() => import(`@ant-design/icons/es/icons/${name}.js`))

  return (
    <Suspense fallback={null}>
      <Icon />
    </Suspense>
  )
}

export default DynamicIcon
