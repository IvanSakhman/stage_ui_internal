import React, { useEffect } from 'react'
import { Form, Select, DatePicker, Switch, Checkbox, Segmented } from 'antd'
import styled from 'styled-components'
import Button from '~su/components/Button'
import FieldsList from '~su/components/Form/FieldsList'

import { string } from '~su/utilities'

import { setUpFilters } from '~su/utilities/smartTable/filtering'
const booleanTypes = ['switch', 'checkbox']
const arrayTypes = ['multi_select']

// type Props = {
//   applyFilters: func
//   filters: object
//   urlParams: URLSearchParams
//   globalFiltersOptions: object
//   dataKey: string
// }

const StyledFieldsList = styled(FieldsList)`
  .ant-form-item-control {
    min-width: 180px;

    .ant-picker {
      width: 100%;
    }
  }
`

const GlobalFilters = ({ applyFilters, filters, urlParams, globalFiltersOptions, dataKey }) => {
  const [form] = Form.useForm()
  const submitFilters = (values) => applyFilters(values)
  const filtersProperties = Object.keys(globalFiltersOptions).map((filterName) => {
    return {
      name: filterName.replace('by_', ''),
      type: globalFiltersOptions[filterName],
      ...setUpFilters(filterName, urlParams, filters)
    }
  })

  const SelectFilterComponent = (filterProperties, props = {}) => {
    const options = (filterProperties.filters || []).map((filter) => ({ label: filter.text, value: filter.value }))
    const placeholder = `All ${string.pluralize(string.humanize(filterProperties.name))}`
    props = {
      ...props,
      options,
      allowClear: true,
      placeholder
    }
    return <Select {...props} />
  }

  const SegmentedFilterComponent = (filterProperties) => {
    const optionsFromFilters = (filterProperties.filters || []).map(({ text: label, value }) => ({
      label,
      value
    }))

    const options = [{ label: 'All', value: '' }, ...optionsFromFilters]

    const handleSegmentSelect = (value) => {
      return form.setFieldValue(filterProperties.name, value)
    }

    return <Segmented block options={options} onChange={handleSegmentSelect} />
  }

  const filtersFields = filtersProperties.map((filterProperties) => {
    let component, label
    let valuePropName = 'value'
    switch (filterProperties.type) {
      case 'select': {
        component = SelectFilterComponent(filterProperties)
        break
      }
      case 'multi_select': {
        component = SelectFilterComponent(filterProperties, { mode: 'multiple' })
        break
      }
      case 'switch': {
        component = <Switch />
        valuePropName = 'checked'
        break
      }
      case 'checkbox': {
        label = false
        valuePropName = 'checked'
        component = <Checkbox>{string.humanize(filterProperties.name)}</Checkbox>
        break
      }
      case 'calendar': {
        label = 'Date'
        component = <DatePicker mode="date" />
        break
      }
      case 'segmented': {
        component = SegmentedFilterComponent(filterProperties)
        break
      }
    }

    return {
      item: { name: filterProperties.name, width: 'auto', label, valuePropName },
      component
    }
  })

  const onlyExistingFilters = (filterProperties) => {
    const selectedValues = filterProperties.filteredValue[0]?.split(',') || []
    const possibleValues = filterProperties.filters.map((filter) => filter.value)
    return selectedValues.filter((value) => possibleValues.includes(value))
  }

  const getFilterValue = (filterProperties) => {
    if (booleanTypes.includes(filterProperties.type)) {
      return filterProperties.filteredValue[0] === 'true'
    } else if (arrayTypes.includes(filterProperties.type)) {
      return onlyExistingFilters(filterProperties)
    } else {
      return filterProperties.filteredValue[0] || ''
    }
  }

  const formValues = () => {
    return Object.fromEntries(
      filtersProperties.map((filterProperties) => [[filterProperties.name], getFilterValue(filterProperties)])
    )
  }

  useEffect(() => {
    form.setFieldsValue(formValues())
  }, [filters]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      form={form}
      name={`${dataKey}-global-filters-form`}
      layout="inline"
      onFinish={submitFilters}
      initialValues={formValues()}
    >
      <StyledFieldsList fields={filtersFields} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Apply
        </Button>
      </Form.Item>
    </Form>
  )
}

export default GlobalFilters
