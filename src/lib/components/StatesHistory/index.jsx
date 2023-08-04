import Space from '../Space'
import StateBadge from '../StateBadge'

export default ({ states, configuration = {}, Representation = StateBadge, representationProps = {} }) => {
  // NOTE: supports StateTag as well

  return (
    <Space size={5}>
      {states.map((state, index) => (
        <Representation key={index} state={state} configuration={configuration} {...representationProps} />
      ))}
    </Space>
  )
}
