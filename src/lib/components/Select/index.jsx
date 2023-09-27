import { memo } from 'react'
import PropTypes from 'prop-types'
import { Select as AntdSelect, Space } from 'antd'

// type Props = {
//   currentValue?: string
//   dropdownStyle?: object
//   prefix?: Node | string
// }

const Select = ({
  currentValue,
  dropdownStyle,
  prefix,
  mode,
  enums = [],
  valueEnum = null,
  allLabel = null,
  fixParentNode,
  ...rest
}) => {
  valueEnum ||= enums.map((value) => [value === -1 ? allLabel : value, value])

  const options = valueEnum.map((value) => ({ label: value[0], value: value[1] }))

  if (options.length === 0 && mode === 'tags') {
    // make it appear as pure input w/o dropdown when is tags w/o options
    dropdownStyle = { display: 'none' }
    rest.showSearch = false
    rest.suffixIcon = null
  }

  if (fixParentNode) {
    rest.getPopupContainer = (node) => node.parentNode // ie fixes dropdown open state inside modal
  }

  const selectComponent = (
    <AntdSelect
      value={currentValue}
      popupMatchSelectWidth={false}
      dropdownStyle={{ zIndex: '6', ...dropdownStyle }}
      options={options}
      mode={mode}
      {...rest}
    />
  )

  if (!prefix) {
    return selectComponent
  }

  return (
    <Space.Compact block>
      {prefix}
      {selectComponent}
    </Space.Compact>
  )
}

Select.propTypes = {
  currentValue: PropTypes.string,
  dropdownStyle: PropTypes.object,
  prefix: PropTypes.element,
  mode: PropTypes.string,
  enums: PropTypes.array,
  valueEnum: PropTypes.array,
  allLabel: PropTypes.string,
  fixParentNode: PropTypes.bool
}

export default memo(Select)
