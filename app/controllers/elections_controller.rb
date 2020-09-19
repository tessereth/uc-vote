class ElectionsController < ApplicationController
  def token
    @election = Election.find_by(token: params[:token])
    render json: {error: 'Unknown token'}, status: :not_found unless @election
  end

  def show
    @election = Election.find(params[:id])
  end
end
