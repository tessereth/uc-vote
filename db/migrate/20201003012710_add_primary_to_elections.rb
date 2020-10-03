class AddPrimaryToElections < ActiveRecord::Migration[6.0]
  def change
    add_column :elections, :primary, :boolean, default: false, null: false
  end
end
