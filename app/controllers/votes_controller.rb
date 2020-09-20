class VotesController < ApplicationController
  def create
    election = Election.find(params[:election_id])
    @vote = Vote.new(election: election)
    election.candidates.each do |candidate|
      @vote.candidate_votes <<
        CandidateVote.new(candidate: candidate,
                          block_vote: params[:vote].fetch(candidate.id, false))
    end
    @vote.save!
  end
end
