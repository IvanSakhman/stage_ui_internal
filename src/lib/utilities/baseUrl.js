let _baseUrl = ''

//  baseUrl(value?: string) {
export default function baseUrl(value) {
  if (typeof value === 'string') {
    _baseUrl = value
  }
  return _baseUrl
}
