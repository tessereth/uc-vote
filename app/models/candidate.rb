class Candidate < ApplicationRecord
  belongs_to :position
  has_many :candidate_votes

  validates :name, presence: true
end
