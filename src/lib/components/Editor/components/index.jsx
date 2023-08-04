import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import SplitPane from '~su/components/SplitPane'

import EditorCard from './EditorCard'

import { resetStore } from '../actions'

const Editor = ({
  form,
  availableEngines,
  availableSnippets,
  onChange,
  controlsActions,
  isBordered,
  wizardBackControl,
  getCustomPaneHeightOffset
}) => {
  const DEFAULT_PANE_SIZE = 'calc(100vh - 70px)'
  const [pane1Size, setPane1Size] = useState(DEFAULT_PANE_SIZE)
  const pane = useRef(null)
  // const paneCurrent = pane.current // it defines proper Editor height it is used with stage_styles

  useEffect(() => {
    if (pane.current) {
      const pane1ClientRect = pane.current.pane1.getBoundingClientRect()
      const paneHeight = getCustomPaneHeightOffset ? getCustomPaneHeightOffset(pane1ClientRect) : pane1ClientRect.top

      setPane1Size(`calc(100vh - ${paneHeight}px)`)
    }
  }, [pane.current]) // TODO: fix dependency list and check QP Editor size integrated to datasets

  useEffect(() => {
    return () => {
      resetStore()
    }
  }, [])

  // useEffect(() => {
  //   setResource(resource)
  // }, [resource.sql_version_id])

  return (
    <SplitPane
      ref={pane}
      split="horizontal"
      minSize={50}
      size={pane1Size}
      style={{ overflowY: 'scroll', position: 'relative' }}
    >
      <EditorCard
        form={form}
        availableEngines={availableEngines}
        availableSnippets={availableSnippets}
        onChange={onChange}
        controlsActions={controlsActions}
        isBordered={isBordered}
        wizardBackControl={wizardBackControl}
      />
      <>{/* Container for a checks. To avoid pane error and faster integration */}</>
    </SplitPane>
  )
}

Editor.propTypes = {
  resource: PropTypes.shape({
    isLoading: PropTypes.bool
  }),
  onChange: PropTypes.func,
  controlsActions: PropTypes.shape({
    saveResource: PropTypes.func.isRequired,
    runCheck: PropTypes.func.isRequired
  }),
  isBordered: PropTypes.bool,
  getCustomPaneHeightOffset: PropTypes.func,
  wizardBackControl: PropTypes.oneOfType([PropTypes.bool, PropTypes.element])
}

export default Editor
