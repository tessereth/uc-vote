import React, { useState } from 'react'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import { fetchPost } from './util/fetch_helpers'

const ElectionTokenForm = () => {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    fetchPost('/api/elections/token', {token})
      .then(res => history.push('/elections/' + res.get('id')))
      // TODO: Show error message
      .catch(() => setLoading(false))
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">Election code</label>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="XXXXXX"
                value={token}
                onChange={e => setToken(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="control">
        <button
          disabled={loading}
          className={classnames('button is-primary', {'is-loading': loading})}
        >Submit</button>
      </div>
    </form>
  )
}

export default ElectionTokenForm
