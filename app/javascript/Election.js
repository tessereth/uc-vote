import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { fetchGet } from './util/fetch_helpers'
import VoteForm from './VoteForm'

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

  return <section className="section">
    <div className="container">
      <div className="content">
        {loading ?
          <div>
            <progress className="progress is-primary"/>
          </div> :
          <React.Fragment>
            <h1>{election.get('name')}</h1>
            <p>
              {election.get('description')}
            </p>
          </React.Fragment>
        }
      </div>
    </div>
    {termsAccepted ?
      <VoteForm election={election} /> :
      <section className="section">
        <div className="container">
          <div className="content">
            <p>
              Please confirm that you are eligible to vote and have not already voted in this election.
            </p>
            <button className="button is-primary" onClick={() => setTermsAccepted(true)}>
              Yes, I can vote
            </button>
          </div>
        </div>
      </section>
    }
  </section>
}

export default Election
