class VotesController < ApplicationController
  before_action :set_election

  def new
    validate_token
  end

  def create
    Election.transaction do
      if @election.state != 'open'
        return render_error(:bad_request, 'This election is not currently open for voting.')
      end
      return unless validate_token
      return unless validate_seat_count
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
    @election = Election.visibility_public.find_by!(slug: params[:election_id])
  end

  def validate_token
    @vote_token = @election.vote_tokens.find_by(token: params[:token])
    if @vote_token.nil?
      render_error(:bad_request, 'Unknown voting code.')
      return false
    end

    case @vote_token.state
    when 'new', 'distributed'
      # Happy case
      return true
    when 'used'
      render_error(:bad_request, 'This voting code has already been used.')
      return false
    when 'revoked'
      render_error(:bad_request, 'This voting code has been revoked and can no longer be used.')
      return false
    else
      # Should never happen
      render_error(:not_found, 'Unknown voting code.')
      return false
    end
  end

  def validate_seat_count
    @election.positions.each do |position|
      chosen = position.candidates.filter {|c| ActiveModel::Type::Boolean.new.cast(params[:vote].fetch(c.id, false))}
      if chosen.count > position.seats
        render_error(:bad_request, 'Too many candidates selected.')
        return false
      end
    end
    true
  end
end
