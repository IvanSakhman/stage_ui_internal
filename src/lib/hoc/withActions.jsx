import { useMessage } from '~su/hooks'

const withActions = (Component, componentActions) => (props) => {
  const message = useMessage()

  let extendedActions = {}

  Object.keys(componentActions).forEach((actionName) => {
    extendedActions[actionName] = (originalParams = {}) => componentActions[actionName]({ ...originalParams, message })
  })

  return <Component {...props} {...extendedActions} />
}

export default withActions
