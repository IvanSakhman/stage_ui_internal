import { forwardRef } from 'react'

import Field from '~su/components/Form/Field'

import { handleQuerySelectionChange } from '../../../actions'

import EditorTopBar from '../TopBar'
import SqlEditor from '../SqlEditor'

import { StyledCard } from './index.styled'

const EditorForm = forwardRef(
  ({ onReset, onChange, availableEngines, availableSnippets, onFormat, dimensions }, ref) => {
    const { editorRef } = ref

    return (
      <>
        <StyledCard
          headStyle={{ paddingLeft: 0, paddingRight: 10 }}
          bodyStyle={{ padding: 0, paddingTop: 8 }}
          bordered={false}
          title={
            <EditorTopBar
              onFormat={onFormat}
              onReset={onReset}
              editor={editorRef?.current}
              availableEngines={availableEngines}
              openShortcuts={editorRef?.current?.openShortcuts}
            />
          }
        >
          <Field
            field={{
              item: {
                name: 'queryText',
                label: false,
                style: { margin: 0 },
                rules: [{ required: true }]
              },
              component: (
                <SqlEditor
                  ref={editorRef}
                  onChange={onChange}
                  availableSnippets={availableSnippets}
                  dimensions={{ height: dimensions.height - 125 }}
                  onSelectionChange={handleQuerySelectionChange}
                />
              )
            }}
          />
        </StyledCard>
      </>
    )
  }
)

export default EditorForm
