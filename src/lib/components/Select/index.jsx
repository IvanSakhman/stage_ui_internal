import { memo } from 'react'
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
  enums = [],
  valueEnum = null,
  allLabel = null,
  fixParentNode,
  ...rest
}) => {
  valueEnum ||= enums.map((value) => [value === -1 ? allLabel : value, value])

  const options = valueEnum.map((value) => ({ label: value[0], value: value[1] }))

  if (fixParentNode) {
    rest.getPopupContainer = (node) => node.parentNode // ie fixes dropdown open state inside modal
  }

  const selectComponent = (
    <AntdSelect
      value={currentValue}
      popupMatchSelectWidth={false}
      dropdownStyle={{ zIndex: '6', ...dropdownStyle }}
      options={options}
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

export default memo(Select)
