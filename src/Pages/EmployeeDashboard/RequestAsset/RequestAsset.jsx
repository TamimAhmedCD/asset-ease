import { useState } from "react";

const RequestAsset = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Sample assets data
  const sampleAssets = [
    { id: 1, name: "Laptop", type: "Returnable", availability: "Available" },
    { id: 2, name: "Headphones", type: "Non-returnable", availability: "Out of stock" },
    { id: 3, name: "Projector", type: "Returnable", availability: "Available" },
    { id: 4, name: "Whiteboard", type: "Non-returnable", availability: "Available" },
    { id: 5, name: "Tablet", type: "Returnable", availability: "Out of stock" },
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
    console.log("Request submitted for:", selectedAsset, "with notes:", additionalNotes);
    handleModalClose();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search assets..."
          className="border p-2 rounded w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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

      {/* Assets Table */}
      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Asset Name</th>
              <th className="px-4 py-2 text-left">Asset Type</th>
              <th className="px-4 py-2 text-left">Availability</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{asset.name}</td>
                <td className="px-4 py-2">{asset.type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      asset.availability === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {asset.availability}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className={`px-4 py-2 text-white rounded ${
                      asset.availability === "Out of stock"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={asset.availability === "Out of stock"}
                    onClick={() => handleRequest(asset)}
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
