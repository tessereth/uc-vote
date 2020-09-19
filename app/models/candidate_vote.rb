class CandidateVote < ApplicationRecord
  belongs_to :vote
  belongs_to :candidate
end
