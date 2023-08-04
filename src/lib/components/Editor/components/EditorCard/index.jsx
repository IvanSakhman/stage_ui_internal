import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'

import { Spin } from 'antd'

import { setChangedState } from '../../actions'
import { useResource, useEditorStates, useSelectedText } from '../../store'

import EditorForm from './Form'

import { StyledCard } from './index.styled'
import { resetChangedState, setEditorState } from '../../actions'
import { formatSQL } from '../../utilities/formatSQL'

const EditorCard = ({ form, onChange, availableEngines, availableSnippets, isBordered }) => {
  const editorRef = useRef(null)
  const selectedText = useSelectedText()
  const { isLoading: isLoadingResource, ...resource } = useResource()
  const { isLoadingSnippets } = useEditorStates()
  const [dimensions, setDimensions] = useState({ height: 300 })

  const setInitialFormState = () => {
    form.current.setFieldsValue({ ...resource, engine: availableEngines[0].value })
  }

  useEffect(() => {
    if (form?.current && (resource.queryText || resource.engine)) {
      setInitialFormState()
    }
  }, [resource.queryText, resource.engine])

  const handleChange = (values) => {
    if (onChange) {
      onChange(values, true)
    }
    setChangedState()
  }

  const handleReset = () => {
    resetChangedState()
    setInitialFormState()
    if (onChange) {
      onChange(form?.current?.getFieldsValue(true), false)
    }
  }

  const handleFormat = () => {
    const values = form?.current?.getFieldsValue(true)
    const formattedQueryText = formatSQL(values.queryText, selectedText)

    form?.current?.setFieldsValue({ ...values, queryText: formattedQueryText })
    setEditorState('hasUnsavedChanges', true)
  }

  return (
    <Measure bounds onResize={(contentRect) => setDimensions(contentRect.bounds)}>
      {({ measureRef }) => (
        <div ref={measureRef} style={{ width: '100%', height: '100%' }}>
          <Spin spinning={isLoadingResource || isLoadingSnippets}>
            <StyledCard bordered={isBordered}>
              <EditorForm
                availableEngines={availableEngines}
                availableSnippets={availableSnippets}
                ref={{ editorRef, formRef: form }}
                onFormat={handleFormat}
                onReset={handleReset}
                resource={resource}
                onChange={handleChange}
                dimensions={dimensions}
              />
            </StyledCard>
          </Spin>
        </div>
      )}
    </Measure>
  )
}

EditorCard.propTypes = {
  onChange: PropTypes.func,
  isBordered: PropTypes.bool,
  controlsActions: PropTypes.shape({
    saveResource: PropTypes.func.isRequired
  })
}

export default EditorCard
