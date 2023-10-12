const isBrowser = typeof window !== 'undefined'

const write = (newClip, messageApi) => {
  if (isBrowser) {
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
  return isBrowser ? navigator.clipboard.readText() : null
}

const readIf = (regexp) => {
  return read().then((clipText) => {
    return clipText.match(regexp) ? clipText : null
  })
}

export default { write, read, readIf }
