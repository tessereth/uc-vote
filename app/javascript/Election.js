import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { fetchGet } from './util/fetch_helpers'
import VoteForm from './VoteForm'
import Hero from './util/Hero'
import LoadingSection from './util/LoadingSection'

const Election = () => {
  let { id } = useParams()
  const [election, setElection] = useState({})
  const [loading, setLoading] = useState(true)
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    fetchGet('/api/elections/' + id)
      .then(res => setElection(res))
      // TODO: Show error message
      .finally(() => setLoading(false))
  }, [id])

  return (
    <LoadingSection loading={loading}>
      <Hero title={election.get('name')} />
      <section className="section">
        <div className="container">
          <div className="content">
            <p>
              {election.get('description')}
            </p>
            {termsAccepted ?
              <VoteForm election={election} /> :
              <React.Fragment>
                <p>
                  Please confirm that you are eligible to vote and have not already voted in this election.
                </p>
                <button className="button is-primary" onClick={() => setTermsAccepted(true)}>
                  Yes, I can vote
                </button>
              </React.Fragment>
            }
          </div>
        </div>
      </section>
    </LoadingSection>
  )
}

export default Election
