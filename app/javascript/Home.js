import React from "react"
import ElectionTokenForm from './ElectionTokenForm'
import RedirectPrimary from './util/RedirectPrimary'

const Home = () => (
  <React.Fragment>
    <section className="hero is-primary is-bold is-medium">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            UC Vote
          </h1>
          <h2 className="subtitle">Voting platform for Uniting Church elections.</h2>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <RedirectPrimary />
     </div>
    </section>
  </React.Fragment>
)

export default Home
