import { useState } from 'react'
import { AutoComplete as AntdAutoComplete } from 'antd'

const AutoComplete = ({ options, error, className, ...rest }) => {
  const classNames = []

  if (error) {
    classNames.push('ant-form-item-has-error')
  }

  if (className) {
    classNames.push(className)
  }

  const defaultOptions = options.map((value) => ({ value }))
  const [filteredOptions, setFilteredOptions] = useState(defaultOptions)

  const handleChange = (text) => {
    setFilteredOptions(
      defaultOptions.filter(({ value }) => value.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
    )
  }

  return <AntdAutoComplete options={filteredOptions} onSearch={handleChange} {...rest} />
}

export default AutoComplete
