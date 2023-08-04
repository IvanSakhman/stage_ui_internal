import { DatabaseOutlined } from '@ant-design/icons'
import { Space, Row } from 'antd'

import Button from '~su/components/Button'
import Select from '~su/components/Select'
import Field from '~su/components/Form/Field'

import { useEditorStates, useResource } from '../../../store'

import FormatQueryButton from '../Controls/FormatQueryButton'
import ToggleAutoCompleteButton from '../Controls/ToggleAutoCompleteButton'
import ShortcutsButton from '../Controls/ShortcutsButton'

const EditorTopBar = ({ editor, onReset, onFormat, availableEngines, openShortcuts }) => {
  const { hasUnsavedChanges } = useEditorStates()
  const { id } = useResource()

  const resetButton = (
    <Button
      onClick={onReset}
      danger
      disabled={!hasUnsavedChanges}
      popconfirm={{ title: 'Are you sure to reset this query? All changed will be lost.', placement: 'bottomRight' }}
    >
      Discard Changes
    </Button>
  )

  // there will be only one option of engine, taken from config. So this field is hidden for now
  const _engineSelect = (
    <Field
      style={{ display: 'inline-block' }}
      field={{
        item: {
          name: 'engine',
          label: false,
          style: { margin: 0, minWidth: '300px' },
          initialValue: availableEngines[0].value
        },
        component: <Select options={availableEngines} prefix={<DatabaseOutlined />} />
      }}
    />
  )

  const controls = [
    {
      key: 'format',
      Component: () => <FormatQueryButton onFormat={onFormat} editor={editor} />
    },
    {
      key: 'autocomplete',
      Component: () => <ToggleAutoCompleteButton />
    },
    {
      key: 'shortcuts',
      Component: () => <ShortcutsButton onClick={openShortcuts} />
    },
    {
      key: 'resetQuery',
      Component: () => (id ? resetButton : null)
    }
  ]

  const TopControls = (
    <Space>
      {controls.map(({ key, Component }) => (
        <Component key={key} />
      ))}
    </Space>
  )

  return <Row justify="end">{TopControls}</Row>
}

export default EditorTopBar
