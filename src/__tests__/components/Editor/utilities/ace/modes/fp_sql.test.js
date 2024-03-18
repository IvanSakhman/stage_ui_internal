import { invert as invertObject } from '~su/utilities/object'

import { testExports } from '~su/components/Editor/utilities/ace/modes/fp_sql'

import ace from 'ace-builds'

describe('Ace FpSql Mode Rules', () => {
  describe('generateMacrosRegex', () => {
    const { generateMacrosRegex } = testExports

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

  describe('buildExtendedKeywordMatcher', () => {
    const { buildExtendedKeywordMatcher } = testExports

    const highlightRules = {
      $rules: {
        start: [
          {
            token: jest.fn()
          }
        ]
      },
      createKeywordMapper: jest.fn().mockImplementation((map, defaultValue) => {
        const keywords = Object.fromEntries(map['support.function'].split(',').map((func) => [func, 'support.function']))
        return (value) => keywords[value] || defaultValue
      })
    }

    it('creates a custom keywordMapper with provided functions', () => {
      buildExtendedKeywordMatcher(highlightRules)

      expect(highlightRules.createKeywordMapper).toBeCalledWith({ 'support.function': expect.stringMatching(/upper,lower,.*,||/) }, null, true, ',')
    })

    it('returns a function that is able to return matching identifier', () => {
      const matcher = buildExtendedKeywordMatcher(highlightRules)

      expect(matcher('upper')).toEqual('support.function')
    })

    describe('when extendedKeywordMatcher does not provide any match', () => {
      it('defaults to original keywordMatcher', () => {
        const matcher = buildExtendedKeywordMatcher(highlightRules)

        matcher('sum')

        expect(highlightRules.$rules.start[0].token).toBeCalledWith('sum')
      })
    })
  })

  describe('buildCustomHighlightRules', () => {
    const { buildCustomHighlightRules } = testExports

    const highlightRules = {
      $rules: {
        start: [
          {
            token: jest.fn()
          }
        ]
      },
      createKeywordMapper: jest.fn()
    }

    it('returns a list of custom highlight rules', () => {
      expect(buildCustomHighlightRules(highlightRules)).toEqual({
        start: [
          {
            token: 'string',
            regex: "'.*?'"
          },
          {
            token: 'string.alias',
            regex: '".*?"'
          },
          {
            token: 'support.function',
            regex: '\\|\\|'
          },
          {
            token: expect.any(Function),
            regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b'
          }
        ]
      })
    })

    describe('string token', () => {
      it('matches anything wrapped in single-quotes', () => {
        const matcher = buildCustomHighlightRules(highlightRules).start.find(({ token }) => token === 'string')
        const regex = new RegExp(matcher.regex)

        expect(regex.test("'test'")).toEqual(true)
        expect(regex.test('"test"')).toEqual(false)
        expect(regex.test('`test`')).toEqual(false)
      })
    })

    describe('string.alias token', () => {
      it('matches anything wrapped in dobule', () => {
        const matcher = buildCustomHighlightRules(highlightRules).start.find(({ token }) => token === 'string.alias')
        const regex = new RegExp(matcher.regex)

        expect(regex.test('"test"')).toEqual(true)
        expect(regex.test("'test'")).toEqual(false)
        expect(regex.test('`test`')).toEqual(false)
      })
    })

    describe('support.function token', () => {
      it('matches pipe (OR) operator', () => {
        const matcher = buildCustomHighlightRules(highlightRules).start.find(({ token }) => token === 'support.function')
        const regex = new RegExp(matcher.regex)

        expect(regex.test('||')).toEqual(true)
        expect(regex.test('|')).toEqual(false)
      })
    })
  })
})
