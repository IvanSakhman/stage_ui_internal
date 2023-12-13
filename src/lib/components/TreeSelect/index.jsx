import React from 'react'
import PropTypes from 'prop-types'
import { StyledTreeSelect } from './index.styled'

const TreeSelect = (props) => {
  return <StyledTreeSelect {...props} />
}

TreeSelect.propTypes = {
  treeData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        disabled: PropTypes.bool,
        halfChecked: PropTypes.bool
      })
    ])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  treeCheckable: PropTypes.bool,
  treeCheckStrictly: PropTypes.bool,
  showCheckedStrategy: PropTypes.string,
  placeholder: PropTypes.string
}

export default TreeSelect
