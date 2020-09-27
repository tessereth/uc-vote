json.google_login_path user_google_oauth2_omniauth_authorize_path
json.logout_path destroy_user_session_path
json.signed_in user_signed_in?
if user_signed_in?
  json.user do
    json.email current_user.email
    json.name current_user.name
    json.viewer current_user.viewer?
    json.admin current_user.admin?
  end
end
