import { EMPTY } from '~su/constants'
import { date, object } from '~su/utilities'
import { buildColumnTitle } from '~su/utilities/table/buildColumns'

import StateTag from '~su/components/StateTag'
import TagsList from '~su/components/TagsList'

const renderForValueType = ({ valueType, valueRenderConfig, valueEnum }) => {
  const VALUE_TYPE_RENDERER = {
    state: (state) => <StateTag state={state} configuration={valueRenderConfig} />,
    tags: (tags) => <TagsList tags={tags} />,
    dateTime: (dateTime) => date.format(dateTime),
    duration: (duration) => date.formatDuration(duration)
  }

  return (value, record, _index) => {
    if (value === undefined || value === null || (Array.isArray(value) && !value.length)) {
      return EMPTY
    }

    const renderer = VALUE_TYPE_RENDERER[valueType]

    if (!renderer) {
      return valueEnum ? valueEnum[value] : value
    }

    return renderer(value)
  }
}

export default (record, columns) => {
  return columns.map((column) => {
    const { key, span, contentStyle, labelStyle } = column
    const label = buildColumnTitle(column, key),
      value = renderForValueType(column)(object.findNested(record, key))

    return { span, contentStyle, labelStyle, label, value }
  })
}
