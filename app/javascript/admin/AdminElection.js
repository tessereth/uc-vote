import React, { useEffect, useState } from 'react'
import { Map as ImmMap } from 'immutable'
import { fetchGet } from '../util/fetch_helpers'
import LoadingSection from '../util/LoadingSection'
import Hero from '../util/Hero'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { StateTag, VisibilityTag } from './tags'

const AdminElection = () => {
  const { slug } = useParams()
  const [election, setElection] = useState(ImmMap())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGet(`/api/admin/elections/${slug}`)
      .then(res => setElection(res))
      // TODO: Show error message
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <LoadingSection loading={loading}>
      <Hero title={election.get('name')} style="danger" />
      <section className="section">
        <div className="container">
          <div className="tags">
            <VisibilityTag visibility={election.get('visibility')} />
            <StateTag state={election.get('state')} />
          </div>
          <div className="content">
            <ReactMarkdown>{election.get('description')}</ReactMarkdown>
          </div>
        </div>
      </section>
    </LoadingSection>
  )

}

export default AdminElection
