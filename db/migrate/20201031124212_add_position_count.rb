class AddPositionCount < ActiveRecord::Migration[6.0]
  def change
    add_column :positions, :seats, :integer, default: 1, null: false
  end
end
