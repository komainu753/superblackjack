class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.string :star
      t.integer :money

      t.timestamps
    end
  end
end
