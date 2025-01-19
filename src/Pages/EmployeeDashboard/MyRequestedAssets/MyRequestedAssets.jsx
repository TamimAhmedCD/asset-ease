import { useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaPrint,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import useAuth from "./../../../Hooks/useAuth";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const MyRequestedAssets = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  // Fetching requested assets using React Query
  const { data: requestedAssets = [], refetch } = useQuery({
    queryKey: ["requestedAssets", user.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/requested-asset?email=${user.email}`);
      return res.data;
    },
  });

  const handleFilter = () => {
    console.log(`Filtering by status: ${filterStatus}, type: ${filterType}`);
  };

  // Handle canceling a request
  const cancelRequest = async (id) => {
    try {
      await axiosPublic.delete(`/requested-asset/${id}`);
      console.log(`Cancelled request for asset ID: ${id}`);
      refetch(); // Refetch data after canceling
    } catch (error) {
      console.error("Error canceling asset request:", error);
      alert("Failed to cancel asset request.");
    }
  };

  // Handle printing asset details
  const printAssetDetails = (asset) => {
    console.log(`Printing details for asset: ${asset.name}`);
    // Placeholder for React-PDF implementation
  };

  // Handle returning an asset
  const returnAsset = async (id) => {
    try {
      // Example API call to return the asset (You can adjust this)
      await axiosPublic.post(`/return-asset`, { id });
      console.log(`Returned asset ID: ${id}`);
      refetch(); // Refetch data after returning the asset
    } catch (error) {
      console.error("Error returning asset:", error);
      alert("Failed to return asset.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-md shadow-md mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center w-full md:w-1/2 border rounded-lg shadow-sm">
          <FaSearch className="text-gray-500 ml-3" />
          <input
            type="text"
            placeholder="Search by Asset Name..."
            className="flex-grow p-2 border-0 focus:ring-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border p-2 rounded-lg shadow-sm focus:ring-indigo-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Returned">Returned</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          className="border p-2 rounded-lg shadow-sm focus:ring-indigo-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filter by Type</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-Returnable">Non-Returnable</option>
        </select>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm"
          onClick={handleFilter}
        >
          Apply Filters
        </button>

        <button
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 shadow-sm flex items-center"
          onClick={() => {
            setSearch("");
            setFilterStatus("");
            setFilterType("");
          }}
        >
          <AiOutlineReload className="mr-2" /> Reset Filters
        </button>
      </div>

      {/* Asset List Section */}
      <div className="bg-white p-4 rounded-md shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3 text-left text-sm font-semibold">Asset Name</th>
              <th className="p-3 text-left text-sm font-semibold">Asset Type</th>
              <th className="p-3 text-left text-sm font-semibold">Request Date</th>
              <th className="p-3 text-left text-sm font-semibold">Approval Date</th>
              <th className="p-3 text-left text-sm font-semibold">Request Status</th>
              <th className="p-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestedAssets.map((asset, index) => (
              <tr
                key={asset.id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-indigo-50`}
              >
                <td className="p-3 border text-sm">{asset.asset_name}</td>
                <td className="p-3 border text-sm">{asset.asset_type}</td>
                <td className="p-3 border text-sm">{formatDate(asset.request_date)}</td>
                <td className="p-3 border text-sm">{formatDate(asset.approved_date)}</td>
                <td className="p-3 border text-sm">
                  <span
                    className={`px-3 py-1 rounded text-white text-xs font-medium ${
                      asset.status === "Pending"
                        ? "bg-yellow-500"
                        : asset.status === "Approved"
                        ? "bg-green-500"
                        : asset.status === "Returned"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="p-3 border text-sm">
                  {asset.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2 flex items-center"
                      onClick={() => cancelRequest(asset._id)}
                    >
                      <FaTrash className="mr-1" /> Cancel
                    </button>
                  )}
                  {asset.status === "Approved" && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 flex items-center"
                        onClick={() => printAssetDetails(asset)}
                      >
                        <FaPrint className="mr-1" /> Print
                      </button>
                      {asset.asset_type === "Returnable" && (
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center"
                          onClick={() => returnAsset(asset.id)}
                          disabled={asset.status === "Returned"}
                        >
                          <FaArrowAltCircleLeft className="mr-1" /> Return
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequestedAssets;