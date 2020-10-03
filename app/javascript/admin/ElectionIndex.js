import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchGet } from '../util/fetch_helpers'
import { List } from 'immutable'
import LoadingSection from '../util/LoadingSection'
import Hero from '../util/Hero'

const ElectionIndex = () => {
  const [elections, setElections] = useState(List())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGet('/api/admin/elections')
      .then(res => setElections(res.get('elections')))
      // TODO: Show error message
      .finally(() => setLoading(false))
  }, [])

  return (
    <LoadingSection loading={loading}>
      <Hero title="Elections" />
      <section className="section">
        <div className="container">
          {elections.map(election => (
            <div key={election.get('id')} className="card">
              <header className="card-header">
                <p className="card-header-title">
                  {election.get('name')}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{election.get('description')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </LoadingSection>
  )
}

export default ElectionIndex
