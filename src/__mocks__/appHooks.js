const open = jest.fn()
const success = jest.fn()
const error = jest.fn()
const info = jest.fn()
const warning = jest.fn()

export const message = {
  open,
  success,
  error,
  info,
  warning,
  loading: jest.fn()
}

export const modal = {
  info,
  success,
  error,
  warning,
  confirm: jest.fn()
}

export const notification = {
  success,
  error,
  info,
  warning,
  open,
  destroy: jest.fn()
}
