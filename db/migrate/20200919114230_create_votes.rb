class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes, id: :uuid do |t|
      t.belongs_to :election, foreign_key: true, null: false, type: :uuid

      t.timestamps
    end
  end
end
