import React, { useState, useEffect } from 'react'
import { fetchPatch } from '../util/fetch_helpers'

const DistributeTokenForm = ({ election, newTokens, setTokenData}) => {
  const DOMAIN = 'uc-vote.com'
  const [candidateTokens, setCandidateTokens] = useState(newTokens.slice(0, 1))
  const [copying, setCopying] = useState(false)
  const [loading, setLoading] = useState(false)

  const resetCandidates = count => {
    setCandidateTokens(newTokens.slice(0, count))
  }

  useEffect(() => resetCandidates(candidateTokens.size), [newTokens])

  const copyText = () => {
    const plural = candidateTokens.size > 1
    const header = `Your code${plural ? 's' : ''} to vote in the election ${plural ? 'are' : 'is'}:\n\n`
    const footer = `\n\nEach code lets you vote once. To vote, follow the link or go directly to ${DOMAIN} and enter your code.`
    const body = candidateTokens
      .map(token => `Code: ${token.get('token')}\nLink: https://${DOMAIN}/?token=${token.get('token')}`)
      .join('\n')

    return header + body + footer
  }

  const onCopy = e => {
    e.preventDefault()
    setCopying(true)
    navigator.clipboard.writeText(copyText())
      .catch(console.log)
      .finally(() => setCopying(false))
  }

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    fetchPatch(
      `/api/admin/elections/${election.get('slug')}/tokens`,
      { ids: candidateTokens.map(token => token.get('id')), state: 'distributed' })
      .then(res => setTokenData(res))
      .catch(console.log)
      .then(() => setLoading(false))
  }

  return (
    <form onSubmit={onSubmit}>
      <label className="label">Distribute tokens</label>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="number"
            value={candidateTokens.size}
            onChange={e => resetCandidates(e.target.value)}
          />
        </div>
        <div className="control">
          <button className="button" disabled={copying || loading} onClick={onCopy}>
            Copy
          </button>
        </div>
        <div className="control">
          <button className="button is-primary" disabled={loading}>
            Mark distributed
          </button>
        </div>
      </div>
    </form>
  )
}

export default DistributeTokenForm
