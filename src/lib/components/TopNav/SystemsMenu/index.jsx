import PropTypes from 'prop-types'
import Menu from '~su/components/Menu'

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

  return <Menu mode="horizontal" items={items} selectedKeys={[currentSystem]} style={{ justifyContent: 'center' }} />
}

SystemsMenu.propTypes = {
  systems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentSystem: PropTypes.string.isRequired,
  hostedZone: PropTypes.string.isRequired
}

export default SystemsMenu
