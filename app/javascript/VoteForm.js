import React, { useState } from 'react'
import { fetchPost } from './util/fetch_helpers'
import classnames from 'classnames'
import { Map as ImmMap } from 'immutable'

const VoteForm = ({ election }) => {
  const [loading, setLoading] = useState(false)
  const [votes, setVotes] = useState(ImmMap())

  const onClick = candidateId => e => {
    setVotes(votes.set(candidateId, e.target.checked))
  }

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    fetchPost(
      '/api/elections/' + election.get('id') + '/votes',
      { vote: votes.toJS() })
      .then(console.log)
      // TODO: Show error message
      .catch(() => setLoading(false))
  }

  return (
    <section className="section">
      <div className="container">
        <form onSubmit={onSubmit}>
          {election.get('positions').map(position => (
            <div key={position.get('id')} className="content">
              <h2 className="subtitle">{position.get('name')}</h2>
              {position.get('candidates').map(candidate => (
                <div className="field" key={candidate.get('id')}>
                  <div className="control">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={votes.get(candidate.get('id'), false)}
                        onChange={onClick(candidate.get('id'))}
                      />
                      &nbsp;{candidate.get('name')}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button
            disabled={loading}
            className={classnames('button is-primary', {'is-loading': loading})}
          >Submit</button>
        </form>
      </div>
    </section>
  )
}

export default VoteForm
