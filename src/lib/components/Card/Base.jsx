import PropTypes from 'prop-types'
import { Card as AntdCard } from 'antd'

import { withLoader } from '~su/hoc'

const ExtendedCard = withLoader(AntdCard, {
  embeddedMode: true,
  preventLoadingFlagsPassing: true,
  loadingBlock: { size: 'small', showTip: false }
})

const Card = ({ loading, ...props }) => {
  return <ExtendedCard isLoaded={!loading} {...props} />
}

Card.propTypes = { loading: PropTypes.bool }

Card.Grid = AntdCard.Grid
Card.Meta = AntdCard.Meta

export default Card
