json.id @election.id
json.slug @election.slug
json.name @election.name
json.description @election.description
json.state @election.state

json.positions @election.positions.order(:name) do |position|
  json.id position.id
  json.name position.name
  json.seats position.seats
  json.candidates position.candidates.order(:weight, :name) do |candidate|
    json.id candidate.id
    json.name candidate.name
  end
end
