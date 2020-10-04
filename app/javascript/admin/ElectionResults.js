import React, { useState, useEffect } from 'react'
import { fetchGet } from '../util/fetch_helpers'
import { Map as ImmMap, List } from 'immutable'
import LoadingSection from '../util/LoadingSection'

const ElectionResults = ({ election }) => {
  const [results, setResults] = useState(ImmMap())
  const [loading, setLoading] = useState(true)
  const [refreshLoading, setRefreshLoading] = useState(false)

  const fetchResults = loadingSetter => () => {
    fetchGet(`/api/admin/elections/${election.get('slug')}/votes`)
      .then(res => setResults(res))
      .finally(() => loadingSetter(false))
  }

  useEffect(fetchResults(setLoading), [])

  return (
    <LoadingSection loading={loading}>
      {results.get('positions', List()).map(position => (
        <div key={position.get('id')} className="block">
          <h2 className="subtitle">{position.get('name')}</h2>
          <table className="table">
            <thead>
            <tr>
              <th>Candidate</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
            </thead>
            <tbody>
              {position.get('candidates', List()).map(candidate => (
                <tr key={candidate.get('id')}>
                  <td>{candidate.get('name')}</td>
                  <td>{`${candidate.get('vote_count')}/${results.get('total_votes')}`}</td>
                  <td>{`${(candidate.get('vote_count')/results.get('total_votes') * 100).toPrecision(2)}%`}</td>
                </tr>
              ))}
           </tbody>
          </table>
        </div>
      ))}
      <div className="block">
        <button className="button is-primary" onClick={fetchResults(setRefreshLoading)} disabled={refreshLoading}>
          Refresh
        </button>
      </div>
    </LoadingSection>
  )
}

export default ElectionResults
