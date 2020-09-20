import React from "react"

const Hero = ({ title, subtitle }) => {
  return (
    <section className="hero is-primary">
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
