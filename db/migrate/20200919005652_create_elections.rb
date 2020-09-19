class CreateElections < ActiveRecord::Migration[6.0]
  def change
    create_table :elections, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.string :state, null: false, default: :pending
      t.string :token, index: true

      t.timestamps
    end
  end
end
