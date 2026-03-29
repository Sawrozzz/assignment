class User < ApplicationRecord
    has_secure_password

    enum role: { buyer: 0, seller: 1 }
    has_many :favourites, dependent: :destroy
    has_many :properties, through: :favourites

    validates :email, presence: true, uniqueness: true
end
