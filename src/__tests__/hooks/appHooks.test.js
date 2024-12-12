import { renderHook } from '@testing-library/react'
import { useMessage, useModal, useNotification } from '~su/hooks/appHooks'

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  const { message, modal, notification } = jest.requireActual('~mocks/appHooks');

  const { App } = antd;

  App.useApp = () => ({
    message,
    modal,
    notification,
  })

  return {
    ...antd,
    App,
  }
})

describe('test appHooks', () => {
  describe('useMessage hook', () => {
    const { result } = renderHook(() => useMessage())
    const message = result.current

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns an object', () => {
      expect(message).toEqual({
        open: expect.any(Function),
        success: expect.any(Function),
        error: expect.any(Function),
        info: expect.any(Function),
        warning: expect.any(Function),
        loading: expect.any(Function),
      })
    })

    it('shown an error message', () => {
      const errorMessage = 'Error message'

      message.error(errorMessage)

      expect(message.error).toBeCalledWith(errorMessage)
    })

    it('shown an success message', () => {
      const successMessage = 'Success message'

      message.success(successMessage)

      expect(message.success).toBeCalledWith(successMessage)
    })
  })

  describe('useModal hook', () => {
    const { result } = renderHook(() => useModal())
    const modal = result.current

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns an object', () => {
      expect(modal).toEqual({
        info: expect.any(Function),
        success: expect.any(Function),
        error: expect.any(Function),
        warning: expect.any(Function),
        confirm: expect.any(Function)
      })
    })

    it('shown an info modal', () => {
      const info = {
        title: 'This is a info modal',
        content: 'info messages...info messages...'
      }

      modal.info(info)

      expect(modal.info).toBeCalledWith(info)
    })

    it('shown an confirm modal', () => {
      const confirm = {
        title: 'This is a confirm modal',
        content: 'confirm messages...confirm messages...'
      }

      modal.confirm(confirm)

      expect(modal.confirm).toBeCalledWith(confirm)
    })
  })

  describe('useNotification hook', () => {
    const { result } = renderHook(() => useNotification())
    const notification = result.current

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns an object', () => {
      expect(notification).toEqual({
        success: expect.any(Function),
        error: expect.any(Function),
        info: expect.any(Function),
        warning: expect.any(Function),
        open: expect.any(Function),
        destroy: expect.any(Function),
      })
    })

    it('shown an warning notification', () => {
      const warning = {
        message: `Warning notification`,
        description: 'Warning notification in top left corner',
        placement: 'topLeft'
      }

      notification.warning(warning)

      expect(notification.warning).toBeCalledWith(warning)
    })

    it('shown an notification', () => {
      const notificationContent = {
        message: 'Notification Title',
        description:
          'This is the content of the notification.'
      }

      notification.open(notificationContent)

      expect(notification.open).toBeCalledWith(notificationContent)
    })
  })
})