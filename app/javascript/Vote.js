import React, { useState, useEffect } from "react"
import { useParams, useLocation } from 'react-router-dom'
import { Map as ImmMap } from 'immutable'
import { fetchGet } from './util/fetch_helpers'
import VoteForm from './VoteForm'
import Hero from './util/Hero'
import LoadingSection from './util/LoadingSection'
import ReactMarkdown from 'react-markdown'
import useToken from './util/useToken'

const Vote = () => {
  let { slug } = useParams()
  const [election, setElection] = useState(ImmMap())
  const [loading, setLoading] = useState(true)
  const token = useToken()

  useEffect(() => {
    fetchGet(`/api/elections/${slug}/votes/new`, { token })
      .then(res => setElection(res))
      // TODO: Show error message
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <LoadingSection loading={loading}>
      <Hero title={election.get('name')} />
      <section className="section">
        <div className="container">
          <div className="content">
            <ReactMarkdown source={election.get('description')} />
            <p>
              If you are eligible to vote in this election, please vote for your preferred candidates below.
            </p>
            <VoteForm election={election} token={token} />
          </div>
        </div>
      </section>
    </LoadingSection>
  )
}

export default Vote
