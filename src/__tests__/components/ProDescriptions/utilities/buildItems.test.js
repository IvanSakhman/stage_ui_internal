import buildItems from '~su/components/ProDescriptions/utilities/buildItems'

import { EMPTY } from '~su/constants'
import StateTag from '~su/components/StateTag'
import TagsList from '~su/components/TagsList'

describe('ProDescriptions buildItems utility', () => {
  const record = {
    name: 'Fake',
    state: 'testing',
    created_at: '2022-12-09T13:19:22.101Z',
    description: 'Lorem ipsum',
    new: true,
    age: 2**23,
    tags: ['pro', 'dev'],
    categories: []
  }

  const columns = [
    { key: 'name' },
    { key: 'state' },
    { key: 'created_at' },
    { key: 'description' },
    { key: 'new' }
  ]

  it('builds description items based on provided columns for a given record', () => {
    expect(buildItems(record, columns)).toEqual([
      { key: 'name', label: 'Name', children: record.name },
      { key: 'state', label: 'State', children: record.state },
      { key: 'created_at', label: 'Created at', children: record.created_at },
      { key: 'description', label: 'Description', children: record.description },
      { key: 'new', label: 'New', children: record.new }
    ])
  })

  describe('when value is null', () => {
    beforeEach(() => {
      record.description = null
    })

    it(`renders it as ${EMPTY}`, () => {
      expect(buildItems(record, columns)[3]).toEqual(
        { key: 'description', label: 'Description', children: EMPTY }
      )
    })
  })

  describe('when value is undefined', () => {
    beforeEach(() => {
      record.description = undefined
    })

    it(`renders it as ${EMPTY}`, () => {
      expect(buildItems(record, columns)[3]).toEqual(
        { key: 'description', label: 'Description', children: EMPTY }
      )
    })
  })

  describe('when value is array', () => {
    describe('when value is empty array', () => {
      const columns = [
        { key: 'categories' }
      ]
      beforeEach(() => {
        record.description = undefined
      })

      it(`renders it as ${EMPTY}`, () => {
        expect(buildItems(record, columns)).toEqual(
          [{ key: 'categories', label: 'Categories', children: EMPTY }]
        )
      })
    })
  })

  describe('when column is configured with valueType', () => {
    describe('state', () => {
      const columns = [
        { key: 'state', valueType: 'state', valueRenderConfig: { testing: { color: 'black' } } }
      ]

      it('renders it as StateTag', () => {
        expect(buildItems(record, columns)).toEqual([
          { key: 'state', label: 'State', children: <StateTag state={record.state} configuration={columns[0].valueRenderConfig} /> }
        ])
      })
    })

    describe('tags', () => {
      const columns = [
        { key: 'tags', valueType: 'tags' }
      ]

      it(`renders it as collection of tags`, () => {
        expect(buildItems(record, columns)).toEqual(
          [{ key: 'tags', label: 'Tags', children:<TagsList tags={record.tags} /> }]
        )
      })
    })


    describe('dateTime', () => {
      const columns = [
        { key: 'created_at', valueType: 'dateTime' }
      ]

      beforeEach(() => {
        let languageGetter = jest.spyOn(window.navigator, 'language', 'get')
        languageGetter.mockReturnValue('en-GB')
      })

      it('renders it as formatted date', () => {
        expect(buildItems(record, columns)).toEqual([
          { key: 'created_at', label: 'Created at', children: 'Fri, 9 Dec 2022, 13:19 GMT' }
        ])
      })
    })

    describe('duration', () => {
      const columns = [
        { key: 'age', valueType: 'duration' }
      ]

      it('renders it as formatted duration', () => {
        expect(buildItems(record, columns)).toEqual([
          { key: 'age', label: 'Age', children: '2 hours and 19 minutes' }
        ])
      })
    })

    describe('when valueType is not supported', () => {
      const columns = [
        { key: 'new', valueType: 'bool' }
      ]

      it('renders value w/o modifying it', () => {
        expect(buildItems(record, columns)).toEqual([
          { key: 'new', label: 'New', children: record.new }
        ])
      })
    })
  })

  describe('when value is configured with valueEnum', () => {
    const columns = [
      { key: 'new', valueEnum: { true: 'Yes', false: 'Noooo' } }
    ]

    it('renders it based on the enum', () => {
      expect(buildItems(record, columns)).toEqual([
        { key: 'new', label: 'New', children: 'Yes' }
      ])
    })
  })

  describe('when value is configured with component properties', () => {
    // https://ant.design/components/descriptions#descriptionitem
    // contentStyle	Customize content style	CSSProperties	-	4.9.0
    // labelStyle	Customize label style	CSSProperties	-	4.9.0
    // span	The number of columns included	number	1
    const columns = [
      { key: 'name', span: 4, contentStyle: { color: 'red' }, labelStyle: { color: 'blue' } }
    ]

    it('passes unmodified span, contentStyle and labelStyle', () => {
      expect(buildItems(record, columns)).toEqual([
        { key: 'name', label: 'Name', span: 4, contentStyle: { color: 'red' }, labelStyle: { color: 'blue' }, children: 'Fake' }
      ])
    })
  })
})
