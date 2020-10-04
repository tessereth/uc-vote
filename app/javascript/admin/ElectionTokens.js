import React, { useState, useEffect } from 'react'
import { fetchGet } from '../util/fetch_helpers'
import { Map as ImmMap, List } from 'immutable'
import LoadingSection from '../util/LoadingSection'
import GenerateTokenForm from './GenerateTokenForm'
import DistributeTokenForm from './DistributeTokenForm'

const ElectionTokens = ({ election }) => {
  const [tokenData, setTokenData] = useState(ImmMap())
  const [loading, setLoading] = useState(true)
  const [refreshLoading, setRefreshLoading] = useState(false)

  const fetchTokenData = loadingSetter => () => {
    fetchGet(`/api/admin/elections/${election.get('slug')}/tokens`)
      .then(res => setTokenData(res))
      .finally(() => loadingSetter(false))
  }

  useEffect(fetchTokenData(setLoading), [])

  return (
    <LoadingSection loading={loading}>
      <div className="block">
        <table className="table">
          <thead>
            <tr>
              <th>State</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>New</td>
              <td>{tokenData.get('new', List()).size}</td>
            </tr>
            <tr>
              <td>Distributed</td>
              <td>{tokenData.get('distributed', List()).size}</td>
            </tr>
            <tr>
              <td>Used</td>
              <td>{tokenData.get('used', List()).size}</td>
            </tr>
            <tr>
              <td>Revoked</td>
              <td>{tokenData.get('revoked', List()).size}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="block">
        <button className="button is-primary" onClick={fetchTokenData(setRefreshLoading)} disabled={refreshLoading}>
          Refresh
        </button>
      </div>
      <div className="block">
        <GenerateTokenForm election={election} setTokenData={setTokenData} />
      </div>
      <div className="block">
        <DistributeTokenForm
          election={election}
          newTokens={tokenData.get('new', List())}
          setTokenData={setTokenData}
        />
      </div>
      <div className="block">
        <h2 className="subtitle">New tokens</h2>
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Token</td>
            </tr>
          </thead>
          <tbody>
            {tokenData.get('new', List()).map(token => (
              <tr key={token.get('id')}>
                <td>{token.get('id')}</td>
                <td>{token.get('token')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LoadingSection>
  )
}

export default ElectionTokens
