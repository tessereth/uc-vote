class ApplicationController < ActionController::Base
  # Required by devise when Omniauth only.
  def new_session_path(scope)
    new_user_session_path
  end
end
