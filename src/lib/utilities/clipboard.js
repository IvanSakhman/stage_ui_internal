import { message } from 'antd'

const write = (newClip) => {
  navigator.clipboard.writeText(JSON.stringify(newClip)).then(
    () => {
      message.success('Copied!')
    },
    () => {
      message.error('Copying has failed.')
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
