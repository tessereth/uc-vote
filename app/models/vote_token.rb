class VoteToken < ApplicationRecord
  # alphanumeric, except lI1, O0
  ALLOWED_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
  TOKEN_LENGTH = 4

  belongs_to :election

  enum state: { new: 'new', distributed: 'distributed', used: 'used', revoked: 'revoked' }, _prefix: true

  after_initialize :init_token

  scope :usable, -> { where(state: %w[new distributed]) }

  private

  def init_token
    unless token
      s = ''
      TOKEN_LENGTH.times do
        s << ALLOWED_CHARS[SecureRandom.random_number(ALLOWED_CHARS.length)]
      end
      self.token = s
    end
  end
end
