import stringUtilities from '~su/utilities/string';

const { humanize, upcase, capitalize, singularize, pluralize, translate, escapeHTML, translateBoolean, replacePlaceholders } = stringUtilities

describe('String Utilities', () => {
  describe('humanize', () => {
    describe('with words split by _', () => {
      describe('with capitalize enabled', () => {
        it('replaces _ with whitespaces and capitalizes first word', () => {
          expect(humanize('test_string', { capitalize: true })).toEqual('Test string')
          expect(humanize('test_string_long', { capitalize: true })).toEqual('Test string long')
        })
      })

      describe('with titleize enabled', () => {
        it('replaces _ with whitespaces and capitalizes each word', () => {
          expect(humanize('test_string', { titleize: true })).toEqual('Test String')
          expect(humanize('test_string_long', { titleize: true })).toEqual('Test String Long')
        })
      })

      describe('with upcase enabled', () => {
        it('replaces _ with whitespaces and upcases each word', () => {
          expect(humanize('test_string', { upcase: true })).toEqual('TEST STRING')
          expect(humanize('test_string_long', { upcase: true })).toEqual('TEST STRING LONG')
        })
      })

      describe('with all enabled', () => {
        it('replaces _ with whitespaces and titelizes each word (ignores capitalize and upcase)', () => {
          expect(humanize('test_string', { titleize: true, capitalize: true, upcase: true })).toEqual('Test String')
          expect(humanize('test_string_long', { capitalize: true, titleize: true, upcase: true })).toEqual('Test String Long')
        })
      })

      describe('with none enabled', () => {
        it('replaces _ with whitespaces and does not change the case', () => {
          expect(humanize('test_string')).toEqual('test string')
          expect(humanize('test_string_long')).toEqual('test string long')
        })
      })
    })

    describe('with words split by -', () => {
      describe('with capitalize enabled', () => {
        it('replaces - with whitespaces and capitalizes first word', () => {
          expect(humanize('test-string', { capitalize: true })).toEqual('Test string')
          expect(humanize('test-string-long', { capitalize: true })).toEqual('Test string long')
        })
      })

      describe('with titleize enabled', () => {
        it('replaces - with whitespaces and capitalizes each word', () => {
          expect(humanize('test-string', { titleize: true })).toEqual('Test String')
          expect(humanize('test-string-long', { titleize: true })).toEqual('Test String Long')
        })
      })

      describe('with upcase enabled', () => {
        it('replaces - with whitespaces and upcases each word', () => {
          expect(humanize('test-string', { upcase: true })).toEqual('TEST STRING')
          expect(humanize('test-string-long', { upcase: true })).toEqual('TEST STRING LONG')
        })
      })

      describe('with all enabled', () => {
        it('replaces - with whitespaces and titelizes each word (ignores capitalize and upcase)', () => {
          expect(humanize('test-string', { titleize: true, capitalize: true, upcase: true })).toEqual('Test String')
          expect(humanize('test-string-long', { capitalize: true, titleize: true, upcase: true })).toEqual('Test String Long')
        })
      })

      describe('with none enabled', () => {
        it('replaces - with whitespaces and does not change the case', () => {
          expect(humanize('test-string')).toEqual('test string')
          expect(humanize('test-string-long')).toEqual('test string long')
        })
      })
    })

    describe('with words split by whitespace', () => {
      describe('with capitalize enabled', () => {
        it('capitalizes first word', () => {
          expect(humanize('test string', { capitalize: true })).toEqual('Test string')
          expect(humanize('test string long', { capitalize: true })).toEqual('Test string long')
        })
      })

      describe('with titleize enabled', () => {
        it('capitalizes each word', () => {
          expect(humanize('test string', { titleize: true })).toEqual('Test String')
          expect(humanize('test string long', { titleize: true })).toEqual('Test String Long')
        })
      })

      describe('with upcase enabled', () => {
        it('upcases each word', () => {
          expect(humanize('test string', { upcase: true })).toEqual('TEST STRING')
          expect(humanize('test string long', { upcase: true })).toEqual('TEST STRING LONG')
        })
      })

      describe('with all enabled', () => {
        it('titelizes each word (ignores capitalize and upcase)', () => {
          expect(humanize('test string', { titleize: true, capitalize: true, upcase: true })).toEqual('Test String')
          expect(humanize('test string long', { capitalize: true, titleize: true, upcase: true })).toEqual('Test String Long')
        })
      })

      describe('with none enabled', () => {
        it('just returns the string', () => {
          expect(humanize('test string')).toEqual('test string')
          expect(humanize('test string long')).toEqual('test string long')
        })
      })
    })
  });

  describe('upcase', () => {
    it('changes all letters to upper case', () => {
      expect(upcase('test string')).toEqual('TEST STRING')
      expect(upcase('test_string')).toEqual('TEST_STRING')
    })

    it('does not crash when string is null', () => {
      expect(upcase(null)).toEqual(undefined)
    })
  })

  describe('capitalize', () => {
    it('changes first letter to upper case', () => {
      expect(capitalize('test string')).toEqual('Test string')
      expect(capitalize('test_string')).toEqual('Test_string')
    })

    describe('when cannot be capitalised', () => {
      it('does not error, logs to console and returns input value', () => {
        global.console = { error: jest.fn() }
        expect(capitalize(null)).toEqual(null)
        expect(console.error).toBeCalled()
      })
    })
  })

  describe('singularize', () => {
    it('calls singularizes the string', () => {
      expect(singularize('tests')).toEqual('test')
    })
  })

  describe('pluralize', () => {
    it('pluralizes the string', () => {
      expect(pluralize('test', 2)).toEqual('tests')
    })
    it('pluralizes the string, which ends with "y"', () => {
      expect(pluralize('query', 2)).toEqual('queries')
    })
  })

  describe('translate', () => {
    describe('when there are translations for the collection', () => {

      describe('when there is a translation for a key', () => {
        it('returns the translation', () => {
          expect(translate('websocket_global_alerts', 'connecting')).toEqual('WebSocket connection is being established.')
        })
      })

      describe('when there is no translation for a key', () => {
        describe('when fallback is available', () => {
          it('calls the callback', () => {
            const fallback = (_val) => 'AlertOutput'

            expect(translate('websocket_global_alerts', 'not_existing_key', fallback)).toEqual('AlertOutput')
          })
        })

        describe('when fallback is not available', () => {
          it('returns the key', () => {
            expect(translate('websocket_global_alerts', 'not_existing_key')).toEqual('not_existing_key')
          })
        })
      })
    })

    describe('when there are no translations for the collection', () => {
      describe('when fallback is available', () => {
        it('calls the callback', () => {
          const fallback = (_val) => 'NoSched'

          expect(translate('scheds', 'none', fallback)).toEqual('NoSched')
        })
      })

      describe('when fallback is not available', () => {
        it('returns the key', () => {
          expect(translate('sheds', 'all')).toEqual('all')
        })
      })
    })

    describe('when key is null', () => {
      it('uses collection', () => {
        expect(translate('output', null)).toEqual('output')
      })
    })
  })

  describe('escapeHTML', () => {
    it('replaces "&"', () => {
      expect(escapeHTML('test&')).toEqual('test&#38;')
    })

    it("replaces '\"'", () => {
      expect(escapeHTML('"test"')).toEqual('&#34;test&#34;')
    })

    it('replaces "\'"', () => {
      expect(escapeHTML("'test'")).toEqual('&#39;test&#39;')
    })

    it('replaces <', () => {
      expect(escapeHTML("<test")).toEqual('&#60;test')
    })
  })

  describe('translateBoolean', () => {
    const translations = { true: 'Yes', false: 'No' }

    describe('with true value', () => {
      it('returns correct translation', () => {
        expect(translateBoolean(true, translations)).toEqual('Yes')
      })
    })

    describe('with false value', () => {
      it('returns correct translation', () => {
        expect(translateBoolean(false, translations)).toEqual('No')
      })
    })
  })

  describe('replacePlaceholders', () => {
    const record = {
      client_slug: 'slug',
      page_uri: 'uri',
      id: '1'
    }

    it('returns correct translation', () => {
      expect(replacePlaceholders('/clients/:client_slug/:page_uri/:id', record)).toEqual('/clients/slug/uri/1')
    })

    it('replace :variableName placeholder with undefined if it does not exist in passed record', () => {
      expect(replacePlaceholders('/clients/:client_slug/:page_uri/:id/:variableName', record)).toEqual('/clients/slug/uri/1/undefined')
    })
  })
});
