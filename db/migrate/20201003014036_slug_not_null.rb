class SlugNotNull < ActiveRecord::Migration[6.0]
  def change
    change_column :elections, :slug, :string, null: false
  end
end
