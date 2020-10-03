import { fromJS } from 'immutable'

export function fetchGet(url, params={}) {
  const urlParams = new URLSearchParams(params)
  return formatResponse(fetch(url + '?' + urlParams.toString(), {
    method: 'GET',
    headers: defaultHeaders()
  }))
}

export function fetchPost(url, params={}) {
  return formatResponse(fetch(url, {
    method: 'POST',
    headers: defaultHeaders(),
    body: 'toJS' in params ? JSON.stringify(params.toJS()) : JSON.stringify(params)
  }))
}

function formatResponse(res) {
  return res.then(res => res.json().then(json => ({ res, json })))
    .then(res => {
      if (res.res.ok) {
        return res.json
      } else {
        throw new FetchException('Failed to fetch', res.json)
      }
    })
    .then(fromJS)
}

function defaultHeaders() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
  }
}

function FetchException(message, json) {
  const error = new Error(message)
  error.serverMessage = json.error
  return error
}

FetchException.prototype = Object.create(Error.prototype)
