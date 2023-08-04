import { useState } from 'react'
import PropTypes from 'prop-types'

import ButtonGroup from '~su/components/ButtonGroup'
import Card from '~su/components/Card'
import { Col, Row } from '~su/components/Grid'
import Switch from '~su/components/Switch'

const PanedCard = ({ initialVisiblePanes, panes, renderTitle }) => {
  const [visiblePanes, setVisiblePanes] = useState(initialVisiblePanes)

  const togglePane = (on, paneName) => {
    setVisiblePanes(
      on ? [...visiblePanes, paneName] : visiblePanes.filter((visiblePaneName) => visiblePaneName !== paneName)
    )
  }

  const renderPanesControls = () => {
    return (
      <ButtonGroup>
        {Object.keys(panes).map((paneName, index) => {
          return (
            <Switch
              key={index}
              checkedChildren={paneName}
              unCheckedChildren={paneName}
              defaultChecked={visiblePanes.includes(paneName)}
              onChange={(checked) => togglePane(checked, paneName)}
            />
          )
        })}
      </ButtonGroup>
    )
  }

  const paneSpan = 24 / visiblePanes.length

  return (
    <Card title={renderTitle(visiblePanes)} extra={renderPanesControls()}>
      <Row gutter={[24, 0]}>
        {Object.keys(panes).map((paneName, index) => {
          return (
            <Col key={index} span={visiblePanes.includes(paneName) ? paneSpan : 0}>
              {panes[paneName]()}
            </Col>
          )
        })}
      </Row>
    </Card>
  )
}

PanedCard.propTypes = {
  initialVisiblePanes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  panes: PropTypes.object.isRequired,
  renderTitle: PropTypes.func.isRequired
}

export default PanedCard
