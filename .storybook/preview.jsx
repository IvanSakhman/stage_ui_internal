import StyleProvider from '~su/App/styleProvider'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <StyleProvider>
        <Story />
      </StyleProvider>
    )
  ]
}

export default preview
