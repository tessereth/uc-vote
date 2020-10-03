class AddSlugToElections < ActiveRecord::Migration[6.0]
  def change
    add_column :elections, :slug, :string
  end
end
