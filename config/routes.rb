Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope :api do
    resources :elections, only: :show do
      collection do
        post 'token'
      end

      resources :votes, only: :create
    end
  end

  root 'root#index'
  get '*path', to: 'root#index'
end
