/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import toast from "react-hot-toast";
import { MapPinIcon } from "lucide-react";

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
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Available Properties
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Discover {properties.length} premium listings in your area
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src="building.png"
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-slate-800 line-clamp-1">
                  {property.title}
                </h2>
                <span className="text-emerald-600 font-bold text-md tracking-tight">
                  Rs.{property.price.toLocaleString()}
                </span>
              </div>

              <p className="text-slate-500 text-sm flex items-center gap-1">
                <MapPinIcon size={14} /> {property.location}
              </p>

              <button
                onClick={() => handleAddToFavourite(property)}
                className="w-full mt-4 py-2 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 text-sm"
              >
                Add to favourite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
