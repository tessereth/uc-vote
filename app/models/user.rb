class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: [:google_oauth2]

  has_many :roles

  def viewer?
    r = roles.pluck(:role)
    'viewer'.in?(r) || 'admin'.in?(r)
  end

  def admin?
    r = roles.pluck(:role)
    'admin'.in?(r)
  end

  def self.from_omniauth!(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create! do |user|
      user.email = auth.info.email
      user.name = auth.info.name
    end
  end
end
