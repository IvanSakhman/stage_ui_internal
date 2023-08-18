import App from '~su/components/App'

// const withActions = (Component, actions) => (props) => {
//   const { message } = App.useApp()
//
//   const extendActions = (actions) => {
//     let extendedActions = {}
//     Object.keys(actions).forEach((actionName) => {
//       extendedActions[actionName] = (originalParams = {}) => actions[actionName]({ ...originalParams, message })
//     })
//     return extendedActions
//   }
//
//   return <Component api={extendActions(actions)} {...props} />
// }

const withActions = (Component, componentActions) => (props) => {
  const { message } = App.useApp()

  let extendedActions = {}

  Object.keys(componentActions).forEach((actionName) => {
    extendedActions[actionName] = (originalParams = {}) => componentActions[actionName]({ ...originalParams, message })
  })

  return <Component {...props} {...extendedActions} />
}

export default withActions
