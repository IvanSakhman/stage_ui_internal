import Pusher from 'pusher-js'

const initializeClient = ({ appKey, logToConsole, ...configuration }) => {
  Pusher.logToConsole = logToConsole

  return new Pusher(appKey, configuration)
}

let _websocketClient = null
export default (configuration) => {
  if (configuration && typeof configuration === 'object') {
    _websocketClient = initializeClient(configuration)
  }

  return _websocketClient
}
