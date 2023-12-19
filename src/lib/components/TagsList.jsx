import PropTypes from 'prop-types'

import number from '~su/utilities/number'

import Tag from './Tag'
import Space from './Space'

const TagsList = ({ tags, tagSize = 'default', ...space }) => {
  const renderTag = (tag, index) => {
    const key = `${tag}_${index}_${number.randomInt()}`,
      value = tag

    return (
      <Tag key={key} size={tagSize}>
        {value}
      </Tag>
    )
  }

  return tags ? (
    <Space size={[2, 4]} {...space}>
      {tags.map(renderTag)}
    </Space>
  ) : null
}

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(['large', 'default', null])
}

export default TagsList
