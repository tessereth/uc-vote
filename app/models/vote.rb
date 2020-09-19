class Vote < ApplicationRecord
  belongs_to :election
  has_many :candidate_votes
end
