json.total_votes @election.votes.count
json.positions @election.positions.order(:name) do |position|
  json.id position.id
  json.name position.name
  json.candidates position.candidates.order(:name) do |candidate|
    json.id candidate.id
    json.name candidate.name
    json.vote_count candidate.candidate_votes.where(block_vote: true).count
  end
end
