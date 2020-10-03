import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchGet } from '../util/fetch_helpers'
import { List } from 'immutable'
import LoadingSection from '../util/LoadingSection'
import Hero from '../util/Hero'
import ReactMarkdown from 'react-markdown'
import { StateTag, VisibilityTag } from './tags'

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
      <Hero title="Elections" style="danger" />
      <section className="section">
        <div className="container">
          {elections.map(election => (
            <div key={election.get('id')} className="block">
              <div className="card">
                <header className="card-header">
                  <div className="card-header-title">
                    <Link to={`/admin/elections/${election.get('slug')}`}>
                      {election.get('name')}
                    </Link>
                  </div>
                </header>
                <div className="card-content">
                  <div className="tags">
                    <VisibilityTag visibility={election.get('visibility')} />
                    <StateTag state={election.get('state')} />
                  </div>
                  <div className="content">
                    <ReactMarkdown>{election.get('description')}</ReactMarkdown>
                  </div>
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
