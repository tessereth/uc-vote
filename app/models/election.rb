class Election < ApplicationRecord
  has_many :positions
  has_many :candidates, through: :positions
  has_many :vote_tokens
  has_many :votes

  enum visibility: { public: 'public', private: 'private' }, _prefix: true
  enum state: { draft: 'draft', pending: 'pending', open: 'open', closed: 'closed' }, _prefix: true
  enum voting_system: { block_voting: 'block_voting', preferential: 'preferential' }
end
