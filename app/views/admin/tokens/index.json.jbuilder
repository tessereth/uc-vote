%i[new distributed used revoked].each do |state|
  json.set! state do
    json.array! @tokens.where(state: state), :id, :token, :state
  end
end
