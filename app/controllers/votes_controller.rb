class VotesController < ApplicationController
  before_action :set_election

  def new
    validate_token
  end

  def create
    Election.transaction do
      validate_token
      return if @vote_token.nil?
      @vote_token.update!(state: 'used')
      @vote = Vote.new(election: @election)
      @election.candidates.each do |candidate|
        @vote.candidate_votes <<
          CandidateVote.new(candidate: candidate,
                            block_vote: params[:vote].fetch(candidate.id, false))
      end
      @vote.save!
    end
  end

  private

  def set_election
    @election = Election.find_by!(slug: params[:election_id])
  end

  def validate_token
    return render json: { error: 'Missing voting code.' }, status: :not_found unless params[:token]

    @vote_token = @election.vote_tokens.find_by(token: params[:token])
    return render json: { error: 'Unknown voting code.' }, status: :not_found if @vote_token.nil?

    case @vote_token.state
    when 'new', 'distributed'
      # Happy case
    when 'used'
      render json: { error: 'Voting code has already been used.' }, status: :bad_request
    when 'revoked'
      render json: { error: 'This voting code has been revoked and can no longer be used.' }, status: :bad_request
    else
      # Should never happen
      render json: { error: 'Unknown voting code.' }, status: :not_found
    end
  end
end
