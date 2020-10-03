import React from "react"
import { Link } from 'react-router-dom'
import Callout from './util/Callout'

const UnknownPage = () => {
  return (
    <section className="section">
      <div className="container">
        <Callout style="danger" title="The page you were looking for doesn't exist.">
          <p>You may have mistyped the address or the page may have moved.</p>
          <p><Link to="/">Return to the home page</Link>.</p>
        </Callout>
      </div>
  </section>
  )
}

export default UnknownPage
