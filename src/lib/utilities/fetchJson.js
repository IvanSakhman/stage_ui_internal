// import parseLinkHeader from 'parse-link-header'
import 'whatwg-fetch'
import baseUrl from './baseUrl'

export default {
  // put(url: any, body: any)
  put(url, body) {
    return fetchJson('PUT', url, body)
  },
  // put(url: any, body: any)
  patch(url, body) {
    return fetchJson('PATCH', url, body)
  },
  // delete(url: any)
  delete(url) {
    return fetchJson('DELETE', url)
  },
  // post(url: any, body: any)
  post(url, body) {
    return fetchJson('POST', url, body)
  },
  // get(url: any)
  get(url, headers = {}) {
    return fetchJson('GET', url, null, headers)
  }
}

// private
async function fetchJson(method, url, body = null, headers = {}) {
  const BASE_URL = baseUrl()
  // opts: RequestInit
  const opts = {
    method: method.toUpperCase(),
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Expires: '-1',
      Pragma: 'no-cache',
      ...headers
    }
  }

  if (method !== 'GET') {
    const csrfToken = document.querySelector("[name='csrf-token']")?.content

    if (csrfToken) {
      opts.headers['X-CSRF-Token'] = csrfToken
    }
  }

  if (body) {
    opts.body = JSON.stringify(body)
  }

  let fetchUrl = BASE_URL + url
  if (BASE_URL && url.substring(0, 1) !== '/') {
    fetchUrl = BASE_URL + '/' + url
  }

  // let response: Response
  let response
  try {
    response = await fetch(fetchUrl, opts)
    if (response.redirected) {
      window.location.href = response.url
      return {}
    }
  } catch (error) {
    console.dir(error)
    return {
      error: 'Network error'
    }
  }

  try {
    const responseBody = response.status === 204 ? {} : await response.json()
    return { success: response.ok, status: response.status, ...responseBody }
  } catch {
    // An error parsing JSON. This is unexepected, log to console
    // Send a more generic message in response
    console.error(response)
    return { success: response.ok, status: response.status, error: 'Server responded not ok' }
  }
}
