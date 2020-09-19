class ElectionsController < ApplicationController
  def token
    election = Election.find_by(token: params[:token])
    if election
      render json: {id: election.id}
    else
      render json: {error: 'Unknown token'}, status: :not_found
    end
  end

  def show
    election = Election.find(params[:id])
    render json: {id: election.id, name: election.name, description: election.description}
  end
end
