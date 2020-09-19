class CreateCandidateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :candidate_votes, id: :uuid do |t|
      t.belongs_to :vote, foreign_key: true, null: false, type: :uuid
      t.belongs_to :candidate, foreign_key: true, null: false, type: :uuid

      t.boolean :block_vote
      t.integer :preference

      t.timestamps
    end
  end
end
