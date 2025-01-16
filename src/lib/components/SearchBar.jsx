import React, { useState, useEffect, useMemo } from 'react'
import { Select } from 'antd'
import Fuse from 'fuse.js'
import debounce from 'lodash/debounce'

const { Option } = Select

const SearchBar = ({
  value,
  options,
  fuseOptions,
  fieldKey = null,
  valueField = 'value',
  labelField = 'label',
  placeholder = 'Search...',
  onSelect,
  onDropdownVisibleChange,
  ...rest
}) => {
  const [searchTerm, setSearchTerm] = useState(value || '')
  const [filteredOptions, setFilteredOptions] = useState(options)

  const fuse = useMemo(() => new Fuse(options, fuseOptions), [options, fuseOptions])

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchTerm(value)
        if (value) {
          const results = fuse.search(value).map((result) => result.item)
          setFilteredOptions(results)
        } else {
          setFilteredOptions(options)
        }
      }, 300),
    [fuse, options]
  )

  const handleSearchChange = (value) => {
    handleSearch(value)
  }

  const handleSelect = (selectedValue, option) => {
    setSearchTerm(option[labelField])
    setFilteredOptions(options)

    if (onSelect) {
      onSelect(selectedValue, option, fieldKey)
    }
  }

  const handleDropdownVisibleChange = (open) => {
    if (open && fieldKey !== null) {
      onDropdownVisibleChange(fieldKey)
    }
  }

  useEffect(() => {
    if (value !== searchTerm) {
      setSearchTerm(value || '')
    }
  }, [value, searchTerm])

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  useEffect(() => {
    return () => handleSearch.cancel()
  }, [handleSearch])

  return (
    <Select
      showSearch
      placeholder={searchTerm ? null : placeholder}
      value={searchTerm || null}
      onSearch={handleSearchChange}
      onChange={handleSearchChange}
      filterOption={false}
      style={{ width: '100%' }}
      onSelect={handleSelect}
      {...(onDropdownVisibleChange && { onDropdownVisibleChange: handleDropdownVisibleChange })}
      {...rest}
    >
      {filteredOptions.map((option) => (
        <Option key={option[valueField]} value={option[valueField]}>
          {option[labelField]}
        </Option>
      ))}
    </Select>
  )
}

export default SearchBar
