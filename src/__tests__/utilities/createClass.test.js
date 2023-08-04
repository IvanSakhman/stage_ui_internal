import createClass from '~su/utilities/createClass';

describe('createClass', () => {
  it('creates a class with defined properties', () => {
    const CreatedClass = createClass({ a: null })
    expect(new CreatedClass({ a: 'testInit' }).a).toEqual('testInit');
  });

  describe('when createdClass has defaults', () => {
    it('sets them', () => {
      const CreatedClass = createClass({ a: 'testDefault', })
      expect(new CreatedClass().a).toEqual('testDefault');
    })
  });
});
