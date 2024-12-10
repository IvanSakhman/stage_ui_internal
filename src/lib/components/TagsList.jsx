import PropTypes from 'prop-types'

import number from '~su/utilities/number'
import { object } from '~su/utilities'

import Tag from './Tag'
import Space from './Space'

const TagsList = ({ tags, tagSize = 'default', ...space }) => {
  const renderTag = (tag, index) => {
    const key = `${object.isObject(tag) ? tag.children : tag}_${index}_${number.randomInt()}`,
      value = tag

    return (
      <Tag
        key={key}
        size={tagSize}
        {...(object.isObject(tag) ? { children: tag.children, color: tag.color } : { children: value })}
      />
    )
  }

  return tags ? (
    <Space size={[2, 4]} {...space}>
      {tags.map(renderTag)}
    </Space>
  ) : null
}

TagsList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        children: PropTypes.node.isRequired
      })
    ])
  ),
  size: PropTypes.oneOf(['large', 'default', null])
}

export default TagsList
