import { useState } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete as AntdAutoComplete } from 'antd'
import { object } from '~su/utilities'

import { enumsToValueEnum, buildOptions } from '../Select/utilities'

const AutoComplete = ({ options, enums = [], valueEnum = null, allLabel = null, ...rest }) => {
  const defaultOptions = buildOptions(enumsToValueEnum(enums, allLabel, valueEnum), options).map((option) => {
    return object.isObject(option) ? option : { label: option, value: option }
  })

  const [filteredOptions, setFilteredOptions] = useState(defaultOptions)

  const handleChange = (text) => {
    setFilteredOptions(
      defaultOptions.filter(({ value }) => value.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
    )
  }

  return <AntdAutoComplete options={filteredOptions} onSearch={handleChange} {...rest} />
}

const enumsType = PropTypes.arrayOf(PropTypes.string)

AutoComplete.propTypes = {
  options: PropTypes.oneOfType([
    enumsType,
    PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.string.isRequired })
  ]),
  enums: enumsType,
  valueEnum: PropTypes.arrayOf(PropTypes.array),
  allLabel: PropTypes.string
}

export default AutoComplete
