import React, { useState } from "react";

const MyAsset = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [assets, setAssets] = useState([]); // Example data fetched from the server
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Sample assets data (this would be replaced with data fetched from the server)
  const sampleAssets = [
    { id: 1, name: "Laptop", type: "Returnable", availability: "Available" },
    { id: 2, name: "Headphones", type: "Non-returnable", availability: "Out of stock" },
    // Add more assets here
  ];

  // Filter assets based on search and filter conditions
  const filteredAssets = sampleAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability = availabilityFilter === "all" || asset.availability === availabilityFilter;
    const matchesAssetType = assetTypeFilter === "all" || asset.type === assetTypeFilter;
    return matchesSearch && matchesAvailability && matchesAssetType;
  });

  // Handle asset request modal opening
  const handleRequest = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setAdditionalNotes("");
  };

  // Handle request submission
  const handleRequestSubmit = () => {
    // Handle server-side request logic, including current date and user info
    console.log("Request submitted for:", selectedAsset, "with notes:", additionalNotes);
    handleModalClose();
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Request an Asset</h1>
          <p className="text-gray-500">Search and filter the available assets below.</p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4 w-full">
            <input
              type="text"
              placeholder="Search assets..."
              className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-1/3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-1/3"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="all">All Availability</option>
              <option value="Available">Available</option>
              <option value="Out of stock">Out of stock</option>
            </select>
            <select
              className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-1/3"
              value={assetTypeFilter}
              onChange={(e) => setAssetTypeFilter(e.target.value)}
            >
              <option value="all">All Asset Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
        </div>

        {/* Assets List Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800">{asset.name}</h3>
              <p className="text-gray-600">Type: {asset.type}</p>
              <p className="text-gray-600">Availability: {asset.availability}</p>
              <button
                className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-semibold ${
                  asset.availability === "Out of stock"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={asset.availability === "Out of stock"}
                onClick={() => handleRequest(asset)}
              >
                Request
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Request {selectedAsset?.name}</h2>
            <textarea
              className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
              placeholder="Add any additional notes..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleRequestSubmit}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAsset;
