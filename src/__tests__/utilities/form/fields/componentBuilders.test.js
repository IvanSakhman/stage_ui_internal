import { AutoComplete, Input, Select, Switch } from '~su/components'

jest.mock('~su/utilities/renderBasedOnType', () => jest.fn().mockImplementation((_type, value) => value))
import renderBasedOnType from '~su/utilities/renderBasedOnType'

import buildComponent, { testExports } from '~su/utilities/form/fields/componentBuilders'

describe('Dynamic Fields componentBuilders', () => {
  describe('buildComponentForReadOnly', () => {
    const { buildComponentForReadOnly } = testExports

    it('returns a function that takes the value', () => {
      const readOnly = buildComponentForReadOnly('string', {})
      expect(readOnly({ value: 'value' })).toEqual('value')
    })

    it('calls renderBasedOnType', () => {
      const readOnly = buildComponentForReadOnly('string', {})

      readOnly({ value: 'value' })

      expect(renderBasedOnType).toHaveBeenCalledWith('string', 'value')
    })

    describe('when there is valuEnum for this field', () => {
      it('makes the readOnly function translate the value using valueEnum', () => {
        const readOnly = buildComponentForReadOnly('string', { valueEnum: [['Test', 'value']] })
        expect(readOnly({ value: 'value' })).toEqual('Test')
      })
    })

    describe('when type is boolean', () => {
      it('is able to resolve the value just fine', () => {
        const readOnly = buildComponentForReadOnly('boolean', {})
        expect(readOnly({ checked: true })).toEqual(true)
      })
    })
  })

  describe('buildComponentForArrayType', () => {
    const { buildComponentForArrayType } = testExports

    describe('when type is string', () => {
      it('returns a tags Select', () => {
        expect(buildComponentForArrayType({ type: 'string' })).toEqual({
          component: Select, props: { mode: 'tags', fixParentNode: true }
        })
      })

      it('passes enum and valueEnum to Select', () => {
        expect(
          buildComponentForArrayType({
            type: 'string',
            enum: ['1', '2'],
            valueEnum: [
              ['One', '1'],
              ['Two', '2']
            ]
          })
        ).toEqual({
          component: Select,
          props: {
            mode: "tags",
            enums: ['1', '2'],
            valueEnum: [
              ['One', '1'],
              ['Two', '2']
            ],
            fixParentNode: true
          }
        })
      })
    })

    describe('when type is integer', () => {
      it('returns a tags Select', () => {
        expect(buildComponentForArrayType({ type: 'integer' })).toEqual({
          component: Select, props: { mode: 'tags', fixParentNode: true }
        })
      })

      it('passes enum and valueEnum to Select', () => {
        expect(
          buildComponentForArrayType({
            type: 'integer',
            enum: ['1', '2'],
            valueEnum: [
              ['One', '1'],
              ['Two', '2']
            ]
          })
        ).toEqual({
          component: Select,
          props: {
            mode: "tags",
            enums: ['1', '2'],
            valueEnum: [
              ['One', '1'],
              ['Two', '2']
            ],
            fixParentNode: true
          }
        })
      })
    })

    describe('by default', () => {
      it('returns an Input', () => {
        expect(buildComponentForArrayType({ type: 'boolean' })).toEqual({ component: Input })
      })
    })
  })

  describe('buildComponentForString', () => {
    const { buildComponentForString } = testExports

    describe('with known enums', () => {
      describe('with userInputAllowed', () => {
        it('returns an AutoComplete', () => {
          expect(
            buildComponentForString({
              enum: ['1', '2'],
              userInputAllowed: true
            })
          ).toEqual({ component: AutoComplete, props: { enums: ['1', '2'] } })
        })
      })

      describe('without userInputAllowed', () => {
        it('returns a searchable Select', () => {
          expect(
            buildComponentForString({
              enum: ['1', '2']
            })
          ).toEqual({ component: Select, props: { enums: ['1', '2'], fixParentNode: true, showSearch: true } })
        })
      })
    })

    describe('with known valueEnums', () => {
      describe('with userInputAllowed', () => {
        it('returns an AutoComplete', () => {
          expect(
            buildComponentForString({
              valueEnum: [
                ['One', '1'],
                ['Two', '2']
              ],
              userInputAllowed: true
            })
          ).toEqual({
            component: AutoComplete,
            props: {
              valueEnum: [
                ['One', '1'],
                ['Two', '2']
              ]
            }
          })
        })
      })

      describe('without userInputAllowed', () => {
        it('returns a searchable Select', () => {
          expect(
            buildComponentForString({
              valueEnum: [
                ['One', '1'],
                ['Two', '2']
              ]
            })
          ).toEqual({
            component: Select,
            props: {
              valueEnum: [
                ['One', '1'],
                ['Two', '2']
              ],
              fixParentNode: true,
              showSearch: true
            }
          })
        })
      })
    })

    describe('without known enums nor valueEnums', () => {
      it('returns an Input', () => {
        expect(buildComponentForString({})).toEqual({ component: Input })
      })
    })
  })

  describe('buildComponentForInteger', () => {
    const { buildComponentForInteger } = testExports

    describe('with known enums', () => {
      it('returns a Select', () => {
        expect(
          buildComponentForInteger({
            enum: [1, 2]
          })
        ).toEqual({ component: Select, props: { enums: [1, 2], fixParentNode: true } })
      })
    })

    describe('with known valueEnums', () => {
      it('returns a Select', () => {
        expect(
          buildComponentForInteger({
            valueEnum: [
              ['One', 1],
              ['Two', 2]
            ]
          })
        ).toEqual({
          component: Select,
          props: {
            valueEnum: [
              ['One', 1],
              ['Two', 2]
            ],
            fixParentNode: true
          }
        })
      })
    })

    describe('without known enums nor valueEnums', () => {
      it('returns an InputNumber', () => {
        expect(buildComponentForInteger({})).toEqual({ component: Input.Number })
      })
    })
  })

  describe('buildComponent', () => {
    const itBehavesLikeExtendingComponentProps = (properties, componentProps) => {
      describe('when called with componentProps', () => {
        it("extends component's props", () => {
          const { props } = buildComponent(properties, componentProps)

          expect(props).toEqual(expect.objectContaining(componentProps))
        })
      })
    }

    describe('when type value is an array', () => {
      const properties = { type: ['null', 'integer'] }

      it('uses last item of that array to determine component type', () => {
        const { component: Component, props } = testExports.buildComponentForInteger({})

        expect(buildComponent(properties)).toEqual(<Component {...props} />)
      })

      itBehavesLikeExtendingComponentProps(properties, { size: 'small' })
    })

    describe('when type is array', () => {
      const items = { type: 'string' }
      const properties = { type: 'array', items }

      it('returns component for Array type', () => {
        const { component: Component, props } = testExports.buildComponentForArrayType(items)

        expect(buildComponent(properties)).toEqual(<Component {...props} />)
      })

      itBehavesLikeExtendingComponentProps(properties, { allowClear: true, fixParentNode: false })
    })

    describe('when type is boolean', () => {
      const properties = { type: 'boolean' }

      it('returns a Switch component', () => {
        expect(buildComponent(properties)).toEqual(<Switch />)
      })

      itBehavesLikeExtendingComponentProps(properties, { size: 'small' })
    })

    describe('when type is string', () => {
      const properties = { type: 'string' }

      it('returns component for String type', () => {
        const { component: Component, props } = testExports.buildComponentForString({})

        expect(buildComponent(properties)).toEqual(<Component {...props} />)
      })

      itBehavesLikeExtendingComponentProps(properties, { allowClear: false })
    })

    describe('when type is integer', () => {
      const properties = { type: 'integer' }

      it('returns component for Integer type', () => {
        const { component: Component, props } = testExports.buildComponentForInteger({})

        expect(buildComponent(properties)).toEqual(<Component {...props} />)
      })

      itBehavesLikeExtendingComponentProps(properties, { disabled: false })
    })

    describe('by default (unhandled type)', () => {
      const properties = { type: '' }

      it('returns an Input', () => {
        expect(buildComponent(properties)).toEqual(<Input />)
      })

      itBehavesLikeExtendingComponentProps(properties, { disabled: true })
    })
  })
})
