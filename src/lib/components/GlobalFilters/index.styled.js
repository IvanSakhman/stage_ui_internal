import styled from 'styled-components'

import FieldsList from '~su/components/Form/FieldsList'

export const StyledFieldsList = styled(FieldsList)`
  .ant-col-auto .ant-form-item-control .ant-select {
    min-width: 180px;
  }

  // apply/submit button
  & + .ant-form-item {
    margin: 0;
  }
`

export const StyledFieldsListInModal = styled(StyledFieldsList)`
  flex-flow: column;

  > .ant-col .ant-row {
    flex-flow: column;

    .ant-form-item-label {
      text-align: start;
    }
  }
`
