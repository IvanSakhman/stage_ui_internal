import { Input, Select, Switch } from '~su/components'
import buildFields, { normalizeEmptyToUndef, testExports } from '~su/utilities/form/fields'

describe('Dynamic Fields building', () => {
  describe('buildFields', () => {
    const schema = {
      properties: {
        field_one: { type: 'string', minLength: 1 },
        field_two: { type: 'string', minLength: 1, enum: ['one', 'two'], default: 'two' }
      },
      required: ['field_two']
    }

    const extraConfigs = {}
    const namePrefix = null

    const t = jest.fn().mockImplementation((key) => { hint: `${key}_test` })

    it('builds fields using the schema', () => {
      expect(buildFields(schema, extraConfigs, namePrefix, t)).toEqual([
        {
          item: {
            name: 'field_one',
            label: 'Field one',
            rules: [{ required: false }, { type: 'string' }, expect.any(Function), { whitespace: true }],
            dependencies: [],
            hasFeedback: true,
            valuePropName: 'value',
            normalize: normalizeEmptyToUndef
          },
          component: <Input />
        },
        {
          item: {
            name: 'field_two',
            label: 'Field two',
            rules: [{ required: true }, { type: 'string' }, expect.any(Function), { whitespace: true }],
            dependencies: [],
            hasFeedback: true,
            valuePropName: 'value',
            initialValue: 'two'
          },
          component: <Select enums={['one', 'two']} fixParentNode={true} showSearch={true} />
        }
      ])
    })

    it('gathers possible field item values from translations', async () => {
      await buildFields(schema, extraConfigs, namePrefix, t)
      expect(t).toHaveBeenCalledWith('field.field_one', { defaultValue: {}, returnObjects: true })
      expect(t).toHaveBeenCalledWith('field.field_two', { defaultValue: {}, returnObjects: true })
    })

    describe('with extraFieldConfigs', () => {
      const Test = () => 'testComponent'
      const extraConfigs = {
        field_one: { item: { width: 2 } },
        field_two: { component: Test }
      }

      it('is able to apply them with respect to the fields tree', () => {
        expect(buildFields(schema, extraConfigs, namePrefix, t)).toEqual([
          {
            item: {
              name: 'field_one',
              label: 'Field one',
              rules: [{ required: false }, { type: 'string' }, expect.any(Function), { whitespace: true }],
              dependencies: [],
              hasFeedback: true,
              valuePropName: 'value',
              normalize: normalizeEmptyToUndef,
              width: 2
            },
            component: <Input />
          },
          {
            item: {
              name: 'field_two',
              label: 'Field two',
              rules: [{ required: true }, { type: 'string' }, expect.any(Function), { whitespace: true }],
              dependencies: [],
              hasFeedback: true,
              valuePropName: 'value',
              initialValue: 'two'
            },
            component: <Test />
          }
        ])
      })

      it('is able to receive item componentProps and apply them', () => {
        const extraConfigs = {
          field_one: { item: { width: 2 }, componentProps: { allowClear: true } },
          field_two: { component: Test }
        }

        expect(buildFields(schema, extraConfigs, namePrefix, t)).toEqual(expect.arrayContaining([
          {
            item: {
              name: 'field_one',
              label: 'Field one',
              rules: [{ required: false }, { type: 'string' }, expect.any(Function), { whitespace: true }],
              dependencies: [],
              hasFeedback: true,
              valuePropName: 'value',
              normalize: normalizeEmptyToUndef,
              width: 2
            },
            component: <Input allowClear />
          }
        ]))
      })
    })

    describe('with nested fieldset', () => {
      const schema = {
        properties: {
          field_one: { type: 'string', minLength: 1 },
          field_two: { type: 'string', minLength: 1, enum: ['one', 'two'] },
          nested: {
            type: 'object',
            properties: {
              field_one: { type: 'string' },
              field_two: { type: 'boolean' }
            },
            required: ['field_one']
          }
        },
        required: ['field_two', 'nested']
      }

      it('is able to handle it', () => {
        expect(buildFields(schema, extraConfigs, namePrefix, t)).toEqual([
          {
            item: {
              name: 'field_one',
              label: 'Field one',
              rules: [{ required: false }, { type: 'string' }, expect.any(Function), { whitespace: true }],
              dependencies: [],
              hasFeedback: true,
              valuePropName: 'value',
              normalize: normalizeEmptyToUndef
            },
            component: <Input />
          },
          {
            item: {
              name: 'field_two',
              label: 'Field two',
              rules: [{ required: true }, { type: 'string' }, expect.any(Function), { whitespace: true }],
              dependencies: [],
              hasFeedback: true,
              valuePropName: 'value'
            },
            component: <Select enums={['one', 'two']} fixParentNode={true} showSearch={true} />
          },
          {
            item: {
              name: ['nested', 'field_one'],
              label: 'Field one',
              rules: [{ required: true }, { type: 'string' }, expect.any(Function)],
              dependencies: [],
              hasFeedback: true,
              valuePropName: 'value'
            },
            component: <Input />
          },
          {
            item: {
              name: ['nested', 'field_two'],
              label: 'Field two',
              rules: [{ required: false }, { type: 'boolean' }, expect.any(Function)],
              dependencies: [],
              hasFeedback: true,
              valuePropName: 'checked',
              normalize: normalizeEmptyToUndef
            },
            component: <Switch />
          }
        ])
      })

      it('gathers possible field item values from translations', async () => {
        await buildFields(schema, extraConfigs, namePrefix, t)
        expect(t).toHaveBeenCalledWith('field.nested.field_one', { defaultValue: {}, returnObjects: true })
        expect(t).toHaveBeenCalledWith('field.nested.field_two', { defaultValue: {}, returnObjects: true })
      })

      describe('with extraFieldConfigs', () => {
        const extraConfigs = {
          nested: {
            field_one: { item: { width: 2 } },
            field_two: { componentProps: { size: 'small' } }
          }
        }

        it('is able to apply them with respect to the fields tree', () => {
          expect(buildFields(schema, extraConfigs, namePrefix, t)).toEqual(expect.arrayContaining([
              {
                item: {
                  name: ['nested', 'field_one'],
                  label: 'Field one',
                  rules: [{ required: true }, { type: 'string' }, expect.any(Function)],
                  dependencies: [],
                  hasFeedback: true,
                  valuePropName: 'value',
                  width: 2
                },
                component: <Input />
              }
            ])
          )
        })

        it('is able to receive item componentProps and apply them', () => {
          expect(buildFields(schema, extraConfigs, namePrefix, t)).toEqual(expect.arrayContaining([
              {
                item: {
                  name: ['nested', 'field_two'],
                  label: 'Field two',
                  rules: [{ required: false }, { type: 'boolean' }, expect.any(Function)],
                  dependencies: [],
                  hasFeedback: true,
                  valuePropName: 'checked',
                  normalize: normalizeEmptyToUndef
                },
                component: <Switch size="small" />
              }
            ])
          )
        })
      })

      describe('when nested fieldset can be anyOf', () => {
        const schema = {
          properties: {
            field_one: { type: 'string', minLength: 1 },
            field_two: { type: 'string', minLength: 1, enum: ['one', 'two'] },
            nested: {
              type: 'object',
              anyOf: [
                {
                  of_type: 'type_one',
                  properties: {
                    type_one_field_one: { type: 'string' },
                    type_one_field_two: { type: 'boolean' }
                  },
                  required: ['type_one_field_one']
                },
                {
                  of_type: 'type_two',
                  properties: {
                    type_two_field_one: { type: 'boolean' }
                  },
                  required: ['type_two_field_one']
                }

              ]
            }
          },
          required: ['field_two', 'nested']
        }

        it('is able to handle it', () => {
          expect(buildFields(schema, extraConfigs, namePrefix, t, 'type_one')).toEqual([
            {
              item: {
                name: 'field_one',
                label: 'Field one',
                rules: [{ required: false }, { type: 'string' }, expect.any(Function), { whitespace: true }],
                dependencies: [],
                hasFeedback: true,
                valuePropName: 'value',
                normalize: normalizeEmptyToUndef
              },
              component: <Input />
            },
            {
              item: {
                name: 'field_two',
                label: 'Field two',
                rules: [{ required: true }, { type: 'string' }, expect.any(Function), { whitespace: true }],
                dependencies: [],
                hasFeedback: true,
                valuePropName: 'value'
              },
              component: <Select enums={['one', 'two']} fixParentNode={true} showSearch={true} />
            },
            {
              item: {
                name: ['nested', 'type_one_field_one'],
                label: 'Type one field one',
                rules: [{ required: true }, { type: 'string' }, expect.any(Function)],
                dependencies: [],
                hasFeedback: true,
                valuePropName: 'value'
              },
              component: <Input />
            },
            {
              item: {
                name: ['nested', 'type_one_field_two'],
                label: 'Type one field two',
                rules: [{ required: false }, { type: 'boolean' }, expect.any(Function)],
                dependencies: [],
                hasFeedback: true,
                valuePropName: 'checked',
                normalize: normalizeEmptyToUndef
              },
              component: <Switch />
            }
          ])
        })

        it('gathers possible field item values from translations', async () => {
          await buildFields(schema, extraConfigs, namePrefix, t, 'type_one')

          expect(t).toHaveBeenCalledWith('field.nested.type_one.type_one_field_one', { defaultValue: {}, returnObjects: true })
          expect(t).toHaveBeenCalledWith('field.nested.type_one.type_one_field_two', { defaultValue: {}, returnObjects: true })
        })

        describe('with extraFieldConfigs', () => {
          const extraConfigs = {
            nested: {
              type_one: {
                type_one_field_one: { item: { width: 2 } }
              }
            }
          }

          it('is able to apply them with respect to the fields tree', () => {
            expect(buildFields(schema, extraConfigs, namePrefix, t, 'type_one')).toEqual(expect.arrayContaining([
                {
                  item: {
                    name: ['nested', 'type_one_field_one'],
                    label: 'Type one field one',
                    rules: [{ required: true }, { type: 'string' }, expect.any(Function)],
                    dependencies: [],
                    hasFeedback: true,
                    valuePropName: 'value',
                    width: 2
                  },
                  component: <Input />
                }
              ])
            )
          })
        })
      })
    })
  })

  describe('buildFieldConfig', () => {
    const { buildFieldConfig } = testExports

    const name = 'field_one'
    const properties = { type: 'string' }
    const required = true
    const conditionalRules = null
    const extraConfig = {}

    it('builds a field config', () => {
      expect(buildFieldConfig([name, properties], required)).toEqual({
        item: {
          name,
          label: 'Field one',
          rules: [{ required }, { type: 'string' }, expect.any(Function)],
          hasFeedback: true,
          valuePropName: 'value',
          dependencies: []
        },
        component: <Input />
      })
    })

    describe('with conditionalRules', () => {
      describe('when conditionalRules are an array', () => {
        const conditionalRules = [
          {
            if: {
              properties: { if_field_one: { const: true }, if_field_two: { const: 'I am set' } }
            },
            then: {
              properties: { [name]: { required: true } }
            }
          },
          {
            if: {
              properties: { different_if_field_one: { const: true }, if_field_two: { const: 'I am set' } }
            },
            then: {},
            else: {
              properties: { [name]: { required: false } }
            }
          },
          {
            if: {
              properties: { different_if_field_two: { const: false } }
            },
            then: {},
            else: {}
          }
        ]

        it('adds list of names of any if.map(properties) as dependencies', () => {
          expect(buildFieldConfig([name, properties], required, conditionalRules)).toEqual(
            expect.objectContaining({
              item: expect.objectContaining({
                name,
                dependencies: [['if_field_one', 'if_field_two', 'different_if_field_one']]
              })
            })
          )
        })

        describe('when no dependencies are found', () => {
          const conditionalRules = [
            {
              if: {
                properties: {
                  if_field_one: { const: true },
                  if_field_two: { const: 'I am set' }
                }
              },
              then: {
                properties: {}
              }
            }
          ]

          it('returns empty array', () => {
            expect(buildFieldConfig([name, properties], required, conditionalRules)).toEqual(
              expect.objectContaining({
                item: expect.objectContaining({ name, dependencies: [] })
              })
            )
          })
        })
      })

      describe('when conditionalRules is an object', () => {
        describe('with conditionalRules.if', () => {
          const conditionalRules = {
            if: {
              properties: {
                if_field_one: { const: true },
                if_field_two: { const: 'I am set' }
              }
            },
            then: {
              properties: { [name]: { required: true } }
            }
          }

          it('adds names of if.map(properties) as dependencies', () => {
            expect(buildFieldConfig([name, properties], required, conditionalRules)).toEqual(
              expect.objectContaining({
                item: expect.objectContaining({ name, dependencies: [['if_field_one', 'if_field_two']] })
              })
            )
          })

          describe('when no dependencies are found', () => {
            const conditionalRules = {
              if: {
                properties: {
                  if_field_one: { const: true },
                  if_field_two: { const: 'I am set' }
                }
              },
              then: {
                properties: {}
              }
            }

            it('returns empty array', () => {
              expect(buildFieldConfig([name, properties], required, conditionalRules)).toEqual(
                expect.objectContaining({
                  item: expect.objectContaining({ name, dependencies: [] })
                })
              )
            })
          })
        })

        describe('without conditionalRules.if', () => {
          it('does not add dependencies', () => {
            expect(buildFieldConfig([name, properties], required, {})).toEqual(
              expect.objectContaining({
                item: expect.objectContaining({ name, dependencies: [] })
              })
            )
          })
        })
      })
    })

    describe('with namePrefix', () => {
      it('sets the item name with it', () => {
        expect(buildFieldConfig([name, properties], required, conditionalRules, extraConfig, 'nested')).toEqual(
          expect.objectContaining({
            item: expect.objectContaining({ name: ['nested', name] })
          })
        )
      })
    })

    describe('when type is boolean', () => {
      it("sets the valuePropName to 'checked'", () => {
        expect(buildFieldConfig([name, { type: 'boolean' }], required)).toEqual(
          expect.objectContaining({
            item: expect.objectContaining({ valuePropName: 'checked' })
          })
        )
      })
    })

    describe('with extraConfig', () => {
      describe('containing item config', () => {
        const extraConfig = {
          item: { width: 10, label: false, hasFeedback: false }
        }

        it('adds the config to item', () => {
          expect(buildFieldConfig([name, { type: 'boolean' }], required, conditionalRules, extraConfig)).toEqual(
            expect.objectContaining({
              item: expect.objectContaining({ width: 10, label: false, hasFeedback: false })
            })
          )
        })
      })

      describe('containing component', () => {
        const Test = () => 'testComponent'

        const extraConfig = {
          component: Test
        }

        it('adds the config to item', () => {
          expect(buildFieldConfig([name, { type: 'boolean' }], required, conditionalRules, extraConfig)).toEqual(
            expect.objectContaining({
              component: <Test />
            })
          )
        })
      })
    })
  })
})
