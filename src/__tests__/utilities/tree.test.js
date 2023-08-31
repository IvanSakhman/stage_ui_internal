import treeUtilities from '~su/utilities/tree';

const { findNode, tryUpdateNode, updateNode, deleteNode } = treeUtilities

const message = {
  open: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  loading: jest.fn()
}

const collection = [
  { name: "top_level_1", key: "tl1" },
  { name: "top_level_2", key: "tl2" },
  { name: "top_level_3", key: "tl3" },
  {
    name: "top_level_4", key: "tl4",
    children: [
      { name: "top_level_4_nested_1", key: "tl4_n1" },
      {
        name: "g:top_level_4_nested_2",
        key: "tl4_n2",
        children: [
          { name: "top_level_4_nested_1_nested_1", key: "tl4_n1_n1" },
        ]
      },
    ]
  }
]

describe('Tree Utilities', () => {
  describe('findNode', () => {
    it('finds a node', () => {
      const result = findNode(collection, 'tl3', 'key')

      expect(result).toEqual(
        { name: "top_level_3", key: "tl3" }
      )
    })

    describe('node is nested', () => {
      it('can find it', () => {
        const result_one_level_deep = findNode(collection, 'tl4_n1', 'key')
        const result_two_levels_deep = findNode(collection, 'tl4_n1_n1', 'key')

        expect(result_one_level_deep).toEqual(
          { name: "top_level_4_nested_1", key: "tl4_n1" }
        )

        expect(result_two_levels_deep).toEqual(
          { name: "top_level_4_nested_1_nested_1", key: "tl4_n1_n1" },
        )
      })
    })
  })

  describe('tryUpdateNode', () => {
    beforeEach(() => {
      message.error = jest.fn()
    })

    it('updates a node', () => {
      expect(findNode(collection, 'tl3', 'key')).toEqual({ name: "top_level_3", key: "tl3" })

      const updatedCollection = tryUpdateNode(message, collection, 'tl3', 'key', { value: 'tl3_value' }, () => true)

      expect(findNode(updatedCollection, 'tl3', 'key')).toEqual(
        { name: "top_level_3", key: "tl3", value: 'tl3_value' }
      )
    })

    describe('updating node threw an error', () => {
      describe('error is custom UpdateNodeError', () => {
        it('catches it and triggers a message.error', () => {
          tryUpdateNode(message, collection, 'tl3', 'key', { value: 'tl3_value' }, () => 'fake error message')

          expect(message.error).toBeCalledWith('Could not update node: fake error message')
        })
      })

      describe('error is not custom UpdateNodeError', () => {
        it('rethrows it', () => {
          expect(() => tryUpdateNode(message, ...collection)).toThrow(TypeError)
        })
      })
    })
  })


  describe('updateNode', () => {
    it('updates a node', () => {
      expect(findNode(collection, 'tl3', 'key')).toEqual({ name: "top_level_3", key: "tl3" })

      const updatedCollection = updateNode(collection, 'tl3', 'key', { value: 'tl3_value' })

      expect(findNode(updatedCollection, 'tl3', 'key')).toEqual(
        { name: "top_level_3", key: "tl3", value: 'tl3_value' }
      )
    })

    describe('node is nested', () => {
      it('can update it', () => {
        expect(findNode(collection, 'tl4_n1', 'key')).toEqual({ name: "top_level_4_nested_1", key: "tl4_n1" })

        const updatedCollection = updateNode(collection, 'tl4_n1', 'key', { value: 'tl4_n1_value' })

        expect(findNode(updatedCollection, 'tl4_n1', 'key')).toEqual(
          { name: "top_level_4_nested_1", key: "tl4_n1", value: 'tl4_n1_value' }
        )
      })
    })
  })

  describe('deleteNode', () => {
    it('deletes a node', () => {
      expect(findNode(collection, 'tl3', 'key')).not.toEqual(null)

      const updatedCollection = deleteNode(collection, 'tl3', 'key')

      expect(findNode(updatedCollection, 'tl3', 'key')).toEqual(null)
    })

    describe('node is nested', () => {
      it('can delete it', () => {
        expect(findNode(collection, 'tl4_n1', 'key')).not.toEqual(null)

        const updatedCollection = deleteNode(collection, 'tl4_n1', 'key')

        expect(findNode(updatedCollection, 'tl4_n1', 'key')).toEqual(null)
      })
    })
  })
});
