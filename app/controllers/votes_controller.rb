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
    @vote_token = @election.vote_tokens.find_by(token: params[:token])
    return render_error(:not_found, 'Unknown voting code.') if @vote_token.nil?

    case @vote_token.state
    when 'new', 'distributed'
      # Happy case
    when 'used'
      render_error(:bad_request, 'This voting code has already been used.')
    when 'revoked'
      render_error(:bad_request, 'This voting code has been revoked and can no longer be used.')
    else
      # Should never happen
      render_error(:not_found, 'Unknown voting code.')
    end
  end
end
