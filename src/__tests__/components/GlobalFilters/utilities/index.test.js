import { buildFiltersSchemas, pickAndReorderFilters, readAppliedFilters, normalizeValuesForSubmit, buildFieldsConfig } from '~su/components/GlobalFilters/utilities'

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

  const filtersSchema = {
    type: 'object',
    properties: filtersProperties,
    required: []
  }

  describe('buildFiltersSchemas', () => {
    describe('when globalFiltersOptions is empty', () => {
      it('returns all filters in inlineFiltersSchema.properties and empty modalFiltersSchema.properties', () => {
        expect(buildFiltersSchemas({}, filtersSchema)).toEqual({
          inlineFiltersSchema: filtersSchema,
          modalFiltersSchema: { ...filtersSchema, properties: [] }
        })
      })
    })

    describe('when globalFiltersOptions is not empty', () => {
      describe('when filterOptions are empty', () => {
        it('returns filter in inlineFiltersSchema.properties', () => {
          const globalFiltersOptions = {
            integer_filter: {}
          }

          expect(buildFiltersSchemas(globalFiltersOptions, filtersSchema)).toEqual({
            inlineFiltersSchema: {
              ...filtersSchema,
              properties: {
                by_integer_filter: filtersProperties.by_integer_filter
              }
            },
            modalFiltersSchema: {
              ...filtersSchema,
              properties: {}
            }
          })
        })
      })

      describe('when filterOptions specify that filter should be in modal', () => {
        it('returns filter in modalFiltersSchema.properties', () => {
          const globalFiltersOptions = {
            integer_filter: { modal: true }
          }

          expect(buildFiltersSchemas(globalFiltersOptions, filtersSchema)).toEqual({
            inlineFiltersSchema: {
              ...filtersSchema,
              properties: {}
            },
            modalFiltersSchema: {
              ...filtersSchema,
              properties: {
                by_integer_filter: filtersProperties.by_integer_filter
              }
            }
          })
        })
      })

      describe('when filterOptions specify that filter should be inline', () => {
        it('returns filter in inlineFiltersSchema.properties', () => {
          const globalFiltersOptions = {
            integer_filter: { inline: true }
          }

          expect(buildFiltersSchemas(globalFiltersOptions, filtersSchema)).toEqual({
            inlineFiltersSchema: {
              ...filtersSchema,
              properties: {
                by_integer_filter: filtersProperties.by_integer_filter
              }
            },
            modalFiltersSchema: {
              ...filtersSchema,
              properties: {}
            }
          })
        })
      })

      describe('when filterOptions specify filters location using breakpoints', () => {
        const itBehavesLikeDisplayingInline = (globalFiltersOptions, currentBreakpoints) => {
          it('returns filter in inlineFiltersSchema.properties', () => {
            expect(buildFiltersSchemas(globalFiltersOptions, filtersSchema, currentBreakpoints)).toEqual({
              inlineFiltersSchema: {
                ...filtersSchema, properties: { by_integer_filter: filtersProperties.by_integer_filter }
              },
              modalFiltersSchema: { ...filtersSchema, properties: {} }
            })
          })
        }

        const itBehavesLikeDisplayingInModal = (globalFiltersOptions, currentBreakpoints) => {
          it('returns filter in modalFiltersSchema.properties', () => {
            expect(buildFiltersSchemas(globalFiltersOptions, filtersSchema, currentBreakpoints)).toEqual({
              inlineFiltersSchema: { ...filtersSchema, properties: {} },
              modalFiltersSchema: {
                ...filtersSchema, properties: { by_integer_filter: filtersProperties.by_integer_filter }
              }
            })
          })
        }

        describe("with inline=['xl', 'xxl']", () => {
          const globalFiltersOptions = {
            integer_filter: {
              inline: ['xl', 'xxl']
            }
          }

          describe('when screen is xxl', () => {
            const currentBreakpoints = {
              xxl: true, xl: true, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInline(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is xl', () => {
            const currentBreakpoints = {
              xxl: false, xl: true, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInline(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is lg', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is md', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is sm', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: false, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is xs', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: false, sm: false, xs: true,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })
        })

        describe("with modal=['xs', 'sm', 'md', 'lg']", () => {
          const globalFiltersOptions = {
            integer_filter: {
              modal: ['xs', 'sm', 'md', 'lg']
            }
          }

          describe('when screen is xxl', () => {
            const currentBreakpoints = {
              xxl: true, xl: true, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInline(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is xl', () => {
            const currentBreakpoints = {
              xxl: false, xl: true, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInline(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is lg', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is md', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is sm', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: false, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is xs', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: false, sm: false, xs: true,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })
        })

        describe("with inline=['xxl'] and modal=['xs', 'sm', 'md', 'lg', 'xl]", () => {
          const globalFiltersOptions = {
            integer_filter: {
              inline: ['xxl'],
              modal: ['xs', 'sm', 'md', 'lg', 'xl']
            }
          }

          describe('when screen is xxl', () => {
            const currentBreakpoints = {
              xxl: true, xl: true, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInline(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is xl', () => {
            const currentBreakpoints = {
              xxl: false, xl: true, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is lg', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: true, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is md', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: true, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is sm', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: false, sm: true, xs: false,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })

          describe('when screen is xs', () => {
            const currentBreakpoints = {
              xxl: false, xl: false, lg: false, md: false, sm: false, xs: true,
            }

            itBehavesLikeDisplayingInModal(globalFiltersOptions, currentBreakpoints)
          })
        })
      })
    })
  })

  describe('pickAndReorderFilters', () => {
    describe('when displayableFilters is empty', () => {
      const displayableFilters = []

      it('returns empty filtersProperties', () => {
        expect(pickAndReorderFilters(filtersProperties, displayableFilters)).toEqual({})
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
