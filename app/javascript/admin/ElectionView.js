import React from 'react'
import { PrimaryTag, StateTag, VisibilityTag } from './tags'
import ReactMarkdown from 'react-markdown'

const ElectionView = ({ election }) => (
  <React.Fragment>
    <div className="tags">
      <PrimaryTag primary={election.get('primary')} />
      <VisibilityTag visibility={election.get('visibility')} />
      <StateTag state={election.get('state')} />
    </div>
    <div className="content">
      <ReactMarkdown>{election.get('description')}</ReactMarkdown>
    </div>
  </React.Fragment>
)

export default ElectionView
