FactoryBot.define do
  factory :position do
    election
    name { Faker::Job.position }
  end
end
