import { updateSchemaCompleter, registerSnippets, langTools, snippetsModule } from '~su/components/Editor/utilities/ace'

describe('Ace Utils', () => {
  describe('updateSchemaCompleter', () => {
    const editorKey = 'test'
    const completer = langTools.schemaCompleter
    const session = {}
    const editor = { session, id: editorKey }

    describe('w/o schema', () => {
      it('sets schemaCompleterKeywords as null for the editor resulting in empty completions', () => {
        updateSchemaCompleter('test')

        const assert = (nothing, completions) => {
          expect(completions).toEqual([])
        }
        completer.getCompletions(editor, session, {}, 'dev', assert)
      })
    })

    describe('w/ schema', () => {
      const schema = [
        {
          id: 1,
          columns: [
            { name: 'campaign', type: 'string', comment: 'test comment' },
            { name: 'ad_group', type: 'string', comment: '' },
            { name: 'headline', type: 'string', comment: '' },
            { name: 'line_1', type: 'string', comment: '' }
          ],
          client_slugs: ['development'],
          name: 'development_adwords_ad_texts_with_conversions',
          created_at: '2020-11-09T18:24:41.321Z',
          updated_at: '2020-11-09T18:24:55.986Z'
        },
        {
          id: 2,
          columns: [
            { name: 'campaign', type: 'string', comment: '' },
            { name: 'ad_group', type: 'string', comment: '' },
            { name: 'headline', type: 'string', comment: '' },
            { name: 'line_2', type: 'string', comment: '' },
            { name: 'creative_final_url_suffix', type: 'string', comment: '' }
          ],
          client_slugs: ['development'],
          name: 'development_adwords_all_adtexts',
          created_at: '2020-11-09T18:35:14.431Z',
          updated_at: '2020-11-09T18:35:18.645Z'
        }
      ]

      it('sets built keywords from schema for the editor', () => {
        updateSchemaCompleter('test', schema)

        const assertTest2 = (nothing, completions) => {
          expect(completions.length).toEqual(0)
        }
        completer.getCompletions({ ...editor, id: 'test2' }, session, {}, 'dev', assertTest2)

        const assert = (nothing, completions) => {
          expect(completions.length).toEqual(8)
        }
        completer.getCompletions(editor, session, {}, 'dev', assert)
      })

      it('sets table scores as 100, column scores as 50', () => {
        const assert = (nothing, completions) => {
          expect(
            completions.filter((completion) => completion.meta === 'Table').map((completion) => completion.score)
          ).toEqual([100, 100])
          expect(
            completions.filter((completion) => completion.meta !== 'Table').map((completion) => completion.score)
          ).toEqual([50, 50, 50, 50, 50, 50])
        }

        completer.getCompletions(editor, session, {}, 'dev', assert)
      })

      describe('tableColumns', () => {
        it('sets their name & value as table_name.column_name and score as 100', () => {
          const assertWithPrefix = (nothing, completions) => {
            const columns = completions.filter((completion) => completion.meta !== 'Table')
            const expectedTableColumnPairs = [
              'development_adwords_ad_texts_with_conversions.campaign',
              'development_adwords_ad_texts_with_conversions.ad_group',
              'development_adwords_ad_texts_with_conversions.headline',
              'development_adwords_ad_texts_with_conversions.line_1'
            ]
            expect(columns.map((completion) => completion.score)).toEqual([100, 100, 100, 100])

            expect(columns.map((completion) => completion.name)).toEqual(expectedTableColumnPairs)
            expect(columns.map((completion) => completion.value)).toEqual(expectedTableColumnPairs)
          }

          completer.getCompletions(
            editor,
            session,
            {},
            'development_adwords_ad_texts_with_conversions.',
            assertWithPrefix
          )
        })
      })
    })
  })

  describe('registerSnippets', () => {
    const snippet = { name: '{{last_week}}', code: '{{last_week}}', meta: { types: ['macro'], parameters: [] } }
    const session = {
      $mode: {
        $id: 'sql',
        $highlightRules: {
          addMacroRule: jest.fn()
        }
      },
      setMode: jest.fn()
    }
    const editor = { session }

    beforeEach(() => {
      snippetsModule.snippetManager.files = {
        [session.$mode.$id]: {}
      }
    })

    const expectedSnippet = {
      tabTrigger: snippet.name,
      name: snippet.name,
      content: snippet.code,
      scope: 'sql',
      trigger: '\\{\\{last_week\\}\\}',
      startRe: /(?:\{\{last_week\}\})$/,
      triggerRe: /\{\{last_week\}\}/,
      endRe: /(?:)/,
      endTriggerRe: /(?:)/
    }

    it('registers snippets in snippetManager', () => {
      const spy = jest.spyOn(snippetsModule.snippetManager, 'register')

      registerSnippets({ editor }, [snippet], 'sql')

      expect(spy).toHaveBeenCalledWith([expectedSnippet], 'sql')

      spy.mockRestore()
    })

    it('adds the snippets to the snippetMap', () => {
      registerSnippets({ editor }, [snippet], 'sql')

      expect(snippetsModule.snippetManager.snippetMap['sql']).toEqual([expectedSnippet])
    })

    describe('when snippet has meta.parameters and meta.defaults', () => {
      it('replaces parameter placeholder with the default value', () => {
        const snippetWithParamsAndDefaults = {
          name: '{{last_week}}',
          code: '{{last_week ${1:number}}}',
          meta: { types: ['macro'], parameters: ['number'], defaults: ['2'] }
        }

        const expectedSnippetWithParamsAndDefaults = { ...expectedSnippet, content: '{{last_week 2}}' }
        registerSnippets({ editor }, [snippetWithParamsAndDefaults], 'sql')

        expect(snippetsModule.snippetManager.snippetMap['sql']).toEqual([expectedSnippetWithParamsAndDefaults])
      })

      describe('when default is not present', () => {
        it('does not replace the parameter placeholder', () => {
          const snippetWithParamsAndDefaults = {
            name: '{{last_week}}',
            code: '{{last_week ${1:number} ${2:text}}}',
            meta: { types: ['macro'], parameters: ['number', 'text'], defaults: ['2'] }
          }

          const expectedSnippetWithParamsAndDefaults = { ...expectedSnippet, content: '{{last_week 2 ${2:text}}}' }
          registerSnippets({ editor }, [snippetWithParamsAndDefaults], 'sql')

          expect(snippetsModule.snippetManager.snippetMap['sql']).toEqual([expectedSnippetWithParamsAndDefaults])
        })
      })
    })

    describe('when snippet has meta.description', () => {
      it('adds it to the snippet code for getDocTooltip to handle', () => {
        const snippetWithDescription = {
          name: '{{last_week}}',
          code: '{{last_week}}',
          meta: { types: ['macro'], parameters: [], description: 'Test description' }
        }

        const expectedSnippetWithDescription = {
          ...expectedSnippet,
          content: [expectedSnippet.content, snippetWithDescription.meta.description].join('docHTML:')
        }
        registerSnippets({ editor }, [snippetWithDescription], 'sql')

        expect(snippetsModule.snippetManager.snippetMap['sql']).toEqual([expectedSnippetWithDescription])
      })

      describe('when snippet description has newlines', () => {
        it('replaces them with !NEWLINE! because ACE reads \n as snipept separator', () => {
          const snippetWithDescription = {
            name: '{{last_week}}',
            code: '{{last_week}}',
            meta: { types: ['macro'], parameters: [], description: 'Test\ndescription\nmuchnewlines' }
          }

          const expectedSnippetWithDescription = {
            ...expectedSnippet,
            content: [expectedSnippet.content, snippetWithDescription.meta.description].join('docHTML:')
          }
          registerSnippets({ editor }, [snippetWithDescription], 'sql')

          expect(snippetsModule.snippetManager.snippetMap['sql'][0].content).toEqual(
            '{{last_week}}docHTML:Test!NEWLINE!description!NEWLINE!muchnewlines'
          )
        })
      })
    })

    describe('when there are macros', () => {
      it('tells fp_sql mode to add macro rule', () => {
        const setModeSpy = jest.spyOn(session, 'setMode').mockImplementation((mode, cb) => cb())
        const addMacroRuleSpy = jest.spyOn(session.$mode.$highlightRules, 'addMacroRule')
        registerSnippets({ editor }, [snippet], 'fp_sql')

        expect(setModeSpy).toHaveBeenCalledWith('ace/mode/fp_sql', expect.any(Function))
        expect(addMacroRuleSpy).toHaveBeenCalledWith([snippet], session)

        setModeSpy.mockRestore()
        addMacroRuleSpy.mockRestore()
      })

      describe('when mode is fp_xml', () => {
        it('registers snippets in html-tag scope', () => {
          registerSnippets({ editor }, [snippet], 'fp_xml')
          expectedSnippet.scope = 'html-tag'

          expect(snippetsModule.snippetManager.snippetMap['html-tag']).toEqual([expectedSnippet])
        })
      })
    })

    describe('when there are no macros', () => {
      it('does not update fp_sql mode with dynamic macro rules', () => {
        const setModeSpy = jest.spyOn(session, 'setMode') //.mockImplementation((mode, cb) => cb())
        registerSnippets({ editor }, [{ name: snippet.name, code: snippet.code }], 'fp_sql')

        expect(setModeSpy).not.toHaveBeenCalledWith('ace/mode/fp_sql', expect.any(Function))

        setModeSpy.mockRestore()
      })
    })
  })

  describe('lang tools', () => {
    describe('snippetCompleter', () => {
      const completer = langTools.snippetCompleter
      const session = {
        getTokenAt: jest.fn(),
        $mode: {
          $id: 'sql'
        }
      }

      const editor = { session }

      describe('getCompletions', () => {
        const macroSnippet = { name: '{{last_week}}', code: '{{last_week}}' },
          dependentQuerySnippet = { name: '#Test', code: '{{test_with_hash}}' },
          snippet = { name: "Insert 'Select All'", code: 'SELECT * FROM ${1:table_name}' }

        beforeEach(() => {
          snippetsModule.snippetManager.files = {
            [session.$mode.$id]: {}
          }

          registerSnippets({ editor }, [macroSnippet, snippet, dependentQuerySnippet], 'sql')
        })

        it('returns registered snippets', () => {
          const assert = (nothing, completions) => {
            expect(completions.length).toEqual(3)
          }

          completer.getCompletions(editor, session, {}, '{{da', assert)
        })

        it('sets snippets score as 1 for dependent query snippet', () => {
          const assert = (nothing, completions) => {
            expect(completions[0]).toEqual(expect.objectContaining({ score: 1 }))
          }

          completer.getCompletions(editor, session, {}, '{{da', assert)
        })

        it('sets snippets score as 3 for snippet', () => {
          const assert = (nothing, completions) => {
            expect(completions[1]).toEqual(expect.objectContaining({ score: 3 }))
          }

          completer.getCompletions(editor, session, {}, '{{da', assert)
        })

        it('sets snippets score as 1 for macro snippet', () => {
          const assert = (nothing, completions) => {
            expect(completions[2]).toEqual(expect.objectContaining({ score: 2 }))
          }

          completer.getCompletions(editor, session, {}, '{{da', assert)
        })

        describe('when prefix is #', () => {
          it('still returns snippets', () => {
            const assert = (nothing, completions) => {
              expect(completions.length).toEqual(3)
              expect(completions).toContainEqual({
                caption: dependentQuerySnippet.name,
                meta: 'dependent query',
                snippet: dependentQuerySnippet.code,
                completerId: 'snippetCompleter',
                score: 1
              })
            }

            completer.getCompletions(editor, session, {}, '#', assert)
          })
        })

        describe('setting meta per different captions', () => {
          it('sets meta=macro when caption starts with {', () => {
            const assert = (nothing, completions) => {
              expect(completions).toContainEqual(expect.objectContaining({ caption: macroSnippet.name, meta: 'macro' }))
            }

            completer.getCompletions(editor, session, {}, '', assert)
          })

          it('sets meta=dependent query when caption starts with #', () => {
            const assert = (nothing, completions) => {
              expect(completions).toContainEqual(
                expect.objectContaining({ caption: dependentQuerySnippet.name, meta: 'dependent query' })
              )
            }

            completer.getCompletions(editor, session, {}, '', assert)
          })

          it('defaults to meta=snippet', () => {
            const assert = (nothing, completions) => {
              expect(completions).toContainEqual(expect.objectContaining({ caption: snippet.name, meta: 'snippet' }))
            }

            completer.getCompletions(editor, session, {}, '', assert)
          })
        })
      })

      describe('getDocTooltip', () => {
        describe('when completerId is not snippetCompleter', () => {
          it('does not add docHTML', () => {
            const item = { caption: 'test', code: 'function() { alert("test") }' }

            completer.getDocTooltip(item)
            expect(item.docHTML).toEqual(undefined)
          })
        })

        describe('when completerId is not snippetCompleter', () => {
          describe('when has docHTML', () => {
            it('does not change it', () => {
              const item = {
                completerId: 'snippetCompleter',
                caption: 'test',
                snippet: 'function() { alert("test") }',
                docHTML: 'Simple alert fn'
              }

              completer.getDocTooltip(item)
              expect(item.docHTML).toEqual('Simple alert fn')
            })
          })

          describe('when does not have docHTML', () => {
            it('adds docHTML', () => {
              const item = { completerId: 'snippetCompleter', caption: 'test', snippet: 'function() { alert("test") }' }

              completer.getDocTooltip(item)
              expect(item.docHTML).toEqual('<b>test</b><hr></hr>function() { alert(&#34;test&#34;) }')
            })

            describe('when has code_and_doc_separator in snippet property', () => {
              it('separates code and description and puts the description to the docHTML', () => {
                const item = {
                  completerId: 'snippetCompleter',
                  caption: 'test',
                  snippet: 'function() { alert("test") }docHTML:Simple alert fn'
                }

                completer.getDocTooltip(item)
                expect(item.docHTML).toEqual(
                  '<b>test</b><hr></hr>function() { alert(&#34;test&#34;) }<hr/>Simple alert fn'
                )
              })

              describe('when description includes !NEWLINE!', () => {
                it('replaces it with \n', () => {
                  const item = {
                    completerId: 'snippetCompleter',
                    caption: 'test',
                    snippet: 'function() { alert("test") }docHTML:Simple!NEWLINE!alert!NEWLINE!fn'
                  }

                  completer.getDocTooltip(item)
                  expect(item.docHTML).toEqual(
                    '<b>test</b><hr></hr>function() { alert(&#34;test&#34;) }<hr/>Simple\nalert\nfn'
                  )
                })
              })
            })
          })
        })
      })
    })

    describe('customKeyWordCompleter', () => {
      const completer = langTools.keyWordCompleter
      const session = {
        $mode: {
          getCompletions: () => [{ value: 'select' }]
        },
        getState: jest.fn()
      }
      const editor = { session }

      describe('getCompletions', () => {
        describe('when prefix is upperCase', () => {
          it('suggests keywords in upperCase', () => {
            const assert = (nothing, completions) => {
              expect(completions).toEqual([expect.objectContaining({ value: 'SELECT' })])
            }
            completer.getCompletions(editor, session, {}, 'SE', assert)
          })
        })

        describe('when prefix is lowerCase', () => {
          it('suggests keywords in lowerCase', () => {
            const assert = (nothing, completions) => {
              expect(completions).toEqual([expect.objectContaining({ value: 'select' })])
            }
            completer.getCompletions(editor, session, {}, 'se', assert)
          })
        })
      })
    })

    describe('schemaCompleter', () => {
      const completer = langTools.schemaCompleter
      const session = {}
      const editor = { session, id: 'test' }

      describe('identifierRegexps', () => {
        describe('first one', () => {
          const regexp = completer.identifierRegexps[0]

          it('matches any char within range a-z', () => {
            expect(regexp.test('a')).toEqual(true)
            expect(regexp.test('g')).toEqual(true)
            expect(regexp.test('z')).toEqual(true)
          })

          it('matches any char within range A-Z', () => {
            expect(regexp.test('A')).toEqual(true)
            expect(regexp.test('V')).toEqual(true)
            expect(regexp.test('Z')).toEqual(true)
          })

          it('matches _ (underscore)', () => {
            expect(regexp.test('_')).toEqual(true)
          })

          it('matches any number within 0-9', () => {
            expect(regexp.test('0')).toEqual(true)
            expect(regexp.test('3')).toEqual(true)
            expect(regexp.test('9')).toEqual(true)
          })

          it('matches . (dot)', () => {
            expect(regexp.test('.')).toEqual(true)
          })

          it('matches - (hyphen)', () => {
            expect(regexp.test('-')).toEqual(true)
          })

          it('matches unicode charts within between 162 and 63535', () => {
            expect(regexp.test('\u00A2')).toEqual(true)
            expect(regexp.test('\u0248')).toEqual(true)
            expect(regexp.test('\uFFFF')).toEqual(true)
          })

          it('matches {', () => {
            expect(regexp.test('{')).toEqual(true)
          })
        })
      })

      describe('getCompletions', () => {
        const schema = [
          {
            id: 1,
            columns: [
              { name: 'campaign', type: 'string', comment: 'test comment' },
              { name: 'ad_group', type: 'string', comment: '' },
              { name: 'headline', type: 'string', comment: '' },
              { name: 'line_1', type: 'string', comment: '' }
            ],
            client_slugs: ['development'],
            name: 'development_adwords_ad_texts_with_conversions',
            created_at: '2020-11-09T18:24:41.321Z',
            updated_at: '2020-11-09T18:24:55.986Z'
          },
          {
            id: 2,
            columns: [
              { name: 'campaign', type: 'string', comment: '' },
              { name: 'ad_group', type: 'string', comment: '' },
              { name: 'headline', type: 'string', comment: '' },
              { name: 'line_2', type: 'string', comment: '' },
              { name: 'creative_final_url_suffix', type: 'string', comment: '' }
            ],
            client_slugs: ['development'],
            name: 'development_adwords_all_adtexts',
            created_at: '2020-11-09T18:35:14.431Z',
            updated_at: '2020-11-09T18:35:18.645Z'
          }
        ]

        beforeEach(() => {
          updateSchemaCompleter('test', schema)
        })

        describe('w/o prefix', () => {
          it('sends no completions to the callback', () => {
            const assert = (nothing, completions) => {
              expect(completions).toEqual([])
            }
            completer.getCompletions(editor, session, {}, '', assert)
          })
        })

        describe('w/ prefix', () => {
          describe('when prefix ends with a . (dot)', () => {
            it('sends tables with prefixed columns with for given table', () => {
              const assert = (nothing, completions) => {
                expect(completions).toEqual([
                  {
                    meta: 'Table',
                    name: 'development_adwords_ad_texts_with_conversions',
                    score: 100,
                    value: 'development_adwords_ad_texts_with_conversions'
                  },
                  {
                    meta: 'Table',
                    name: 'development_adwords_all_adtexts',
                    score: 100,
                    value: 'development_adwords_all_adtexts'
                  },
                  {
                    meta: 'String',
                    name: 'development_adwords_all_adtexts.campaign',
                    score: 100,
                    value: 'development_adwords_all_adtexts.campaign'
                  },
                  {
                    meta: 'String',
                    name: 'development_adwords_all_adtexts.ad_group',
                    score: 100,
                    value: 'development_adwords_all_adtexts.ad_group'
                  },
                  {
                    meta: 'String',
                    name: 'development_adwords_all_adtexts.headline',
                    score: 100,
                    value: 'development_adwords_all_adtexts.headline'
                  },
                  {
                    meta: 'String',
                    name: 'development_adwords_all_adtexts.line_2',
                    score: 100,
                    value: 'development_adwords_all_adtexts.line_2'
                  },
                  {
                    meta: 'String',
                    name: 'development_adwords_all_adtexts.creative_final_url_suffix',
                    score: 100,
                    value: 'development_adwords_all_adtexts.creative_final_url_suffix'
                  }
                ])
              }
              completer.getCompletions(editor, session, {}, 'development_adwords_all_adtexts.', assert)
            })
          })

          describe('when prefix does not end with a . (dot)', () => {
            it('sends tables with columns to the callback', () => {
              const assert = (nothing, completions) => {
                expect(completions).toEqual([
                  {
                    meta: 'Table',
                    name: 'development_adwords_ad_texts_with_conversions',
                    score: 100,
                    value: 'development_adwords_ad_texts_with_conversions'
                  },
                  {
                    meta: 'Table',
                    name: 'development_adwords_all_adtexts',
                    score: 100,
                    value: 'development_adwords_all_adtexts'
                  },
                  { meta: 'String', name: 'campaign', score: 50, value: 'campaign' },
                  { meta: 'String', name: 'ad_group', score: 50, value: 'ad_group' },
                  { meta: 'String', name: 'headline', score: 50, value: 'headline' },
                  { meta: 'String', name: 'line_1', score: 50, value: 'line_1' },
                  { meta: 'String', name: 'line_2', score: 50, value: 'line_2' },
                  { meta: 'String', name: 'creative_final_url_suffix', score: 50, value: 'creative_final_url_suffix' }
                ])
              }
              completer.getCompletions(editor, session, {}, 'de', assert)
            })
          })
        })
      })
    })
  })
})
