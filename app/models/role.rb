class Role < ApplicationRecord
  belongs_to :user

  enum role: { admin: 'admin', viewer: 'viewer' }
end
