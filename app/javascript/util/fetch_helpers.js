import { fromJS } from 'immutable'

export function fetchGet(url, params={}) {
  const urlParams = new URLSearchParams(params)
  return fetch(url + '?' + urlParams.toString(), {
    method: 'GET',
    headers: defaultHeaders()
  })
    .then(res => {
      if (res.ok) {
        return res
      } else {
        throw new Error('Failed to fetch')
      }
    })
    .then(res => res.json())
    .then(fromJS)
}

export function fetchPost(url, params={}) {
  return fetch(url, {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify(params)
  })
    .then(res => {
      if (res.ok) {
        return res
      } else {
        throw new Error('Failed to fetch')
      }
    })
    .then(res => res.json())
    .then(fromJS)
}

function defaultHeaders() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
  }
}
