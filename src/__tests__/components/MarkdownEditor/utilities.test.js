import { SNIPPETS, registerSnippets, setupCommands, insertSnippet, testExports } from '~su/components/MarkdownEditor/utilities'

describe('MarkdownEditor utilities', () => {
  describe('SNIPPETS', () => {
    it('defines heading snippet', () => {
      expect(SNIPPETS.heading).toEqual({ text: '### ' })
    })

    it('defines bold snippet', () => {
      expect(SNIPPETS.bold).toEqual({ text: '__${1:bold}__' })
    })

    it('defines italic snippet', () => {
      expect(SNIPPETS.italic).toEqual({ text: '_${1:italic}_' })
    })

    it('defines quote snippet', () => {
      expect(SNIPPETS.quote).toEqual({ text: '> ', requiresNewLine: true })
    })

    it('defines code snippet', () => {
      expect(SNIPPETS.code).toEqual({ text: '`${1:code}`' })
    })

    it('defines link snippet', () => {
      expect(SNIPPETS.link).toEqual({ text: '[${1:link}](${2:url})' })
    })

    it('defines bulletList snippet', () => {
      expect(SNIPPETS.bulletList).toEqual({ text: '- ', requiresNewLine: true, supportsContinuity: true })
    })

    describe('numberedList', () => {
      it('is defined', () => {
        expect(SNIPPETS.numberedList).toEqual({ text: 'N. ', requiresNewLine: true, supportsContinuity: true, beforeInsert: expect.any(Function) })
      })

      describe('beforeInsert', () => {
        describe('when preceeding line is empty', () => {
          const mockEditor = {
            getSelection: () => {},
            getModel: () => ({ getValueInRange: () => null })
          }

          it('replaces snippet text with 1', () => {
            expect(SNIPPETS.numberedList.beforeInsert(SNIPPETS.numberedList.text, mockEditor)).toEqual('1. ')
          })
        })

        describe('when preceeding line is not empty', () => {
          describe('when preceeding line starts with a number', () => {
            const mockEditor = {
              getSelection: () => {},
              getModel: () => ({ getValueInRange: () => '3' })
            }

            it('replaces snippet text with the number + 1', () => {
              expect(SNIPPETS.numberedList.beforeInsert(SNIPPETS.numberedList.text, mockEditor)).toEqual('4. ')
            })
          })

          describe('when preceeding line does not start with a number', () => {
            const mockEditor = {
              getSelection: () => {},
              getModel: () => ({ getValueInRange: () => 'foo' })
            }

            it('does not replace snippet text', () => {
              expect(SNIPPETS.numberedList.beforeInsert(SNIPPETS.numberedList.text, mockEditor)).toEqual(SNIPPETS.numberedList.text)
            })
          })
        })
      })
    })

    describe('checkList', () => {
      it('is defined', () => {
        expect(SNIPPETS.checkList).toEqual({ text: 'N. [ ] ', requiresNewLine: true, supportsContinuity: true, beforeInsert: expect.any(Function) })
      })

      describe('beforeInsert', () => {
        describe('when preceeding line is empty', () => {
          const mockEditor = {
            getSelection: () => {},
            getModel: () => ({ getValueInRange: () => null })
          }

          it('replaces snippet text with 1', () => {
            expect(SNIPPETS.checkList.beforeInsert(SNIPPETS.checkList.text, mockEditor)).toEqual('1. [ ] ')
          })
        })

        describe('when preceeding line is not empty', () => {
          describe('when preceeding line starts with a number', () => {
            const mockEditor = {
              getSelection: () => {},
              getModel: () => ({ getValueInRange: () => '3' })
            }

            it('replaces snippet text with the number + 1', () => {
              expect(SNIPPETS.checkList.beforeInsert(SNIPPETS.checkList.text, mockEditor)).toEqual('4. [ ] ')
            })
          })

          describe('when preceeding line does not start with a number', () => {
            const mockEditor = {
              getSelection: () => {},
              getModel: () => ({ getValueInRange: () => 'foo' })
            }

            it('does not replace snippet text', () => {
              expect(SNIPPETS.checkList.beforeInsert(SNIPPETS.checkList.text, mockEditor)).toEqual(SNIPPETS.checkList.text)
            })
          })
        })
      })
    })
  })

  describe('registerSnippets', () => {
    let registeredSnippets = {}

    const mockedMonaco = {
      languages: {
        registerCompletionItemProvider: (lang, opts) => (registeredSnippets[lang] = opts),
        CompletionItemKind: { // https://microsoft.github.io/monaco-editor/docs.html#enums/languages.CompletionItemKind.html
          Snippet: 27 // https://microsoft.github.io/monaco-editor/docs.html#enums/languages.CompletionItemKind.html#Snippet
        },
        CompletionItemInsertTextRule: { // https://microsoft.github.io/monaco-editor/docs.html#enums/languages.CompletionItemInsertTextRule.html
          InsertAsSnippet: 4 // https://microsoft.github.io/monaco-editor/docs.html#enums/languages.CompletionItemInsertTextRule.html#InsertAsSnippet
        }
      }
    }

    it('registers the snippets in Monaco editor', () => {
      registerSnippets(mockedMonaco)

      const registeredMarkdownSnippets = registeredSnippets['markdown']
      expect(Object.keys(registeredMarkdownSnippets)).toEqual(['provideCompletionItems'])

      const completionItems = registeredMarkdownSnippets.provideCompletionItems()
      expect(Object.keys(completionItems)).toEqual(['suggestions'])

      expect(completionItems.suggestions.length).toEqual(Object.keys(SNIPPETS).length)
      expect(completionItems.suggestions).toEqual(
        expect.arrayContaining([
          {
            insertText: SNIPPETS.heading.text,
            insertTextRules: 4,
            kind: 27,
            label: 'heading'
          }
        ])
      )
    })
  })

  describe('editor usage', () => {
    const mockedEditorInsert = jest.fn()

    const mockedEditorGetValueInRange = jest.fn().mockImplementation(() => '')
    const editorSelection = {
      endColumn: 3, endLineNumber: 8,
      positionColumn: 3, positionLineNumber: 8,
      selectionStartColumn: 3, selectionStartLineNumber: 8,
      startColumn: 3, startLineNumber: 8
    }

    class MockContext {
      constructor(key, defaultValue) {
        this.key = key
        this.defaultValue = defaultValue
        this.value = null
      }

      get() {
        return this.value || this.defaultValue
      }

      set(value) {
        this.value = value
        return null
      }
    }

    describe('setupCommands', () => {
      let addedCommands = {}

      const mockedEditor = {
        addCommand: (keybinding, handler, context) => (addedCommands[keybinding] = { context, handler }),
        getSelection: () => editorSelection,
        getModel: () => ({ getValueInRange: mockedEditorGetValueInRange }),
        getPosition: () => ({ column: 1 }),
        getContribution: jest.fn().mockImplementation(() => ({ insert: mockedEditorInsert })),
        focus: jest.fn(),
        trigger: jest.fn()
      }

      describe('enter key pressed (continuity support)', () => {
        it('sets up command on enter key', () => {
          setupCommands(mockedEditor)

          const command = addedCommands[3]

          expect(command.context).toEqual('continuedSnippet')
          expect(command.handler).not.toEqual(null)
        })

        describe('command function', () => {
          beforeEach(() => {
            testExports.continuedSnippet('numberedList', { createContextKey: (key, defaultValue) => new MockContext(key, defaultValue) })

            setupCommands(mockedEditor)
          })

          it('reads the line for current value', () => {
            addedCommands[3].handler(mockedEditor)

            expect(mockedEditorGetValueInRange).toHaveBeenCalledWith({ ...editorSelection, startColumn: 1 })
          })

          describe('when line is equal to the snippet text', () => {
            beforeEach(() => {
              mockedEditor.getModel = () => ({ getValueInRange: () => '1. ' })
            })

            it('clears it', () => {
              addedCommands[3].handler(mockedEditor)
              expect(mockedEditor.trigger).toHaveBeenCalledWith('', 'deleteAllLeft')
            })
          })

          describe('when line is not equal to the snippet text', () => {
            beforeEach(() => {
              mockedEditor.getModel = () => ({ getValueInRange: () => '1. test' })
            })

            // no idea how to spy on the insertSnippet here :(
            xit('inserts the snippet', () => {
              addedCommands[3].handler(mockedEditor)
              expect(insertSnippet).toHaveBeenCalledWith('numberedList', mockedEditor)
            })
          })
        })
      })
    })

    describe('insertSnippet', () => {
      const mockedEditor = {
        getSelection: () => editorSelection,
        getModel: () => ({ getValueInRange: mockedEditorGetValueInRange }),
        getPosition: jest.fn().mockImplementation(() => ({ column: 1 })),
        getContribution: jest.fn().mockImplementation(() => ({ insert: mockedEditorInsert })),
        focus: jest.fn(),
        createContextKey: (key, defaultValue) => new MockContext(key, defaultValue)
      }

      it('reads the selected text', async () => {
        await insertSnippet('bold', mockedEditor)

        expect(mockedEditorGetValueInRange).toHaveBeenCalledWith(editorSelection)
      })

      describe('preparing the snippet', () => {
        describe('when there is any selectedText', () => {
          describe('when selection is not multiline', () => {
            beforeEach(() => {
              mockedEditorGetValueInRange.mockImplementationOnce(() => 'foo')
            })

            describe('when snippet text includes snippet name', () => {
              it('replaces the name with the selected text', async () => {
                // __bold__ => __foo__
                await insertSnippet('bold', mockedEditor)

                expect(mockedEditorInsert).toHaveBeenCalledWith('__${1:foo}__')
              })
            })

            describe('when snippet text does not include the snippet name', () => {
              it('concats selected text to it', async () => {
                // ### => ### foo

                await insertSnippet('heading', mockedEditor)

                expect(mockedEditorInsert).toHaveBeenCalledWith('### foo')
              })
            })
          })

          describe('when selection is multiline', () => {
            beforeEach(() => {
              mockedEditorGetValueInRange.mockImplementationOnce(() => 'foo\nbar')
            })

            describe('when snippet text includes snippet name', () => {
              it('replaces the name with the selected text for each line', async () => {
                // __bold__ => __foo__
                await insertSnippet('bold', mockedEditor)

                expect(mockedEditorInsert).toHaveBeenCalledWith('__${1:foo}__\n__${1:bar}__')
              })
            })

            describe('when snippet text does not include the snippet name', () => {
              it('concats selected text to it', async () => {
                // ### => ### foo

                await insertSnippet('heading', mockedEditor)

                expect(mockedEditorInsert).toHaveBeenCalledWith('### foo\n### bar')
              })
            })
          })
        })

        describe('when snippet has beforeInsert', () => {
          it('calls it', async () => {
            await insertSnippet('numberedList', mockedEditor)

            expect(mockedEditorInsert).toHaveBeenCalledWith('1. ')
          })
        })

        describe('when cursor is not positioned in first column', () => {
          beforeEach(() => {
            mockedEditor.getPosition.mockImplementationOnce(() => ({ column: 2 }))
          })

          describe('when snippet requries new line', () => {
            it('prefixes the text with new line char', async () => {
              await insertSnippet('quote', mockedEditor)

              expect(mockedEditorInsert).toHaveBeenCalledWith('\n> ')
            })
          })

          describe('when snippet does not require new line', () => {
            it('does not prefix the text with new line char', async () => {
              await insertSnippet('bold', mockedEditor)

              expect(mockedEditorInsert).toHaveBeenCalledWith('__${1:bold}__')
            })
          })
        })

        describe('when cursor is positioned in first column', () => {
          describe('when snippet requries new line', () => {
            it('does not prefix the text with new line char', async () => {
              await insertSnippet('quote', mockedEditor)

              expect(mockedEditorInsert).toHaveBeenCalledWith('> ')
            })
          })

          describe('when snippet does not require new line', () => {
            it('does not prefix the text with new line char', async () => {
              await insertSnippet('bold', mockedEditor)

              expect(mockedEditorInsert).toHaveBeenCalledWith('__${1:bold}__')
            })
          })
        })
      })

      it('focuses back on the editor', async () => {
        await insertSnippet('bold', mockedEditor)

        expect(mockedEditor.focus).toHaveBeenCalled()
      })
    })
  })
})
