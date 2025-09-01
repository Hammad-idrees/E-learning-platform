import React from "react";
import BannerCard from "./BannerCard";
import { ImageOff } from "lucide-react";

const BannerGrid = ({ items, onDelete, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm animate-pulse"
          >
            <div className="w-full h-40 bg-gray-200"></div>
            <div className="p-4 flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="text-center py-12 px-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <ImageOff className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          No banners yet
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Upload banner images above to display them here. Banners will appear
          in your application.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Banner Gallery <span className="text-gray-500">({items.length})</span>
        </h3>
        <p className="text-sm text-gray-500">
          {items.length} banner{items.length !== 1 ? "s" : ""} uploaded
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((banner) => (
          <BannerCard key={banner._id} banner={banner} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default BannerGrid;
