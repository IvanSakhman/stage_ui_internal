import { renderBasedOnType } from '~su/utilities'

import { YesNoTag, TagsList } from '~su/components'

describe('renderBasedOnType util', () => {
  describe('when type is array', () => {
    it('returns a TagsList', () => {
      expect(renderBasedOnType('array', ['foo'])).toEqual(<TagsList tags={['foo']} wrap />)
    })
  })

  describe('when type is boolean', () => {
    it('returns a a YesNoTag', () => {
      expect(renderBasedOnType('boolean', true)).toEqual(<YesNoTag yes={true} />)
    })
  })

  describe('when there is no special handling for the type', () => {
    it('returns the value', () => {
      expect(renderBasedOnType('string', 'bar')).toEqual('bar')
    })
  })
})
