import React, { useEffect, useState } from "react";

const Listings = () => {
  const [allListings, setAllListings] = useState([]);
  const [visibleListings, setVisibleListings] = useState([]);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  useEffect(() => {
    fetch("/listing_data.json")
      .then((res) => res.json())
      .then((data) => {
        setAllListings(data);
        setVisibleListings(data.slice(0, 8));
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleListings(allListings);
    setLoadMoreClicked(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Device Listings</h1>

      <div className="space-y-10">
        {visibleListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white grid grid-cols-[1fr_2fr] hover:scale-105 duration-300 shadow-lg rounded-2xl overflow-hidden border border-gray-200"
          >
            <div>
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {listing.title}
              </h2>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {listing.location} • {listing.date_posted}
                </p>
                <p className="text-green-600 border rounded-full px-2 text-sm bg-green-50">
                  {listing.status}
                </p>
              </div>

              <div className="mt-2 text-gray-700">
                <p>
                  <span className="text-red-500 text-2xl font-bold">
                    ${listing.price}
                  </span>

                  <span className="text-xs pl-1">
                    {listing.currency} - Per Unit
                  </span>
                </p>
                <p>{listing.transaction_type}</p>
              </div>

              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Seller:</strong> {listing.seller.name}
                </p>
                <p className="italic">{listing.seller.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loadMoreClicked && (
        <button
          onClick={handleLoadMore}
          className="mt-10 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 duration-300"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Listings;
