import { useState, useEffect } from "react";
import {
  FaSearch,
  FaTrash,
  FaPrint,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import useAuth from "./../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyRequestedAssets = () => {
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

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState(""); // New state for asset type filter
  const [status, setStatus] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/employee-account/${user.email}`).then((res) => {
      const employeeStatus = res.data.employee_status;
      setStatus(employeeStatus);
    });
  }, [user.email, axiosSecure]);

  const { data: requestedAssets = [], refetch } = useQuery({
    queryKey: ["requestedAssets", user.email, search, filterStatus, filterType], // Add filterType to queryKey
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requested-asset?email=${user.email}&search=${search}&status=${filterStatus}&asset_type=${filterType}`
      );
      return res.data;
    },
  });

  const cancelRequest = (id) => {
    const updateStatus = { status: "Canceled" };
    axiosSecure
      .patch(`/requested-asset/${id}`, updateStatus)
      .then(() => refetch());
  };

  const printAssetDetails = (asset) => {
    console.log(`Printing details for asset: ${asset.name}`);
  };

  const returnAsset = (id) => {
    const updateStatus = { status: "Returned" };
    axiosSecure
      .patch(`/requested-asset/${id}`, updateStatus)
      .then(() => refetch());
  };

  if (status === true) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <Helmet>
          <title>AssetEase | My Request</title>
        </Helmet>
        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-xl mb-8 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex items-center w-full md:w-1/3 border rounded-xl shadow-md">
            <FaSearch className="text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Search by Asset Name..."
              className="flex-grow p-3 border-0 focus:ring-2 focus:ring-indigo-500 rounded-lg focus:outline-none text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border p-3 rounded-xl shadow-md focus:ring-indigo-500 focus:outline-none text-lg"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              refetch();
            }}
          >
            <option value="">Filter by Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Returned">Returned</option>
            <option value="Canceled">Canceled</option>
          </select>

          <select
            className="border p-3 rounded-xl shadow-md focus:ring-indigo-500 focus:outline-none text-lg"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              refetch();
            }}
          >
            <option value="">Filter by Type</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>

          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md flex items-center"
            onClick={() => {
              setSearch("");
              setFilterStatus("");
              setFilterType(""); // Reset asset type filter
              refetch();
            }}
          >
            <AiOutlineReload className="mr-3" /> Reset Filters
          </button>
        </div>

        {/* Asset List Section */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <table className="w-full border-collapse rounded-xl">
            <thead>
              <tr className="bg-indigo-600 text-white rounded-t-xl">
                <th className="p-4 text-left text-lg font-semibold">
                  Asset Name
                </th>
                <th className="p-4 text-left text-lg font-semibold">
                  Asset Type
                </th>
                <th className="p-4 text-left text-lg font-semibold">
                  Request Date
                </th>
                <th className="p-4 text-left text-lg font-semibold">
                  Approval Date
                </th>
                <th className="p-4 text-left text-lg font-semibold">
                  Request Status
                </th>
                <th className="p-4 text-left text-lg font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requestedAssets.length > 0 ? (
                requestedAssets.map((asset, index) => (
                  <tr
                    key={asset._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-100 transition-all`}
                  >
                    <td className="p-4 text-sm">{asset.asset_name}</td>
                    <td className="p-4 text-sm">{asset.asset_type}</td>
                    <td className="p-4 text-sm">
                      {formatDate(asset.request_date)}
                    </td>
                    <td className="p-4 text-sm">
                      {formatDate(asset.approved_date)}
                    </td>
                    <td className="p-4 text-sm">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-medium ${
                          asset.status === "Pending"
                            ? "bg-yellow-500 text-white"
                            : asset.status === "Approved"
                              ? "bg-green-500 text-white"
                              : asset.status === "Returned"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-500 text-white"
                        }`}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {asset.status === "Pending" && (
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 mr-2 flex items-center"
                          onClick={() => cancelRequest(asset._id)}
                        >
                          <FaTrash className="mr-2" /> Cancel
                        </button>
                      )}
                      {asset.status === "Approved" && (
                        <>
                          <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 mr-2 flex items-center"
                            onClick={() => printAssetDetails(asset)}
                          >
                            <FaPrint className="mr-2" /> Print
                          </button>
                          {asset.asset_type === "Returnable" && (
                            <button
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
                              onClick={() => returnAsset(asset._id)}
                            >
                              <FaArrowAltCircleLeft className="mr-2" /> Return
                            </button>
                          )}
                        </>
                      )}
                      {asset.status === "Returned" && (
                        <button
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
                          onClick={() => printAssetDetails(asset)}
                        >
                          <FaPrint className="mr-2" /> Print
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No requested assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6">
        <p className="text-lg">
          ⚠ You are not affiliated with any company. Please contact your HR to
          complete the affiliation process.
        </p>
      </div>
    );
  }
};

export default MyRequestedAssets;
