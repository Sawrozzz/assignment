/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { usePropertyStore, type Favourite } from "../store/propertyStore";
import Loader from "../components/Loader";
import { MapPin, DollarSign, Heart, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

export default function FavouritePage() {
  const {
    favourites,
    loading,
    error,
    getFavouriteProperties,
    removeFromFavourite,
    toogleLike,
  } = usePropertyStore();

  useEffect(() => {
    getFavouriteProperties();
  }, []);

  const handleRemoveFromFav = async (favouriteId: number) => {
    try {
      await removeFromFavourite(favouriteId);
      toast.success("Successfully remove from favourite");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="p-10 text-red-500 text-center">Error fetching properties</p>
    );
  if (favourites.length === 0)
    return (
      <div className="text-center p-20 text-gray-500">No favourites found</div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        My Saved Properties
      </h1>

      <div className="flex flex-col gap-4">
        {favourites.map((fav: Favourite) => {
          const property = fav.property;
          return (
            <div
              key={fav.id}
              className="flex flex-col sm:flex-row items-center bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-full sm:w-48 h-32 shrink-0">
                <img
                  src="building.png"
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-4 flex flex-col justify-center">
                <h2 className="text-lg font-bold text-gray-900">
                  {property.title}
                </h2>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center text-blue-600 font-semibold mt-2">
                  <DollarSign size={16} />
                  {property.price.toLocaleString()}
                </div>
              </div>

              <div className="p-4 flex flex-row items-center sm:flex-col gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => toogleLike(fav.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all ${
                    fav.is_liked
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Heart
                    size={16}
                    className={fav.is_liked ? "fill-red-600" : ""}
                  />
                  {fav.is_liked ? "Liked" : "Like"}
                </button>

                <div className="w-full border-t border-gray-200 my-1" />

                <button
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 cursor-pointer"
                  title="Remove from favourite"
                  onClick={() => handleRemoveFromFav(fav.id)}
                >
                  <Trash2Icon size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
