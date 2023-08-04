import PropTypes from 'prop-types'
import { StyledSystemsMenu } from './index.styled'

const SystemsMenu = ({ systems = [], currentSystem, hostedZone }) => {
  if (!systems.length) {
    return null
  }

  const items = systems.map((system) => {
    return {
      key: system,
      label: (
        <a
          target="_blank"
          href={`https://${system}.${hostedZone}`}
          rel="noreferrer"
          style={{ textTransform: 'capitalize' }}
        >
          {system}
        </a>
      )
    }
  })

  return <StyledSystemsMenu mode="horizontal" items={items} selectedKeys={[currentSystem]} />
}

SystemsMenu.propTypes = {
  systems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentSystem: PropTypes.string.isRequired,
  hostedZone: PropTypes.string.isRequired
}

export default SystemsMenu
