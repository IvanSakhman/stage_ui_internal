import { pickAndReorderFilters, readAppliedFilters, normalizeValuesForSubmit, buildFieldsConfig } from '~su/components/GlobalFilters/utilities'

describe('GlobalFilters utilities', () => {
  const filtersProperties = {
    by_array_filter_with_enum: {
      type: 'array',
      items: {
        type: 'string',
        not: { type: 'null' },
        enum: [
          'value_one',
          'value_two',
          'value_three'
        ]
      }
    },
    by_array_filter_with_value_enum: {
      type: 'array',
      items: {
        type: 'string',
        not: { type: 'null' },
        valueEnum: [
          ['Value One', 'value_one'],
          ['Value Two', 'value_two'],
          ['Value Three', 'value_three']
        ]
      }
    },
    by_string_filter: { type: 'string', minLength: 1 },
    by_string_filter_with_enum: {
      type: "string",
      minLength: 1,
      enum: ['value_one_string']
    },
    by_boolean_filter: { type: 'boolean', not: { type: 'null' } },
    by_integer_filter: {
      type: 'integer',
      not: { type: 'null' }
    },
    by_integer_filter_with_enums: {
      type: 'integer',
      not: { type: 'null' },
      enum: [11, 10, 7, 4, 1],
      valueEnum: [
        ['eleven', 11],
        ['ten', 10],
        ['seven', 7],
        ['four', 4],
        ['one', 1]
      ]
    }
  }

  describe('pickAndReorderFilters', () => {
    describe('when displayableFilters is empty', () => {
      const displayableFilters = []

      it('returns unmodified filtersProperties', () => {
        expect(pickAndReorderFilters(filtersProperties, displayableFilters)).toEqual(filtersProperties)
      })
    })

    describe('when displayableFilters is not empty', () => {
      const displayableFilters = [
        'by_integer_filter',
        'by_array_filter_with_value_enum',
        'by_boolean_filter'
      ]

      it('returns properties only if filter name is included in the displayableFilters', () => {
        expect(pickAndReorderFilters(filtersProperties, displayableFilters)).toEqual({
          by_integer_filter: filtersProperties.by_integer_filter,
          by_array_filter_with_value_enum: filtersProperties.by_array_filter_with_value_enum,
          by_boolean_filter: filtersProperties.by_boolean_filter
        })
      })
    })
  })

  describe('readAppliedFilters', () => {
    const urlParams = new URLSearchParams(
      {
        by_integer_filter: '10',
        by_array_filter_with_enum: 'value_one,value_two',
        by_boolean_filter: 'false',
        by_string_filter: 'foo'
      }
    )

    it('reads and normalizes the filters', () => {
      expect(readAppliedFilters(filtersProperties, urlParams)).toEqual({
        by_integer_filter: 10,
        by_array_filter_with_enum: ['value_one', 'value_two'],
        by_boolean_filter: false,
        by_string_filter: 'foo'
      })
    })
  })

  describe('normalizeValuesForSubmit', () => {
    describe('without order property submitted', () => {
      const submittedValues = {
        by_string_filter: 'foo',
        by_array_filter_with_value_enum: 'value_one'
      }

      it('returns normalizedValues and undefined sorter', () => {
        const { normalizedValues, sorter } = normalizeValuesForSubmit(submittedValues)

        expect(normalizedValues).toEqual({
          string_filter: 'foo',
          array_filter_with_value_enum: 'value_one'
        })

        expect(sorter).toEqual(undefined)
      })
    })

    describe('with empty order property submitted', () => {
      const submittedValues = {
        by_string_filter: 'foo',
        by_array_filter_with_value_enum: 'value_one',
        order: undefined
      }

      it('returns normalizedValues and empty sorter', () => {
        const { normalizedValues, sorter } = normalizeValuesForSubmit(submittedValues)

        expect(normalizedValues).toEqual({
          string_filter: 'foo',
          array_filter_with_value_enum: 'value_one'
        })

        expect(sorter).toEqual(':')
      })
    })


    describe('with order submitted', () => {
      const submittedValues = {
        by_string_filter: 'foo',
        by_array_filter_with_value_enum: 'value_one',
        order: 'created_at:desc'
      }

      it('returns normalizedValues and sorter object', () => {
        const { normalizedValues, sorter } = normalizeValuesForSubmit(submittedValues)

        expect(normalizedValues).toEqual({
          string_filter: 'foo',
          array_filter_with_value_enum: 'value_one'
        })

        expect(sorter).toEqual(submittedValues.order)
      })
    })
  })

  describe('buildFieldsConfig', () => {
    it('returns extraFieldConfig for each fields item', () => {
      expect(buildFieldsConfig(filtersProperties)).toEqual({
        by_array_filter_with_enum: expect.objectContaining({
          item: { width: 'auto', hasFeedback: false }
        }),
        by_array_filter_with_value_enum: expect.objectContaining({
          item: { width: 'auto', hasFeedback: false }
        }),
        by_string_filter: expect.objectContaining({
          item: { width: 'auto', hasFeedback: false }
        }),
        by_string_filter_with_enum: expect.objectContaining({
          item: { width: 'auto', hasFeedback: false }
        }),
        by_boolean_filter: expect.objectContaining({
          item: { width: 'auto', hasFeedback: false },
          componentProps: {}
        }),
        by_integer_filter: expect.objectContaining({
          item: { width: 'auto', hasFeedback: false }
        }),
        by_integer_filter_with_enums: expect.objectContaining({
          item: { width: 'auto', hasFeedback: false }
        })
      })
    })

    describe('when field type is string', () => {
      it('adds allowClear: true componentProp', () => {
        expect(buildFieldsConfig(filtersProperties)).toEqual(expect.objectContaining({
          by_string_filter: expect.objectContaining({
            componentProps: { allowClear: true }
          })
        }))
      })

      describe('when has enum', () => {
        it('adds fixParentNode: false componentProp', () => {
          expect(buildFieldsConfig(filtersProperties)).toEqual(expect.objectContaining({
            by_string_filter_with_enum: expect.objectContaining({
              componentProps: { allowClear: true, fixParentNode: false }
            })
          }))
        })
      })
    })

    describe('when field type is integer', () => {
      it('adds allowClear: true componentProp', () => {
        expect(buildFieldsConfig(filtersProperties)).toEqual(expect.objectContaining({
          by_integer_filter: expect.objectContaining({
            componentProps: { allowClear: true }
          })
        }))
      })

      describe('when has enum', () => {
        it('adds fixParentNode: false componentProp', () => {
          expect(buildFieldsConfig(filtersProperties)).toEqual(expect.objectContaining({
            by_integer_filter_with_enums: expect.objectContaining({
              componentProps: { allowClear: true, fixParentNode: false }
            })
          }))
        })
      })
    })

    describe('when field type is array', () => {
      it('adds fixParentNode: false componentProp', () => {
        expect(buildFieldsConfig(filtersProperties)).toEqual(expect.objectContaining({
          by_array_filter_with_enum: expect.objectContaining({
            componentProps: { fixParentNode: false }
          }),
          by_array_filter_with_value_enum: expect.objectContaining({
            componentProps: { fixParentNode: false }
          })
        }))
      })
    })
  })
})
