import React, { useState } from 'react'
import { fetchPost } from '../util/fetch_helpers'
import { Map as ImmMap } from 'immutable'
import { useHistory } from 'react-router-dom'
import ElectionForm from './ElectionForm'
import Hero from '../util/Hero'

const ElectionCreate = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onSubmit = (e, modifiedElection) => {
    e.preventDefault()
    setLoading(true)
    fetchPost(
      `/api/admin/elections`,
      { election: modifiedElection.toJS() })
      .then(res => history.push(`/admin/elections/${res.get('slug')}`))
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }

  return (
    <React.Fragment>
      <Hero title="Admin: Create election" style="danger" />
      <section className="section">
        <div className="container">
          <ElectionForm
            onSubmit={onSubmit}
            election={ImmMap()}
            loading={loading}
         />
        </div>
      </section>
    </React.Fragment>
  )
}

export default ElectionCreate
