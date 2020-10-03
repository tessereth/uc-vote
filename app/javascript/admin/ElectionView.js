import React from 'react'
import { StateTag, VisibilityTag } from './tags'
import ReactMarkdown from 'react-markdown'

const ElectionView = ({ election }) => (
  <React.Fragment>
    <div className="tags">
      <VisibilityTag visibility={election.get('visibility')} />
      <StateTag state={election.get('state')} />
    </div>
    <div className="content">
      <ReactMarkdown>{election.get('description')}</ReactMarkdown>
    </div>
  </React.Fragment>
)

export default ElectionView
