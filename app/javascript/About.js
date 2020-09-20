import React from 'react'
import Hero from './util/Hero'

const About = () => (
  <React.Fragment>
    <Hero title="About UC Vote"/>
    <section className="section">
      <div className="container">
        <div className="content">
          <p>
            UC Vote is an elections platform for running Uniting Church elections.
          </p>
        </div>
      </div>
    </section>
  </React.Fragment>
)

export default About
