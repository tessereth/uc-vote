class AddWeightToCandidate < ActiveRecord::Migration[6.0]
  def change
    add_column :candidates, :weight, :integer, default: 0, null: false
  end
end
