import { enumsToValueEnum, buildOptions } from '~su/components/Select/utilities'

describe('Select utilities', () => {
  describe('enumsToValueEnum', () => {
    describe('when valueEnum is provided', () => {
      it('returns it', () => {
        const enums = [11, 10, 7, 4, 1]
        const valueEnum = [
          ['eleven', 11],
          ['ten', 10],
          ['seven', 7],
          ['four', 4],
          ['one', 1]
        ]

        expect(enumsToValueEnum(enums, null, valueEnum)).toEqual(valueEnum)
      })
    })

    describe('when valueEnum is not provided', () => {
      it('builds it out of enums', () => {
        const enums = ['one', 'two', 'three', 'four']

        expect(enumsToValueEnum(enums, null)).toEqual([
          ['one', 'one'],
          ['two', 'two'],
          ['three', 'three'],
          ['four', 'four']
        ])
      })

      describe('when enum includes -1', () => {
        it('uses allLabel value as the label for it', () => {
          const enums = [-1, 1, 2, 3, 4]

          expect(enumsToValueEnum(enums, 'ALL')).toEqual([
            ['ALL', -1],
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4]
          ])
        })
      })
    })
  })

  describe('buildOptions', () => {
    describe('when options are provided', () => {
      it('returns them', () => {
        expect(buildOptions([], ['one', 'two'])).toEqual(['one', 'two'])


        expect(
          buildOptions(
            [],
            [
              { label: 'one', value: 1 },
              { label: 'two', value: 2 }
            ]
          )
        ).toEqual([
          { label: 'one', value: 1 },
          { label: 'two', value: 2 }
        ])
      })
    })

    describe('when options are not provided', () => {
      it('builds them out of valueEnum', () => {
        const valueEnum = [
          ['eleven', 11],
          ['ten', 10],
          ['seven', 7],
          ['four', 4],
          ['one', 1]
        ]

        expect(buildOptions(valueEnum)).toEqual([
          { label: 'eleven', value: 11 },
          { label: 'ten', value: 10 },
          { label: 'seven', value: 7 },
          { label: 'four', value: 4 },
          { label: 'one', value: 1 }
        ])
      })
    })
  })
})
