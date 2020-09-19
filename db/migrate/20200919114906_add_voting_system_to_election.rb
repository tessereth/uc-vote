class AddVotingSystemToElection < ActiveRecord::Migration[6.0]
  def change
    add_column :elections, :voting_system, :string
  end
end
