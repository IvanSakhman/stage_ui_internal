import { memo } from 'react'
import PropTypes from 'prop-types'
import { Cascader as AntdCascader } from 'antd'

const Cascader = ({ options, showSearch, ...rest }) => {
  const cascaderSearch = (inputValue, path) => {
    return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
  }

  return <AntdCascader options={options} showSearch={{ filter: showSearch && cascaderSearch }} {...rest} />
}

Cascader.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      children: PropTypes.array,
      disabled: PropTypes.bool
    })
  ),
  showSearch: PropTypes.bool
}

export default memo(Cascader)
