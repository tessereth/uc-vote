import React from 'react'

const Callout = ({ title, style, children }) => {
  return (
    <article className={`message is-${style || 'info'}`}>
      {title && (
        <div className="message-header">
          <p>{title}</p>
        </div>
      )}
      <div className="message-body">
        <div className="content">
          {children}
        </div>
      </div>
    </article>
  )
}

export default Callout
