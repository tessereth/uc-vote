Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_scope :user do
    get 'sign_in', :to => 'devise/sessions#new', :as => :new_user_session
    get 'sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_session
  end

  scope :api do
    resources :elections, only: :show do
      collection do
        get 'primary'
      end

      resources :votes, only: %i[new create]
    end

    namespace :admin do
      resources :elections, only: %i[index show update] do
        resources :tokens, only: %i[index create] do
          collection do
            patch :update
          end
        end
      end
    end
  end

  root 'root#index'
  get '*path', to: 'root#index'
end
