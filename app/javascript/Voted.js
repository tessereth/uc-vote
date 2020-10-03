import React from "react"
import { Link, Redirect, useLocation, useParams } from 'react-router-dom'
import { fromJS } from 'immutable'
import Hero from './util/Hero'

const Voted = () => {
  const { slug } = useParams()
  const location = useLocation()
  const state = fromJS(location.state)
  const election = state && state.get('election')
  const vote = state && state.get('vote')

  if (!election || !vote) {
    if (slug) {
      return <Redirect to={`/elections/${slug}`}/>
    } else {
      return <Redirect to="/"/>
    }
  }

  return (
    <React.Fragment>
      <Hero title={election.get('name')} />
      <section className="section">
        <div className="container">
          <article className="message is-success">
            <div className="message-header">
              <p>Vote recorded</p>
            </div>
            <div className="message-body">
              <div className="content">
                <p>Thank you for voting in this election.</p>
                <p>
                  Your vote id is{' '}
                  <b>{vote.get('id', '<unknown>')}</b>.
                </p>
                <p>Please record this id in case you need to contact support.</p>
                <p>
                  If someone else would like to vote in this election, you can{' '}
                  <Link to={`/elections/${election.get('slug')}`}>vote again</Link> or{' '}
                  <Link to="/">return to the home page</Link>.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Voted
