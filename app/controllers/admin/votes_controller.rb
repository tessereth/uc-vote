class Admin::VotesController < ApplicationController
  include Admin::Authable

  def index
    @election = Election.find_by!(slug: params[:election_id])
  end
end
