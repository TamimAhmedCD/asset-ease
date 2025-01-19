import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAuth from './../../../Hooks/useAuth';

const RequestAsset = () => {
  const {user} = useAuth()
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null); // State for selected asset

  const axiosPublic = useAxiosPublic();
  const assets = useLoaderData();
  console.log(assets);

  // Handle opening the modal with the selected asset
  const handleRequest = (asset) => {
    setSelectedAsset(asset); // Store the clicked asset in state
    setIsModalOpen(true); // Open modal
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAsset(null); // Reset selected asset when modal closes
  };

  // Handle submitting the request
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const additional_notes = form.additional_notes.value;

    // Add default data for the request
    const requester_name = user.displayName; // Replace with actual user info if available
    const requester_email = user.email
    const request_date = new Date().toISOString(); // Current date as default
    const asset_id = selectedAsset._id;
    const asset_name = selectedAsset.product_name;
    const asset_type = selectedAsset.product_type

    const requestedAsset = {
      asset_id,
      asset_name,
      asset_type,
      requester_name,
      requester_email,
      status: "Pending",
      request_date,
      additional_notes,
    };
    console.log(requestedAsset);

    try {
      const response = await axiosPublic.post("/requested-asset", requestedAsset);
      console.log("Request submitted:", response.data);

      // Success feedback
      alert("Asset request submitted successfully!");
      handleModalClose();
    } catch (error) {
      console.error("Error submitting asset request:", error);
      alert("Failed to submit asset request. Please try again.");
    }
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
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{asset.product_name}</td>
                <td className="px-4 py-2">{asset.product_type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      asset.product_quantity > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {`${asset.product_quantity > 0 ? "Available" : "Out of stock"}`}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className={`px-4 py-2 text-white rounded ${
                      asset.product_quantity === "0"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={asset.product_quantity === "0"}
                    onClick={() => handleRequest(asset)} // Pass the asset to the handler
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
      {isModalOpen && selectedAsset && (
        <form onSubmit={handleRequestSubmit}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-2xl font-semibold mb-4">Request Asset</h2>
              <textarea
                className="border p-2 w-full rounded mb-4"
                placeholder="Add any additional notes..."
                name="additional_notes"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default RequestAsset;
