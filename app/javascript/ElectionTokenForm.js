import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

const ElectionTokenForm = () => {
  const [token, setToken] = useState('')
  const history = useHistory()
  const location = useLocation()

  const onSubmit = e => {
    e.preventDefault()
    history.push({ pathname: `${location.pathname}/vote`, search: `?token=${token}`})
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">Voting code</label>
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
        <button className="button is-primary">Continue</button>
      </div>
    </form>
  )
}

export default ElectionTokenForm
