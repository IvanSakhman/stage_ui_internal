import renderErrors from './utilities/renderErrors'
import { Container, List } from './index.styled'

const ErrorsList = ({ errors, bordered }) => {
  if (!errors) {
    return null
  }

  return (
    <Container $bordered={bordered}>
      <List>{renderErrors(errors)}</List>
    </Container>
  )
}

export default ErrorsList
