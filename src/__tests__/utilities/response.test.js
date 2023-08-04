import { handleResponseResult } from '~su/utilities/response'
import store from '~su/store'
import ResponseResult from '~su/components/ResponseResult'

jest.mock('~su/store', () => ({
  showModal: jest.fn()
}))

describe('Response utilities', () => {
  describe('handleResponseResult', () => {
    it('calls showModal with proper parameters', () => {
      const mockProps = {
        response: { success: true, message: 'Record created', actions: [{ name: 'fake' }] },
        isLoading: true
      }

      handleResponseResult(mockProps)
      expect(store.showModal).toHaveBeenCalledWith({
        closable: false,
        maskClosable: false,
        width: '50%',
        children: <ResponseResult {...mockProps} />
      })
    })

    describe('when response does not have any actions', () => {
      it('calls showModal with proper parameters and closable true', () => {
        const mockProps = {
          response: { success: true, message: 'Record created' }
        }

        handleResponseResult(mockProps)
        expect(store.showModal).toHaveBeenCalledWith({
          closable: true,
          maskClosable: true,
          width: '50%',
          children: <ResponseResult {...mockProps} />
        })
      })
    })

    describe('when response is not success', () => {
      describe('when response has message', () => {
        it('calls showModal with response message', () => {
          const mockProps = {
            response: { success: false, message: 'Failed to act' }
          }

          handleResponseResult(mockProps)
          expect(store.showModal).toBeCalledWith({
            closable: true,
            maskClosable: true,
            width: '50%',
            children: <ResponseResult response={{ success: false, message: 'Failed to act' }} />
          })
        })
      })

      describe('when response does not have message (ie BE throwing 500)', () => {
        it('calls showModal with "Something went wrong"', () => {
          // replicated response from fetchJson, might need to revise how it handles failures
          const mockProps = {
            response: { error: 'Network Error' }
          }

          handleResponseResult(mockProps)
          expect(store.showModal).toBeCalledWith({
            closable: true,
            maskClosable: true,
            width: '50%',
            children: <ResponseResult response={{ message: 'Something went wrong.', error: 'Network Error' }} />
          })
        })
      })
    })
  })
})
