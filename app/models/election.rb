class Election < ApplicationRecord
  has_many :positions
  has_many :candidates, through: :positions

  enum state: { pending: 'pending', open: 'open', closed: 'closed' }, _prefix: true
end
