import React from 'react'
import Callout from './util/Callout'

const ElectionStateCallout = ({ state }) => {
  if (state === 'pending') {
    return (
      <Callout style="warning">
        <p>This election is not open for voting yet.</p>
      </Callout>
    )
  }
  if (state === 'closed') {
    return (
      <Callout style="warning">
        <p>This election is closed and no longer accepting votes.</p>
      </Callout>
    )
  }
  return null
}

export default ElectionStateCallout
