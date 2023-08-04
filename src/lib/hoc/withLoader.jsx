import { Result, Spin } from 'antd'

const withLoader = (Content) => (props) => {
  if (!Content) {
    Content = () => props.text
  }

  if (props && (!props.isLoaded || props.isLoading)) {
    return <Result icon={<Spin size="large" />} title="Loading..." />
  }

  return <Content {...props} />
}

export default withLoader
