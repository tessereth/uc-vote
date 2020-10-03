import React, { useState, useEffect } from "react"
import { Redirect, useLocation } from 'react-router-dom'
import { Map as ImmMap } from 'immutable'
import { fetchGet } from './fetch_helpers'
import LoadingSection from './LoadingSection'
import Callout from './Callout'

const RedirectPrimary = () => {
  const [election, setElection] = useState(ImmMap())
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    fetchGet('/api/elections/primary')
      .then(res => setElection(res))
      // TODO: Show error message
      .finally(() => setLoading(false))
  }, [])

  return (
    <LoadingSection loading={loading}>
      {election.get('slug') ?
        <Redirect to={{ pathname: `/elections/${election.get('slug')}`, search: location.search }} /> :
        <Callout style="info">
          <p>There are no elections running at this time.</p>
        </Callout>
      }
    </LoadingSection>
  )
}

export default RedirectPrimary
