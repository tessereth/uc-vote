class CreateVoteTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :vote_tokens, id: :uuid do |t|
      t.belongs_to :election, type: :uuid, foreign_key: true, null: false
      t.string :state, null: false, default: 'new'
      t.string :token, null: false

      t.timestamps
    end
  end
end
