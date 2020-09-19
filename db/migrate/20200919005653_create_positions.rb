class CreatePositions < ActiveRecord::Migration[6.0]
  def change
    create_table :positions, id: :uuid do |t|
      t.belongs_to :election, foreign_key: true, type: :uuid
      t.string :name, null: false

      t.timestamps
    end
  end
end
