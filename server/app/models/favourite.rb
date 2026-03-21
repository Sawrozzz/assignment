class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :property

  validates :user_id, uniqueness: { scope: :property_id, message: "Already has this property as favourite" }

  def toggle_like!
    update(is_liked: !is_liked)
  end
end
