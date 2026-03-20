class CreateFavourites < ActiveRecord::Migration[7.2]
  def change
    create_table :favourites do |t|
      t.references :user, null: false, foreign_key: true
      t.references :property, null: false, foreign_key: true

      t.timestamps
    end
  end
end
