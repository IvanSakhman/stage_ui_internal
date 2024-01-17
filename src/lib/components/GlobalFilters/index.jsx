import { Form } from 'antd'
import PropTypes from 'prop-types'

import Button from '~su/components/Button'
import { Grid } from '~su/components/Grid'

import formUtils from '~su/utilities/form'
import { useTranslation, withScopedTranslations } from '~su/utilities/i18n'
import object from '~su/utilities/object'

import FiltersInModal from './FiltersInModal'
import { StyledFieldsList } from './index.styled'

import { buildFiltersSchemas, readAppliedFilters, normalizeValuesForSubmit, buildFieldsConfig } from './utilities'

const { useBreakpoint } = Grid

const GlobalFilters = ({ applyFilters, filtersSchema, urlParams, globalFiltersOptions, dataKey }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const currentBreakpoints = useBreakpoint()
  const filtersInForm = Form.useWatch([], { form: form, preserve: true })

  if (object.isEmpty(filtersSchema.properties)) {
    return
  }

  const { inlineFiltersSchema, modalFiltersSchema } = buildFiltersSchemas(
    globalFiltersOptions,
    filtersSchema,
    currentBreakpoints
  )

  const submitFilters = () => {
    const values = form.getFieldsValue(true)
    const { normalizedValues, sorter } = normalizeValuesForSubmit(values)

    applyFilters(normalizedValues, sorter)
  }

  const onlyInModal = object.isEmpty(inlineFiltersSchema.properties)

  const renderInlineFilters = () => {
    return (
      <>
        <StyledFieldsList
          fields={formUtils.buildFields(
            inlineFiltersSchema,
            buildFieldsConfig(inlineFiltersSchema.properties, globalFiltersOptions),
            null,
            t
          )}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('submit', 'Apply')}
          </Button>
        </Form.Item>
      </>
    )
  }

  return (
    <Form
      name={`${dataKey}-global-filters-form`}
      onFinish={submitFilters}
      form={form}
      layout="inline"
      initialValues={readAppliedFilters(filtersSchema.properties, urlParams)}
    >
      <FiltersInModal
        globalFiltersOptions={globalFiltersOptions}
        modalFiltersSchema={modalFiltersSchema}
        filtersInForm={filtersInForm}
        onOk={onlyInModal ? form.submit : null}
      />

      {onlyInModal ? null : renderInlineFilters()}
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
