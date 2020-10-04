class Admin::TokensController < ApplicationController
  include Admin::Authable

  before_action :set_election

  def index
    @tokens = @election.vote_tokens
  end

  def create
    Election.transaction do
      params[:count].to_i.times do
        @election.vote_tokens << VoteToken.new
      end
    end
    @tokens = @election.vote_tokens
    render :index
  end

  def update
    Election.transaction do
      @election.vote_tokens.where(id: params[:ids]).each do |token|
        token.update!(params.permit(:state))
      end
    end
    @tokens = @election.vote_tokens
    render :index
  end

  private

  def set_election
    @election = Election.find_by!(slug: params[:election_id])
  end
end
