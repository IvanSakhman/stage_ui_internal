import PropTypes from 'prop-types'
import { Typography, Flex } from '~su/components'
import { Icon } from '../PillButton/index.styled'
import checkIcon from '../../assets/check.svg'

const { Text } = Typography

const FeaturesList = ({ items }) => {
  return (
    <Flex vertical gap={8}>
      {items.map((item) => (
        <Flex align="center" key={item}>
          <Icon src={checkIcon} alt="Check icon" width="18px" height="16px" $marginRight="0.5rem" />
          <Text>{item}</Text>
        </Flex>
      ))}
    </Flex>
  )
}

FeaturesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default FeaturesList
