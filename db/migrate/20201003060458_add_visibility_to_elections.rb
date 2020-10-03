class AddVisibilityToElections < ActiveRecord::Migration[6.0]
  def change
    add_column :elections, :visibility, :string, default: 'private', null: false
  end
end
