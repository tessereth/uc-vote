json.elections @elections do |election|
  json.id election.id
  json.name election.name
  json.description election.description
end
