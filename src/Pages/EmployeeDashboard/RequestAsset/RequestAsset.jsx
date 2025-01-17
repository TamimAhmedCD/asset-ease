import React, { useState } from "react";

const RequestAsset = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [assets, setAssets] = useState([]); // Assume this data comes from the server
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Sample assets data (you would fetch this from your server)
  const sampleAssets = [
    { id: 1, name: "Laptop", type: "Returnable", availability: "Available" },
    { id: 2, name: "Headphones", type: "Non-returnable", availability: "Out of stock" },
    // Add more assets here
  ];

  const filteredAssets = sampleAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability = availabilityFilter === "all" || asset.availability === availabilityFilter;
    const matchesAssetType = assetTypeFilter === "all" || asset.type === assetTypeFilter;
    return matchesSearch && matchesAvailability && matchesAssetType;
  });

  const handleRequest = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setAdditionalNotes("");
  };

  const handleRequestSubmit = () => {
    // Here, you would handle the server-side request, including the current date and user info
    console.log("Request submitted for:", selectedAsset, "with notes:", additionalNotes);
    handleModalClose();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        {/* Search Section */}
        <input
          type="text"
          placeholder="Search assets..."
          className="border p-2 rounded w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filter Section */}
        <div className="flex space-x-4">
          <select
            className="border p-2 rounded"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">All Availability</option>
            <option value="Available">Available</option>
            <option value="Out of stock">Out of stock</option>
          </select>
          <select
            className="border p-2 rounded"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="border p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold">{asset.name}</h3>
            <p className="text-gray-600">Asset Type: {asset.type}</p>
            <p className="text-gray-600">Availability: {asset.availability}</p>
            <button
              className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${asset.availability === "Out of stock" ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={asset.availability === "Out of stock"}
              onClick={() => handleRequest(asset)}
            >
              Request
            </button>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Request {selectedAsset.name}</h2>
            <textarea
              className="border p-2 w-full rounded mb-4"
              placeholder="Add any additional notes..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default RequestAsset;
