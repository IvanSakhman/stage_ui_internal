import { SNIPPETS, registerSnippets, setupCommands, insertSnippet } from '~su/components/MarkdownEditor/utilities'

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

    it('defines numberedList snippet', () => {
      expect(SNIPPETS.numberedList).toEqual({ text: 'N. ', requiresNewLine: true, supportsContinuity: true, beforeInsert: expect.any(Function) })
    })

    // TODO rest
  })

  describe('registerSnippets', () => {
    // TOOD
  })

  describe('setupCommands', () => {
    // TOOD
    describe('enter key pressed (continuity support)', () => {
      // TOOD
    })
  })

  describe('insertSnippet', () => {
    // TODO
  })
})
