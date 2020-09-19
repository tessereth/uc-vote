class CreateCandidates < ActiveRecord::Migration[6.0]
  def change
    create_table :candidates, id: :uuid do |t|
      t.belongs_to :position, foreign_key: true, type: :uuid
      t.string :name, null: false

      t.timestamps
    end
  end
end
