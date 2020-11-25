import React from 'react'
import classnames from 'classnames'

export function VisibilityTag({ visibility }) {
  return (
    <span className={classnames('tag', { 'is-success': visibility === 'public' })}>
      {visibility}
    </span>
  )
}

export function StateTag({ state }) {
  return (
    <span className={classnames('tag', { 'is-success': state === 'open', 'is-info': state === 'closed' })}>
      {state}
    </span>
  )
}

export function PrimaryTag({ primary }) {
  if (primary) {
    return (
      <span className="tag is-primary">
        primary
      </span>
      )
  } else {
    return null
  }
}
