import React, { useState, useEffect } from "react"
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { Map as ImmMap } from 'immutable'
import { fetchGet } from './util/fetch_helpers'
import Hero from './util/Hero'
import LoadingSection from './util/LoadingSection'
import ElectionTokenForm from './ElectionTokenForm'
import useToken from './util/useToken'
import ReactMarkdown from 'react-markdown'

const Election = () => {
  let { slug } = useParams()
  const [election, setElection] = useState(ImmMap())
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const history = useHistory()
  const token = useToken()

  useEffect(() => {
    if (token) {
      history.push({ pathname: `${location.pathname}/vote`, search: `?token=${token}` })
    } else {
      fetchGet('/api/elections/' + slug)
        .then(res => setElection(res))
        // TODO: Show error message
        .finally(() => setLoading(false))
    }
  }, [slug])

  return (
    <LoadingSection loading={loading}>
      <Hero title={election.get('name')} />
      <section className="section">
        <div className="container">
          <div className="content">
            <ReactMarkdown source={election.get('description')} />
            <p>
              If you are eligible to vote in this election, please enter your voting code below.
            </p>
            <ElectionTokenForm election={election} token={token} />
          </div>
        </div>
      </section>
    </LoadingSection>
  )
}

export default Election
