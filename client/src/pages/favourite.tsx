/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { usePropertyStore, type Favourite } from "../store/propertyStore";
import Loader from "../components/Loader";

export default function FavouritePage() {
  const { favourites, loading, error, getFavouriteProperties } =
    usePropertyStore();
  useEffect(() => {
    getFavouriteProperties();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error fetching properties</p>;
  if (favourites.length === 0) return <div>No favourites found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {favourites.map((fav: Favourite) => {
        const property = fav.property;
        return (
          <div
            key={fav.id}
            className="relative h-64 rounded-lg shadow-lg overflow-hidden group cursor-pointer"
          >
            <img
              src="building.png"
              alt={property.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300"></div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex flex-col gap-2">
              <h2 className="text-lg font-bold">{property.title}</h2>
              <p className="text-sm">₹{property.price.toLocaleString()}</p>
              <p className="text-sm">{property.location}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
