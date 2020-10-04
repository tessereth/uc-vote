import React, { useState } from 'react'
import { fetchPost } from '../util/fetch_helpers'

const GenerateTokenForm = ({ election, setTokenData}) => {
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    fetchPost(
      `/api/admin/elections/${election.get('slug')}/tokens`,
      { count: count })
      .then(res => setTokenData(res))
      .catch(console.log)
      .then(() => setLoading(false))
  }

  return (
    <form onSubmit={onSubmit}>
      <label className="label">Generate tokens</label>
      <div className="field has-addons">
        <div className="control">
          <input className="input" type="number" value={count} onChange={e => setCount(e.target.value)} />
        </div>
        <div className="control">
          <button className="button is-primary" disabled={loading}>
            Generate
          </button>
        </div>
      </div>
    </form>
  )
}

export default GenerateTokenForm
