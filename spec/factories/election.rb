FactoryBot.define do
  factory :election do
    name { "#{Faker::Company.name } Election" }
    slug { name.parameterize }
  end
end
