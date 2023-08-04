import Tag from '../Tag'
import string from '~su/utilities/string'

export default ({ state, configuration = {} }) => {
  const stateConfig = configuration[state] || configuration.default || { icon: null, color: null }
  let color = stateConfig.color || stateConfig.status

  return (
    <Tag icon={stateConfig.icon} color={color}>
      {string.humanize(state, { capitalize: true })}
    </Tag>
  )
}
