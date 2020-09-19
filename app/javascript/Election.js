import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchGet } from './util/fetch_helpers'

const Election = () => {
  let { id } = useParams()
  const [election, setElection] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGet('/api/elections/' + id)
      .then(res => res.json())
      .then(res => setElection(res))
      // TODO: Show error message
      .finally(() => setLoading(false))
  }, [id])

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    fetchGet('/api/elections/' + id)
      .then(res => res.json())
      .then(res => history.push('/elections/' + res.id))
      // TODO: Show error message
      //.catch(() => setLoading(false))
  }

  return <section className="section">
    <div className="container">
      <div className="content">
        {loading ?
          <div>
            <progress className="progress is-primary"/>
          </div> :
          <React.Fragment>
            <h1>{election.name}</h1>
            <p>
              {election.description}
            </p>
          </React.Fragment>
        }
      </div>
    </div>
  </section>
}

export default Election
