# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts("Seed user, property and favourite property is creating.......")
buyer = User.create!(
    name: "Test Buyer",
    email: "test@buyer.com",
    password: "Test@123",
    role: :buyer
)

prop1 = Property.create!(
    title: "2BHK House",
    price: 2000000,
    location: "Budanilkantha, Kathmandu",
)
prop2 = Property.create!(
    title: "Big Mart",
    price: 20000000,
    location: "Putalishadak, Kathmandu",
)

Favourite.create!(user: buyer, property: prop1)
puts("Seed user, property and favourite property is Created Successfully.......")
