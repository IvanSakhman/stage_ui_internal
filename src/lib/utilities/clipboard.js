import canWorkInBrowser from '~su/utilities/canWorkInBrowser'

const write = (newClip, messageApi) => {
  if (canWorkInBrowser()) {
    navigator.clipboard.writeText(JSON.stringify(newClip)).then(
      () => {
        messageApi.success('Copied!')
      },
      () => {
        messageApi.error('Copying has failed.')
      }
    )
  }
}

const read = () => {
  return canWorkInBrowser() ? navigator.clipboard.readText() : null
}

const readIf = (regexp) => {
  return read().then((clipText) => {
    return clipText.match(regexp) ? clipText : null
  })
}

export default { write, read, readIf }
