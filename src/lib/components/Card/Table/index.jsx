import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card } from 'antd'

import { withLoader } from '~su/hoc'

import Table from '../../Table'

const CardWithTable = styled(Card)`
  > .ant-card-body {
    padding: ${(props) => (props.loading ? 'default' : '0')};

    .ant-table-wrapper {
      .ant-table:first-child {
        border-top-right-radius: 0;
        border-top-left-radius: 0;

        .ant-table-title {
          padding-left: 24px;
        }

        .ant-table-container {
          > .ant-table-content > table {
            > thead,
            > tbody {
              > tr > :first-child {
                padding-left: 24px;
              }
            }

            > thead > tr:first-child th {
              border-radius: 0;
            }

            > tbody {
              tr.ant-table-expanded-row .ant-descriptions-view table {
                width: 100%;
              }

              > tr.ant-table-row:not(:last-child) {
                > td:first-child {
                  padding-left: 24px;
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                }

                > td:last-child {
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
              }

              > tr.ant-table-row:last-child {
                > td {
                  border-bottom: 0;

                  &:first-child {
                    border-top-left-radius: 0;
                  }

                  &:last-child {
                    border-top-right-radius: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const CardTable = ({ title: titleProp, loading, headStyle, ...tableProps }) => {
  const title = titleProp[0],
    extra = titleProp.slice(1)

  const ExtendedCardWithTable = withLoader(CardWithTable, {
    embeddedMode: true,
    preventLoadingFlagsPassing: true,
    loadingBlock: { size: 'small', showTip: false }
  })

  return (
    <ExtendedCardWithTable
      title={title}
      extra={React.Children.toArray(extra)}
      headStyle={headStyle}
      isLoaded={!loading}
    >
      <Table {...tableProps} />
    </ExtendedCardWithTable>
  )
}

CardTable.propTypes = {
  title: PropTypes.array,
  loading: PropTypes.bool,
  headStyle: PropTypes.object
}

export default CardTable
