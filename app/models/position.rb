class Position < ApplicationRecord
  belongs_to :election
  has_many :candidates

  validates :name, presence: true
  validates :seats, numericality: { only_integer: true, greater_than: 0 }
end
