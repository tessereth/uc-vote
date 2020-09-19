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
}

export function fetchPost(url, params={}) {
  console.log(params)
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
}

function defaultHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
  }
}
