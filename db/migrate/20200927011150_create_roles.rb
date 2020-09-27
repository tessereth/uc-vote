class CreateRoles < ActiveRecord::Migration[6.0]
  def change
    create_table :roles, id: :uuid do |t|
      t.belongs_to :user, foreign_key: true, null: false, type: :uuid
      t.string :role, null: false

      t.timestamps
    end
  end
end
