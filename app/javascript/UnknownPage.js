import React from "react"
import { Link } from 'react-router-dom'

const UnknownPage = () => {
  return (
    <section className="section">
      <div className="container">
        <article className="message is-danger">
          <div className="message-header">
            <p>The page you were looking for doesn't exist.</p>
          </div>
          <div className="message-body">
            <div className="content">
              <p>You may have mistyped the address or the page may have moved.</p>
              <p><Link to="/">Return to the home page</Link>.</p>
            </div>
          </div>
        </article>
      </div>
  </section>
  )
}

export default UnknownPage
