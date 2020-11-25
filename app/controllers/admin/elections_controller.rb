class Admin::ElectionsController < ApplicationController
  include Admin::Authable

  def index
    @elections = Election.order(created_at: :desc)
  end

  def show
    @election = Election.find_by!(slug: params[:id])
  end

  def update
    @election = Election.find_by!(slug: params[:id])
    @election.update!(params.require(:election).permit(:name, :description, :slug, :state, :visibility, :primary))
    render :show
  end
end
