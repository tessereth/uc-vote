import React from 'react'
import Hero from './util/Hero'

const About = () => (
  <React.Fragment>
    <Hero title="About UC Vote"/>
    <section className="section">
      <div className="container">
        <div className="content">
          <p>
            UC Vote is a platform for running Uniting Church elections.
            It was written by Tessa Bradbury as a way of running elections while respecting Covid-19 restrictions.
          </p>
          <h2>How does voting work?</h2>
          <p>
            Each elector is given a unique code that they use to vote. Each voting code is like a ballot paper. For instance:
          </p>
          <ul>
            <li>Each code can only be used to cast a single vote.</li>
            <li>The codes should not be associated with particular people.</li>
            <li>Once you vote, no one can tell which vote was yours (including you).</li>
          </ul>
          <p>
            Voting code distribution is not handled by the UC Vote platform.
            But once an elector has a code, they can follow a link or enter the code manually to go to the election form.
          </p>
          <h2>How does administration work?</h2>
          <p>
            There is an administration portal to manage elections.
            This is where voting codes are generated and the results of elections are shown.
          </p>
          <p>
            Administrators log in via their Google account.
            Only accounts that have been granted permission will be able to see anything in
            the Admin section of the site.
          </p>
          <h2>Can I see the code?</h2>
          <p>
            The source code for this site is available on{' '}
            <a href="https://github.com/tessereth/uc-vote" target="_blank">Github</a>.
          </p>
        </div>
      </div>
    </section>
  </React.Fragment>
)

export default About
