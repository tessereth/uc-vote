import React from "react"
import { Link, Redirect, useLocation, useParams } from 'react-router-dom'
import { fromJS } from 'immutable'

const Voted = () => {
  const { id } = useParams()
  const location = useLocation()
  const state = fromJS(location.state)
  const election = state && state.get('election')
  const vote = state && state.get('vote')

  return (
    <section className="section">
      <div className="container">
      {election && vote ?
        <React.Fragment>
          <h1 className="title">{election.get('name')}</h1>
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
              </div>
            </div>
          </article>
          <p>
            If someone else would like to vote in this election, you can{' '}
            <Link to={`/elections/${election.get('id')}`}>vote again</Link> or{' '}
            <Link to="/">return to the home page</Link>.
          </p>
        </React.Fragment> :
        id ?
          <Redirect to={`/elections/${id}`} /> :
          <Redirect to="/" />
      }
    </div>
  </section>
  )
}

export default Voted
