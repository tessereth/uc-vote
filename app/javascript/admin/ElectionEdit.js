import React, { useState } from 'react'
import { fetchPatch } from '../util/fetch_helpers'
import ElectionForm from './ElectionForm'

const ElectionEdit = ({ election, setElection }) => {
  const [loading, setLoading] = useState(false)

  const onSubmit = (e, modifiedElection) => {
    e.preventDefault()
    setLoading(true)
    fetchPatch(
      `/api/admin/elections/${election.get('slug')}`,
      { election: modifiedElection.toJS() })
      .then(res => setElection(res))
      .catch(console.log)
      .then(() => setLoading(false))
  }

  return (
    <ElectionForm
      onSubmit={onSubmit}
      election={election}
      loading={loading}
      />
  )
}

export default ElectionEdit
