const write = (newClip, messageApi) => {
  navigator.clipboard.writeText(JSON.stringify(newClip)).then(
    () => {
      messageApi.success('Copied!')
    },
    () => {
      messageApi.error('Copying has failed.')
    }
  )
}

const read = () => {
  return navigator.clipboard.readText()
}

const readIf = (regexp) => {
  return read().then((clipText) => {
    return clipText.match(regexp) ? clipText : null
  })
}

export default { write, read, readIf }
