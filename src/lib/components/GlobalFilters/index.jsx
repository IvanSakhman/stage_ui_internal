import { Form } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from '~su/components/Button'
import FieldsList from '~su/components/Form/FieldsList'

import formUtils from '~su/utilities/form'
import { useTranslation, withScopedTranslations } from '~su/utilities/i18n'
import object from '~su/utilities/object'

import { pickAndReorderFilters, readAppliedFilters, normalizeValuesForSubmit, buildFieldsConfig } from './utilities'

const StyledFieldsList = styled(FieldsList)`
  .ant-form-item-control .ant-select {
    min-width: 180px;
  }
`

const GlobalFilters = ({ applyFilters, filtersSchema, urlParams, globalFiltersOptions, dataKey }) => {
  const { t } = useTranslation()

  if (object.isEmpty(filtersSchema.properties)) {
    return
  }

  const displayableFilters = Object.keys(globalFiltersOptions).map((filterName) =>
    filterName === 'order' ? filterName : `by_${filterName}`
  )

  filtersSchema.properties = pickAndReorderFilters(filtersSchema.properties, displayableFilters)

  const submitFilters = (values) => {
    const { normalizedValues, sorter } = normalizeValuesForSubmit(values)

    applyFilters(normalizedValues, sorter)
  }

  return (
    <Form
      name={`${dataKey}-global-filters-form`}
      layout="inline"
      onFinish={submitFilters}
      initialValues={readAppliedFilters(filtersSchema.properties, urlParams)}
    >
      <StyledFieldsList
        fields={formUtils.buildFields(filtersSchema, buildFieldsConfig(filtersSchema.properties), null, t)}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('submit', 'Apply')}
        </Button>
      </Form.Item>
    </Form>
  )
}

GlobalFilters.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  filtersSchema: PropTypes.shape({
    properties: PropTypes.shape({
      enum: PropTypes.array,
      type: PropTypes.string
    }).isRequired
  }).isRequired,
  urlParams: PropTypes.instanceOf(URLSearchParams).isRequired,
  globalFiltersOptions: PropTypes.object,
  dataKey: PropTypes.string
}

export default withScopedTranslations(GlobalFilters, 'global_filters')
