import string from '../../../utilities/string'

import { List, ListItem } from '../index.styled'

const renderErrors = (errors) =>
  Object.entries(errors).map(([key, value]) => {
    let content
    const isNumberKey = !isNaN(key)
    const isNestedList = typeof value === 'object' && !Array.isArray(value)

    if (isNumberKey && !isNestedList) {
      content = string.humanize(value[0], { capitalize: true })
    } else {
      const propertyName = string.humanize(key, { capitalize: true })
      if (isNestedList) {
        content = (
          <>
            {`${propertyName}:`}
            <List>{renderErrors(value)}</List>
          </>
        )
      } else {
        content = `${propertyName} ${value}`
      }
    }

    return <ListItem key={key}>{content}</ListItem>
  })

export default renderErrors
