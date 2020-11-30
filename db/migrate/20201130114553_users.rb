class Users < ActiveRecord::Migration[6.0]
  def change
    change_column_default :users, :money, from: "", to:0
  end
end
