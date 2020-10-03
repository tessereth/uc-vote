class Admin::ElectionsController < ApplicationController
  before_action :authenticate_user!

  def index
    render status: :not_found unless current_user.viewer?
    @elections = Election.order(created_at: :desc)
  end
end