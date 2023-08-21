import App from '~su/components/App'

const withActions = (Component, componentActions) => (props) => {
  const { message } = App.useApp()

  let extendedActions = {}

  Object.keys(componentActions).forEach((actionName) => {
    extendedActions[actionName] = (originalParams = {}) => componentActions[actionName]({ ...originalParams, message })
  })

  return <Component {...props} {...extendedActions} />
}

export default withActions
