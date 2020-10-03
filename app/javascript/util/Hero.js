import React from 'react'
import { Helmet } from 'react-helmet'

const Hero = ({ title, subtitle, pageTitle }) => {
  return (
    <section className="hero is-primary">
      <Helmet>
        <title>{pageTitle || title}</title>
      </Helmet>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          {subtitle && <div className="subtitle">{subtitle}</div> }
        </div>
      </div>
    </section>
  )
}

export default Hero
