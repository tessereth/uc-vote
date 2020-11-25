class Admin::ElectionsController < ApplicationController
  include Admin::Authable

  def index
    @elections = Election.order(created_at: :desc)
  end

  def create
    @election = Election.create(election_params)
    if @election.persisted?
      render :show
    else
      render_error(:bad_request, @election.errors.full_messages.join(', '))
    end
  end

  def show
    @election = Election.find_by!(slug: params[:id])
  end

  def update
    @election = Election.find_by!(slug: params[:id])
    @election.update!(election_params)
    render :show
  end

  private

  def election_params
    params.require(:election).permit(:name, :description, :slug, :state, :visibility, :primary)
  end
end
