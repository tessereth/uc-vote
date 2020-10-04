module Admin::Authable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user!
    before_action :require_viewer!
    before_action :require_admin!, only: %i[new create edit update destroy]
  end

  def require_viewer!
    render :not_found unless current_user.viewer?
  end

  def require_admin!
    render :not_found unless current_user.admin?
  end
end
