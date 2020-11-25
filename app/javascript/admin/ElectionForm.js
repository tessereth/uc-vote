import React, { useState } from 'react'
import { fetchPatch } from '../util/fetch_helpers'
import classnames from 'classnames'

const ElectionForm = ({ loading, election, onSubmit }) => {
  const [modifiedElection, setModifiedElection] = useState(election)

  return (
    <form onSubmit={e => onSubmit(e, modifiedElection)}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={modifiedElection.get('name', '')}
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
            value={modifiedElection.get('slug', '')}
            onChange={e => setModifiedElection(modifiedElection.set('slug', e.target.value))}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            className="textarea"
            value={modifiedElection.get('description', '')}
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
      <div className="field">
        <label className="label">Primary</label>
        <input
          className="is-checkradio"
          name="primary"
          id="primary"
          type="checkbox"
          checked={modifiedElection.get('primary', false)}
          onChange={e => setModifiedElection(modifiedElection.set('primary', e.target.checked))}
        />
        <label htmlFor="primary">Primary</label>
      </div>
      <button
        disabled={loading}
        className={classnames('button is-primary', {'is-loading': loading})}
      >Save</button>
    </form>
  )
}

export default ElectionForm
