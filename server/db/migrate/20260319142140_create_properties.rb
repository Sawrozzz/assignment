class CreateProperties < ActiveRecord::Migration[7.2]
  def change
    create_table :properties do |t|
      t.string :title
      t.integer :price
      t.string :location

      t.timestamps
    end
  end
end
