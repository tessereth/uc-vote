# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email, null: false
      t.string :name, null: false, default: ''
      t.string :provider, null: false
      t.string :uid, null: false

      t.timestamps null: false
    end

    add_index :users, %i[provider uid], unique: true
  end
end
