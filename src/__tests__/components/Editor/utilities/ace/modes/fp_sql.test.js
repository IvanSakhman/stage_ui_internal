import { generateMacrosRegex } from '~su/components/Editor/utilities/ace/modes/fp_sql'

describe('Ace FpSql Mode Rules', () => {
  describe('generate_macros_regex', () => {
    it('builds a regex based on macros array', () => {
      expect(generateMacrosRegex([
        { name: 'test', code: 'test', meta: { parameters: [] } },
        { name: 'tset', code: 'tset', meta: { parameters: [] } }
      ])).toEqual(/test|tset/)
    })

    describe('when macro.meta has parameters', () => {
      it('replaces the parameters with a \\d+ regex', () => {
        expect(generateMacrosRegex([
          { name: 'test', code: 'test${1:number}', meta: { parameters: ['number'] } },
          { name: 'tset', code: 'tset ${1:number} ${2:id}', meta: { parameters: ['number', 'id'] } }
        ])).toEqual(/test\d+|tset \d+ \d+/)
      })
    })
  })
})
