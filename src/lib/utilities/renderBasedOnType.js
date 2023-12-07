import TagsList from '~su/components/TagsList'
import YesNoTag from '~su/components/YesNoTag'

export default (type, value) => {
  switch (type) {
    case 'boolean':
      return <YesNoTag yes={value} />
    case 'array':
      return <TagsList tags={value} wrap />
    default:
      return value
  }
}
