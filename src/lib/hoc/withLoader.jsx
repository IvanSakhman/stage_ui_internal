import LoadingBlock from '~su/components/LoadingBlock'

const withLoader =
  (Content, options = {}) =>
  (props = {}) => {
    if (!Content) {
      Content = () => props.text
    }

    const { isLoaded, isLoading, ...restProps } = props

    const componentProps = options.preventLoadingFlagsPassing ? restProps : props

    if (props && (!isLoaded || isLoading)) {
      const loadingBlockProps = {
        size: 'large',
        showTip: true,
        ...options.loadingBlock
      }

      return (
        <LoadingBlock {...loadingBlockProps}>
          {options.embeddedMode ? <Content {...componentProps} /> : null}
        </LoadingBlock>
      )
    }

    return <Content {...componentProps} />
  }

export default withLoader
