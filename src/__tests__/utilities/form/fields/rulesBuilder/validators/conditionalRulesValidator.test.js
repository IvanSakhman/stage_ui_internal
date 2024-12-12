import conditionalRulesValidator from '~su/utilities/form/fields/rulesBuilder/validators/conditionalRulesValidator'

describe('conditionalRulesValidator', () => {
  it('returns a function requiring formInstance and returning a validator', () => {
    const validator = conditionalRulesValidator()
    expect(validator).toEqual(expect.any(Function))

    expect(validator).toThrow("Cannot read properties of undefined (reading 'getFieldValue')")

    expect(validator({ getFieldValue: jest.fn() })).toEqual({ validator: expect.any(Function) })
  })

  describe('antd compliant validator', () => {
    const validate = (conditionalRules, rule, value, dependentValues = {}) => {
      return conditionalRulesValidator(conditionalRules)({ getFieldValue: (name) => dependentValues[name] }).validator(rule, value)
    }

    describe('without any conditionalRules', () => {
      it('resolves', async () => {
        await expect(validate()).resolves.toBe(undefined)
        await expect(validate(null)).resolves.toBe(undefined)
        await expect(validate([])).resolves.toBe(undefined)
        await expect(validate({})).resolves.toBe(undefined)
      })
    })

    describe('with any conditionalRules', () => {
      const conditionOneDependentOneValidated = {
        if: {
          properties: { dependent_one: { const: 11 } },
          required: ['dependent_one']
        },
        then: {
          properties: { validated_one: { pattern: /validated_one_pattern/ } }
        }
      }
      const rule = { field: 'validated_one' }

      beforeAll(() => {
        console.warn = jest.fn()
      })

      describe('when conditionalRules is an object', () => {
        it('is able to handle it', () => {
          expect(() => validate(conditionOneDependentOneValidated, rule)).not.toThrow()
        })

        describe('when validatedField is not in truthy nor falsey requirements', () => {
          it('resolves', async () => {
            await expect(validate(conditionOneDependentOneValidated, { field: 'not_validated' })).resolves.toBe(undefined)
          })
        })

        describe('case of one dependent and one validated field', () => {
          describe('when dependent value is missing', () => {
            describe('when it is required', () => {
              it('resolves', async () => {
                await expect(validate(conditionOneDependentOneValidated, rule, 'would not match the pattern')).resolves.toBe(undefined)
              })
            })

            describe('when it is not required', () => {
              it('resolves', async () => {
                // NOTE: not marking the dependent field as required makes it a default, might be important for multiple dependent fields
                const test = {
                  if: {
                    properties: conditionOneDependentOneValidated.if.properties
                  },
                  then: conditionOneDependentOneValidated.then
                }

                await expect(validate(test, rule, 'would not match the pattern')).resolves.toBe(undefined)
              })
            })
          })

          const itBehavesLikeApplyingTheConditionAndResolving = (
            conditionalRules,
            rule,
            value,
            dependentValues = {}
          ) => {
            it('it applies the condition and resolves', async () => {
              await expect(validate(conditionalRules, rule, value, dependentValues)).resolves.toBe(undefined)
            })
          }

          const itBehavesLikeApplyingTheConditionAndRejecting = (
            conditionalRules,
            rule,
            value,
            dependentValues = {},
            expectedError
          ) => {
            it('it applies the condition and rejects', async () => {
              await expect(validate(conditionalRules, rule, value, dependentValues)).rejects.toBe(expectedError)
            })
          }

          describe('when dependent value is present', () => {
            describe('when the if condition uses const', () => {
              describe('when it matches the condition const', () => {
                const dependentValues = { dependent_one: 11 }

                describe('when validated field value satisfies the truthy condition', () => {
                  itBehavesLikeApplyingTheConditionAndResolving(
                    conditionOneDependentOneValidated,
                    rule,
                    'validated_one_pattern',
                    dependentValues
                  )
                })

                describe('when validated field value does not satisfy the truthy condition', () => {
                  itBehavesLikeApplyingTheConditionAndRejecting(
                    conditionOneDependentOneValidated,
                    rule,
                    'will not match the pattern',
                    dependentValues,
                    'validated_one value will not match the pattern does not match pattern /validated_one_pattern/'
                  )
                })
              })

              describe('when it does not match the condition const', () => {
                const dependentValues = { dependent_one: 10 }

                describe('when there is falsey condition', () => {
                  const extendedConditionOne = {
                    ...conditionOneDependentOneValidated,
                    else: {
                      properties: { validated_one: { max: 0 } }
                    }
                  }

                  describe('when validated field value satisfies the falsey condition', () => {
                    itBehavesLikeApplyingTheConditionAndResolving(extendedConditionOne, rule, '', dependentValues)
                  })

                  describe('when validated field value does not satisfy the falsey condition', () => {
                    itBehavesLikeApplyingTheConditionAndRejecting(
                      extendedConditionOne,
                      rule,
                      'validated_one_pattern',
                      dependentValues,
                      'validated_one cannot be longer than 0 characters'
                    )
                  })
                })

                describe('when there is no falsey condition', () => {
                  it('resolves (does not apply the rules)', async () => {
                    await expect(
                      validate(conditionOneDependentOneValidated, rule, 'would not match the pattern', dependentValues)
                    ).resolves.toBe(undefined)
                  })
                })
              })
            })

            describe('when the if condition uses pattern', () => {
              const conditionOneDependentOneUsingPattern = {
                ...conditionOneDependentOneValidated,
                if: {
                  ...conditionOneDependentOneValidated.if,
                  properties: { dependent_one: { pattern: '^match_dependent_one$' } }
                }
              }

              describe('when it matches the condition pattern', () => {
                const dependentValues = { dependent_one: 'match_dependent_one' }

                describe('when validated field value satisfies the truthy condition', () => {
                  itBehavesLikeApplyingTheConditionAndResolving(
                    conditionOneDependentOneUsingPattern,
                    rule,
                    'validated_one_pattern',
                    dependentValues
                  )
                })

                describe('when validated field value does not satisfy the truthy condition', () => {
                  itBehavesLikeApplyingTheConditionAndRejecting(
                    conditionOneDependentOneUsingPattern,
                    rule,
                    'will not match the pattern',
                    dependentValues,
                    'validated_one value will not match the pattern does not match pattern /validated_one_pattern/'
                  )
                })
              })

              describe('when it does not match the condition const', () => {
                const dependentValues = { dependent_one: 10 }

                describe('when there is falsey condition', () => {
                  const extendedConditionOneUsingPattern = {
                    ...conditionOneDependentOneUsingPattern,
                    else: {
                      properties: { validated_one: { max: 0 } }
                    }
                  }

                  describe('when validated field value satisfies the falsey condition', () => {
                    itBehavesLikeApplyingTheConditionAndResolving(
                      extendedConditionOneUsingPattern,
                      rule,
                      '',
                      dependentValues
                    )
                  })

                  describe('when validated field value does not satisfy the falsey condition', () => {
                    itBehavesLikeApplyingTheConditionAndRejecting(
                      extendedConditionOneUsingPattern,
                      rule,
                      'validated_one_pattern',
                      dependentValues,
                      'validated_one cannot be longer than 0 characters'
                    )
                  })
                })

                describe('when there is no falsey condition', () => {
                  it('resolves (does not apply the rules)', async () => {
                    await expect(
                      validate(conditionOneDependentOneUsingPattern, rule, 'would not match the pattern', dependentValues)
                    ).resolves.toBe(undefined)
                  })
                })
              })
            })
          })
        })

        describe('case of one dependent and multiple validated fields', () => {
          // TODO: code should handle it, but might need few tweakes
        })

        describe('case of multiple dependents and one validated field', () => {
          // TODO: code should handle it, but might need few tweakes
        })

        describe('case of multiple dependents and multiple validated fields', () => {
          // TODO: code should handle it, but might need few tweakes
        })
      })

      describe('when conditionalRules is an array', () => {
        const conditionalRules = [
          conditionOneDependentOneValidated,
          {
            if: {
              properties: { other_rule_dependent: { const: true } },
              required: ['other_rule_dependent']
            },
            then: {
              properties: { validated_one: { pattern: /other_rule_validated_one/ } }
            }
          }
        ]

        it('is able to handle it', () => {
          expect(() => validate(conditionalRules, rule)).not.toThrow()
        })

        describe('when there is more than one rule', () => {
          it('is able to handle it', () => {
            expect(() => validate(conditionalRules, rule)).not.toThrow()
          })

          it('logs warn', () => {
            validate(conditionalRules, rule)

            expect(console.warn).toHaveBeenCalledWith(
              'conditionalRulesValidator: multiple conditionalRules are not yet supported'
            )
          })

          it('tests the first rule', async () => {
            // tested
            await expect(
              validate(conditionalRules, rule, 'will not match the pattern', {
                dependent_one: 11,
                other_rule_dependent: true
              })
            ).rejects.toBe(
              'validated_one value will not match the pattern does not match pattern /validated_one_pattern/'
            )

            // not tested, lack of support for multiple rules
            await expect(
              validate(conditionalRules, rule, 'will not match the pattern', {
                dependent_one: 10,
                other_rule_dependent: true
              })
            ).resolves.toBe(undefined)
          })
        })
      })
    })
  })
})
