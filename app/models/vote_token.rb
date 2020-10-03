class VoteToken < ApplicationRecord
  ALLOWED_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  TOKEN_LENGTH = 6

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
