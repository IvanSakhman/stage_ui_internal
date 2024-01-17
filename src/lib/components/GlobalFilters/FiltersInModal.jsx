import PropTypes from 'prop-types'
import { FilterOutlined, FilterFilled } from '@ant-design/icons'

import Button from '~su/components/Button'
import Modal from '~su/components/Modal'

import formUtils from '~su/utilities/form'
import object from '~su/utilities/object'
import { useTranslation, withScopedTranslations } from '~su/utilities/i18n'

import { StyledFieldsListInModal } from './index.styled'
import { buildFieldsConfig } from './utilities'

const FiltersInModal = ({ modalFiltersSchema, filtersInForm, globalFiltersOptions, onOk }) => {
  const { t } = useTranslation()
  const [modal, contextHolder] = Modal.useModal()

  if (object.isEmpty(modalFiltersSchema.properties) || !filtersInForm) {
    return null
  }

  const openFiltersModal = (ev) => {
    ev.preventDefault()

    const fieldsList = formUtils.buildFields(
      modalFiltersSchema,
      buildFieldsConfig(modalFiltersSchema.properties, globalFiltersOptions, true),
      null,
      t
    )

    modal.info({
      title: t('title', 'Filter'),
      closable: true,
      icon: <FilterOutlined />,
      content: <StyledFieldsListInModal fields={fieldsList} />,
      width: '50vw',
      okText: onOk ? t('apply', 'Apply') : t('ok', 'Ok'),
      onOk
    })
  }

  const renderModalFiltersButton = () => {
    const modalFiltersApplied = Object.keys(modalFiltersSchema.properties).some((modalFilterName) => {
      const modalFilterValue = filtersInForm[modalFilterName]
      return Array.isArray(modalFilterValue) ? modalFilterValue.length > 0 : !!modalFilterValue
    })

    const icon = modalFiltersApplied ? <FilterFilled /> : <FilterOutlined />

    return (
      <Button
        style={{ marginRight: 20 }}
        type="primary-dashed"
        icon={icon}
        onClick={openFiltersModal}
        tooltip={t('button_tooltip', null)}
      >
        {t('button', 'Filter')}
      </Button>
    )
  }

  return (
    <>
      {contextHolder}
      {renderModalFiltersButton()}
    </>
  )
}

FiltersInModal.propTypes = {
  modalFiltersSchema: PropTypes.shape({
    properties: PropTypes.object.isRequired
  }).isRequired,
  filtersInForm: PropTypes.object.isRequired
}

export default withScopedTranslations(FiltersInModal, 'modal')
