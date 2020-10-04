FactoryBot.define do
  factory :candidate do
    position
    name { Faker::Name.name }
  end
end
