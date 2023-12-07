import number from '~su/utilities/number'

import Tag from './Tag'
import Space from './Space'

const TagsList = ({ tags, ...space }) => {
  const renderTag = (tag, index) => {
    const key = `${tag}_${index}_${number.randomInt()}`,
      value = tag

    return <Tag key={key}>{value}</Tag>
  }

  return tags ? (
    <Space size={[2, 4]} {...space}>
      {tags.map(renderTag)}
    </Space>
  ) : null
}

export default TagsList
