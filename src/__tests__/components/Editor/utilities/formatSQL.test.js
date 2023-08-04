import { prepareSQL, formatSQL, refineSQL } from '~su/components/Editor/utilities/formatSQL'

describe('prepareSQL', () => {
  it('does nothing when no rule matched', () => {
    let sqlText = 'SELECT\n  client\nFROM\n  table_name'

    expect(prepareSQL(sqlText)).toEqual('SELECT\n  client\nFROM\n  table_name')
  })

  describe('when dependent query macro is present', () => {
    it("replaces '#' with 'HASH'", () => {
      let sqlText = 'SELECT * FROM {{Query#1}}'

      expect(prepareSQL(sqlText)).toEqual('SELECT * FROM {{QueryHASH1}}')
    })
  })
})

describe('formatSQL', () => {
  it('returns the formatted query', () => {
    const queryText = 'SELECT client FROM table_name'
    const selectedText = null

    expect(formatSQL(queryText, selectedText)).toEqual(`SELECT\n  client\nFROM\n  table_name`)
  })

  describe('when selectedText is present', () => {
    it('formats only the selected text of the query', () => {
      const queryText = 'SELECT client FROM table_name'
      const selectedText = 'FROM table_name'

      expect(formatSQL(queryText, selectedText)).toEqual(`SELECT client FROM\n  table_name`)
    })
  })

  describe('when MACRO parens are present', () => {
    it('does not format them', () => {
      const queryText = 'SELECT client FROM table_name where date = {{yesterday}} '
      const selectedText = null

      expect(formatSQL(queryText, selectedText)).toEqual(
        `SELECT\n  client\nFROM\n  table_name\nwhere\n  date = {{yesterday}}`
      )
    })

    describe('when MACRO contains #', () => {
      it('does not introduce extra spaces within it', () => {
        const queryText = 'SELECT client FROM {{Query#1}} where date = {{yesterday}} '
        const selectedText = null

        expect(formatSQL(queryText, selectedText)).toEqual(
          `SELECT\n  client\nFROM\n   {{Query#1}}\nwhere\n  date = {{yesterday}}`
        )
      })
    })
  })

  describe('when elements commas separated', () => {
    it('does not split the elements', () => {
      const queryText = 'SELECT name, last_name FROM person'
      const selectedText = null

      expect(formatSQL(queryText, selectedText)).toEqual(`SELECT\n  name,\n  last_name\nFROM\n  person`)
    })
  })

  describe('when digits commas sperated', () => {
    it('does not split the digits', () => {
      const queryText = 'SELECT name, last_name FROM person GROUP BY 1, 2, 3'
      const selectedText = null

      expect(formatSQL(queryText, selectedText)).toEqual(
        `SELECT\n  name,\n  last_name\nFROM\n  person\nGROUP BY 1, 2, 3`
      )
    })
  })

  describe('when digits commas sperated interpolated with new lines', () => {
    it('does not split the digits', () => {
      const queryText = 'SELECT name, last_name FROM person GROUP BY 1,\n2,\n3'
      const selectedText = null

      expect(formatSQL(queryText, selectedText)).toEqual(
        `SELECT\n  name,\n  last_name\nFROM\n  person\nGROUP BY 1, 2, 3`
      )
    })
  })

  describe('with Presto concat operator', () => {
    it('does not separate the operator with spaces', () => {
      const queryText = "SELECT client FROM {{Query#1}} where name = '(Client: ' || client || ')'"
      const selectedText = null

      expect(formatSQL(queryText, selectedText)).toEqual(
        `SELECT\n  client\nFROM\n   {{Query#1}}\nwhere\n  name = '(Client: ' || client || ')'`
      )
    })
  })

  describe('with Presto lambda operator', () => {
    it('does not separate the operator with spaces', () => {
      const queryText = 'SELECT client, region FROM {{Query#1}} where name -> client + region'
      const selectedText = null

      expect(formatSQL(queryText, selectedText)).toEqual(
        `SELECT\n  client,\n  region\nFROM\n   {{Query#1}}\nwhere\n  name -> client + region`
      )
    })
  })

  describe('with Presto array subscript', () => {
    it('does not separate the code with spaces', () => {
      const queryText = `SELECT names FROM {{Query#1}} where name = names[ 1 ]`
      const selectedText = null

      expect(formatSQL(queryText, selectedText)).toEqual(
        `SELECT\n  names\nFROM\n   {{Query#1}}\nwhere\n  name = names[1]`
      )
    })
  })
})

describe('refineSQL', () => {
  it('does nothing when no rule matched', () => {
    let sqlText = 'SELECT\n  client\nFROM\n  table_name'

    expect(refineSQL(sqlText)).toEqual('SELECT\n  client\nFROM\n  table_name')
  })

  describe('when MACRO parens are preceeded by =', () => {
    it('adds white space between', () => {
      let sqlText = '={{yesterday}}'

      expect(refineSQL(sqlText)).toEqual('= {{yesterday}}')
    })
  })

  describe('when dependent query macro is used', () => {
    it('removes the spaces', () => {
      let sqlText = 'SELECT * FROM{{QueryHASH1}}'

      expect(refineSQL(sqlText)).toEqual('SELECT * FROM {{Query#1}}')
    })
  })

  describe('when concatenation operator is space spearated', () => {
    it('removes the spaces', () => {
      let sqlText = "SELECT client FROM {{Query#1}} where name = '(Client: ' | | client | | ')'"

      expect(refineSQL(sqlText)).toEqual("SELECT client FROM {{Query#1}} where name = '(Client: ' || client || ')'")
    })
  })

  describe('when lambda operator is space spearated', () => {
    it('removes the spaces', () => {
      let sqlText = 'SELECT client, region FROM {{Query#1}} where name - > client + region'

      expect(refineSQL(sqlText)).toEqual('SELECT client, region FROM {{Query#1}} where name -> client + region')
    })
  })

  describe('when array subscript operator is space spearated', () => {
    it('removes the spaces', () => {
      let sqlText = 'SELECT names FROM {{Query#1}} where name = names [1]'

      expect(refineSQL(sqlText)).toEqual('SELECT names FROM {{Query#1}} where name = names[1]')
    })
  })

  describe('when multiline comment is present', () => {
    it('removes the space before comment closing tag', () => {
      let sqlText = '/* Multi line comment\n' + ' */'

      expect(refineSQL(sqlText)).toEqual('/* Multi line comment\n' + '*/')
    })
  })
})
