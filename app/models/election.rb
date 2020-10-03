class Election < ApplicationRecord
  has_many :positions
  has_many :candidates, through: :positions
  has_many :vote_tokens

  enum state: { pending: 'pending', open: 'open', closed: 'closed' }, _prefix: true
  enum voting_system: { block_voting: 'block_voting', preferential: 'preferential' }
end
