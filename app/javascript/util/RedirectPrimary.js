import React, { useState, useEffect } from "react"
import { Redirect, useLocation } from 'react-router-dom'
import { Map as ImmMap } from 'immutable'
import { fetchGet } from './fetch_helpers'
import LoadingSection from './LoadingSection'

const RedirectPrimary = () => {
  const [election, setElection] = useState(ImmMap())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGet('/api/elections/primary')
      .then(res => setElection(res))
      // TODO: Show error message
      .finally(() => setLoading(false))
  }, [])

  return (
    <LoadingSection loading={loading}>
      <Redirect to={{ pathname: `/elections/${election.get('slug')}`, search: useLocation().search }} />
    </LoadingSection>
  )
}

export default RedirectPrimary
