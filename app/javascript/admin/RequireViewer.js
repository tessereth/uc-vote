import React from 'react'
import { Link } from 'react-router-dom'
import { withContext } from '../context'

const RequireViewer = ({ context, children }) => {
  const metadata = context.get('metadata')
  if (!metadata.get('signed_in') || !metadata.getIn(['user', 'viewer'], false)) {
    return (
      <section className="section">
        <div className="container">
          <article className="message is-danger">
            <div className="message-header">
              <p>Unauthorised</p>
            </div>
            <div className="message-body">
              <div className="content">
                <p>You do not have permission to view this page.</p>
                <p><Link to="/">Return to the home page</Link>.</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    )
  }
  return children
}

export default withContext(RequireViewer)
