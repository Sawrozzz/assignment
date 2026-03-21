/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import toast from "react-hot-toast";

import Loader from "../components/Loader";
import { usePropertyStore, type Property } from "../store/propertyStore";

export default function DashboardPage() {
  const { properties, loading, error, getAllProperties, addToFavourite } =
    usePropertyStore();

  useEffect(() => {
    getAllProperties();
  }, []);

  const handleAddToFavourite = async (property: Property) => {
    try {
      await addToFavourite(property.id);
      toast.success(`${property.title} added to favourites!`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Failed to add favourite");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error fetching properties</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="relative h-64 rounded-lg shadow-lg overflow-hidden group"
        >
          <img
            src="building.png"
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300"></div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h2 className="text-lg font-bold">{property.title}</h2>
            <p className="text-sm">Rs.{property.price.toLocaleString()}</p>
            <p className="text-sm">{property.location}</p>
            <button
              onClick={() => handleAddToFavourite(property)}
              className="mt-2 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl transition duration-200 text-sm cursor-pointer"
            >
              Add to Favourite
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
