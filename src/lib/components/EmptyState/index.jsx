import PropTypes from 'prop-types'
import { StyledEmpty } from './index.styled'
import Typography from '../Typography'

const { Title, Paragraph } = Typography

const EmptyState = ({ title, description, image = null, children }) => {
  return (
    <StyledEmpty
      description={
        <Typography>
          <Title level={5}>{title}</Title>
          {description && <Paragraph>{description}</Paragraph>}
        </Typography>
      }
      image={image}
    >
      {children}
    </StyledEmpty>
  )
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.node,
  children: PropTypes.node
}

export default EmptyState
