json.id @election.id
json.name @election.name
json.description @election.description

json.positions @election.positions.order(:name) do |position|
  json.id position.id
  json.name position.name
  json.candidates position.candidates.order(:name) do |candidate|
    json.id candidate.id
    json.name candidate.name
  end
end
