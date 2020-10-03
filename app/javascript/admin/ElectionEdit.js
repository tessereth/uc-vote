import React, { useState } from 'react'
import { fetchPatch } from '../util/fetch_helpers'
import classnames from 'classnames'

const ElectionEdit = ({ election, setElection }) => {
  const [modifiedElection, setModifiedElection] = useState(election)
  const [loading, setLoading] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    fetchPatch(
      `/api/admin/elections/${election.get('slug')}`,
      { election: modifiedElection.toJS() })
      .then(res => setElection(res))
      .catch(console.log)
      .then(() => setLoading(false))
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={modifiedElection.get('name')}
            onChange={e => setModifiedElection(modifiedElection.set('name', e.target.value))}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Slug</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={modifiedElection.get('slug')}
            onChange={e => setModifiedElection(modifiedElection.set('slug', e.target.value))}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            className="textarea"
            value={modifiedElection.get('description')}
            onChange={e => setModifiedElection(modifiedElection.set('description', e.target.value))}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">State</label>
        <div className="control">
          <input
            className="is-checkradio"
            name="state"
            id="state-pending"
            type="radio"
            value="pending"
            checked={modifiedElection.get('state') === 'pending'}
            onChange={e => setModifiedElection(modifiedElection.set('state', e.target.value))}
          />
          <label htmlFor="state-pending">Pending</label>
          <input
            className="is-checkradio"
            name="state"
            id="state-open"
            type="radio"
            value="open"
            checked={modifiedElection.get('state') === 'open'}
            onChange={e => setModifiedElection(modifiedElection.set('state', e.target.value))}
          />
          <label htmlFor="state-open">Open</label>
          <input
            className="is-checkradio"
            name="state"
            id="state-closed"
            type="radio"
            value="closed"
            checked={modifiedElection.get('state') === 'closed'}
            onChange={e => setModifiedElection(modifiedElection.set('state', e.target.value))}
          />
          <label htmlFor="state-closed">Closed</label>
        </div>
      </div>
      <div className="field">
        <label className="label">Visibility</label>
        <div className="control">
          <input
            className="is-checkradio"
            name="visibility"
            id="visibility-private"
            type="radio"
            value="private"
            checked={modifiedElection.get('visibility') === 'private'}
            onChange={e => setModifiedElection(modifiedElection.set('visibility', e.target.value))}
          />
          <label htmlFor="visibility-private">Private</label>
          <input
            className="is-checkradio"
            name="visibility"
            id="visibility-public"
            type="radio"
            value="public"
            checked={modifiedElection.get('visibility') === 'public'}
            onChange={e => setModifiedElection(modifiedElection.set('visibility', e.target.value))}
          />
          <label htmlFor="visibility-public">Public</label>
        </div>
      </div>
      <button
        disabled={loading}
        className={classnames('button is-primary', {'is-loading': loading})}
      >Save</button>
    </form>
  )
}

export default ElectionEdit
