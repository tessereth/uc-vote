json.elections @elections do |election|
  json.id election.id
  json.name election.name
  json.description election.description
  json.state election.state
  json.visibility election.visibility
  json.slug election.slug
end
