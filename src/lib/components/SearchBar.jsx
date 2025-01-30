import { useState, useEffect, useMemo } from 'react'
import { Select } from 'antd'
import Fuse from 'fuse.js'
import debounce from 'lodash/debounce'

const { Option } = Select

const SearchBar = ({
  value,
  options,
  fuseOptions,
  fieldKey = null,
  optionsByFieldKey = false,
  valueField = 'value',
  labelField = 'label',
  placeholder = 'Search...',
  onSelect,
  onDropdownVisibleChange,
  loadingFieldKeys = [],
  loadingByFieldKey = false,
  ...rest
}) => {
  const getFilteredOptions = () => (optionsByFieldKey && fieldKey !== null ? options[fieldKey] || [] : options)

  const [searchTerm, setSearchTerm] = useState(value || '')
  const [filteredOptions, setFilteredOptions] = useState(getFilteredOptions())

  const fuse = useMemo(() => new Fuse(getFilteredOptions(), fuseOptions), [options, fuseOptions, fieldKey])

  const isFieldKeyLoading = useMemo(() => {
    return loadingByFieldKey && loadingFieldKeys?.some(({ id }) => id === fieldKey)
  }, [loadingByFieldKey, loadingFieldKeys, fieldKey])

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchTerm(value)
        if (value) {
          const results = fuse.search(value).map((result) => result.item)
          setFilteredOptions(results)
        } else {
          setFilteredOptions(getFilteredOptions())
        }
      }, 300),
    [fuse]
  )

  const handleSearchChange = (value) => {
    handleSearch(value)
  }

  const handleSelect = (selectedValue, option) => {
    setSearchTerm(option[labelField])
    setFilteredOptions(getFilteredOptions())

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
    setFilteredOptions(getFilteredOptions())
  }, [options, fieldKey])

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
      {...(isFieldKeyLoading && {
        loading: true,
        disabled: true
      })}
      {...rest}
    >
      {filteredOptions.map((option) => {
        const value = option[valueField].toString()
        return (
          <Option key={value} value={value}>
            {option[labelField]}
          </Option>
        )
      })}
    </Select>
  )
}

export default SearchBar
