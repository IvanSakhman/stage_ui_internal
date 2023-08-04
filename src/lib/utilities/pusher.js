// NOTE: legacy, replaced by clients/websocketClient.

let _pusher = null
export default function pusher(instance) {
  if (instance && typeof instance === 'object') {
    _pusher = instance
  }
  return _pusher
}
