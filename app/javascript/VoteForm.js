import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchPost } from './util/fetch_helpers'
import classnames from 'classnames'
import { Map as ImmMap } from 'immutable'

const VoteForm = ({ election, token, disabled }) => {
  let history = useHistory()
  const [loading, setLoading] = useState(false)
  const [votes, setVotes] = useState(ImmMap())

  const onClick = candidateId => e => {
    setVotes(votes.set(candidateId, e.target.checked))
  }

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    fetchPost(
      `/api/elections/${election.get('slug')}/votes`,
      { vote: votes.toJS(), token })
      .then(res => history.push({
        pathname: `/elections/${election.get('slug')}/voted`,
        state: {
          election: election.toJS(),
          vote: res.toJS(),
        }
      }))
      .catch(error => (
        history.push({
          pathname: `/elections/${election.get('slug')}`,
          state: { flashMessage: error.serverMessage }
        })
      ))
  }

  return (
    <form onSubmit={onSubmit}>
      {election.get('positions').map(position => (
        <div key={position.get('id')} className="content">
          <h2 className="subtitle">{position.get('name')}</h2>
          {position.get('candidates').map(candidate => (
            <div className="field" key={candidate.get('id')}>
              <input
                className="is-checkradio is-primary"
                type="checkbox"
                checked={votes.get(candidate.get('id'), false)}
                onChange={onClick(candidate.get('id'))}
                id={candidate.get('id')}
                disabled={disabled}
              />
              <label htmlFor={candidate.get('id')}>
                &nbsp;{candidate.get('name')}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button
        disabled={disabled || loading}
        className={classnames('button is-primary', {'is-loading': loading})}
      >Submit</button>
    </form>
  )
}

export default VoteForm
