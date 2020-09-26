class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth!(request.env['omniauth.auth'])
    sign_in_and_redirect @user, event: :authentication
  end

  def failure
    redirect_to root_path
  end

  def signed_in_root_path(_user)
    '/admin'
  end
end
