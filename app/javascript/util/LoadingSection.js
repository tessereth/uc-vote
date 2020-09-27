import React from 'react'

const LoadingSection = ({ loading, children }) => {
  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <progress className="progress is-primary"/>
        </div>
      </section>
    )
  }
  return children
}

export default LoadingSection
