import { buildFilters } from '~su/views/DataView/utilities/buildFilters'

describe('buildFilters', () => {
  it('builds the filters', () => {
    const json_schema = {
      properties: {
        filters: {
          properties: {
            by_alert_severity: { valueEnum: [['fatal', 11]] },
            by_creator: { enum: ['user'] }
          }
        }
      }
    }

    const filters = buildFilters(json_schema)

    expect(filters).toEqual({
      by_alert_severity: [ [ 'fatal', 11 ] ],
      by_creator: [ 'user' ]
    })
  })
})
