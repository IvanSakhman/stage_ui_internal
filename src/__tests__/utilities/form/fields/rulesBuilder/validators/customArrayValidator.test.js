import customArrayValidator from '~su/utilities/form/fields/rulesBuilder/validators/customArrayValidator'


describe('customArrayValidator', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterAll(() => {
    console.warn.mockRestore()
  })
  
  it('returns a function a validator', () => {
    const validator = customArrayValidator()
    expect(validator).toEqual(expect.any(Function))

    expect(validator()).toEqual({ validator: expect.any(Function) })
  })

  describe('antd compliant validator', () => {
    const rule = { field: 'validated_one' }

    const validate = (items, conditionalRules, rule, value, dependentValues = {}) => {
      return customArrayValidator(items, conditionalRules)({ getFieldValue: (name) => dependentValues[name] }).validator(rule, value)
    }

    describe('when value is not an array', () => {
      it('resolves', async () => {
        await expect(validate({}, null, rule, 'not_an_array')).resolves.toBe(undefined)
      })
    })

    describe('when value is an array', () => {
      const itBehavesLikeCallingConditionalRulesValidator = (items) => {
        const conditionalRules = [
          {
            if: {
              properties: { dependent_one: { const: 11 } },
              required: ['dependent_one']
            },
            then: {
              properties: { validated_one: { min: 1 } }
            },
            else: {
              properties: { validated_one: { max: 0 } }
            }
          }
        ]

        it('calls conditional rules validator', async () => {
          await expect(
            validate(items, conditionalRules, rule, [], {
              dependent_one: 11
            })
          ).rejects.toBe('validated_one cannot be less than 1 in length')

          await expect(
            validate(items, conditionalRules, rule, ['test'], {
              dependent_one: 10
            })
          ).rejects.toBe('validated_one cannot be greater than 0 in length')
        })

        describe('when there are no conditional rules', () => {
          it('resolves', async () => {
            await expect(validate(items, null, rule, ['in_an_array'])).resolves.toBe(undefined)
          })
        })
      }

      describe('without schema.items', () => {
        it('resolves', async () => {
          await expect(validate(null, null, rule, ['in_an_array'])).resolves.toBe(undefined)
        })

        itBehavesLikeCallingConditionalRulesValidator(null)
      })

      describe('with schema.items', () => {
        describe('when schema.items includes pattern', () => {
          it('validates each item', async () => {
            await expect(
              validate({ pattern: '^validated_one_pattern$' }, null, rule, [
                'validated_one_pattern',
                'almostvalidated_one_pattern'
              ])
            ).rejects.toBe("'almostvalidated_one_pattern' does not match /^validated_one_pattern$/")
          })

          itBehavesLikeCallingConditionalRulesValidator({ pattern: '.*' })
        })

        describe('when schema.items does not include pattern', () => {
          it('resolves', async () => {
            await expect(validate({}, null, rule, ['in_an_array'])).resolves.toBe(undefined)
          })

          itBehavesLikeCallingConditionalRulesValidator({})
        })
      })
    })
  })
})
