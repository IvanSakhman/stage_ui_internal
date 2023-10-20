import React, { lazy, Suspense } from 'react'

const Editor = lazy(() => import('./components'))

const DynamicEditor = (props) => (
  <Suspense fallback={null}>
    <Editor {...props} />
  </Suspense>
)

export default DynamicEditor
