import { useState } from "react";
import useAllRequest from "../../../Hooks/useAllRequest";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllRequest = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [requests, refetch] = useAllRequest(searchQuery); // Fetch requests based on search query

  const axiosSecure = useAxiosSecure();
  const approved_date = new Date().toISOString(); // Current date as default

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const approveRequest = (data) => {
    const updateStatus = {
      status: "Approved",
      approved_date,
    };
    axiosSecure
      .patch(`/requested-asset/${data._id}`, updateStatus)
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  const rejectRequest = (data) => {
    const updateStatus = {
      status: "Rejected",
    };
    axiosSecure
      .patch(`/requested-asset/${data._id}`, updateStatus)
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  return (
<div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8 border border-gray-200">
  {/* Search Section */}
  <div className="mb-10">
    <h2 className="text-4xl font-semibold text-gray-900 mb-6">
      Search Requests
    </h2>
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name, email, or asset..."
        className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  </div>

  {/* Request List Section */}
  <h2 className="text-3xl font-semibold text-gray-900 mb-6">Request List</h2>
  <div className="overflow-x-auto rounded-lg shadow">
    {requests.length === 0 ? (
      <p className="text-center text-gray-500 py-8">
        {searchQuery
          ? "No results found"
          : "No asset requests found. Check back later."}
      </p>
    ) : (
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 uppercase">
              Asset Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 uppercase">
              Asset Type
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 uppercase">
              Requester Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 uppercase">
              Requester Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 uppercase">
              Request Date
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 uppercase">
              Additional Note
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-600 uppercase">
              Status
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr
              key={request._id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                {request.asset_name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {request.asset_type}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {request.requester_email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {request.requester_name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {formatDate(request.request_date)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {request.additional_notes || "N/A"}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    request.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : request.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : request.status === "Canceled"
                      ? "bg-gray-100 text-gray-800"
                      : request.status === "Returned"
                      ? "bg-blue-100 text-blue-800"
                      : ""
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center text-sm">
                {request.status !== "Returned" &&
                  request.status !== "Canceled" && (
                    <div className="flex justify-center space-x-3">
                      {request.status !== "Approved" && (
                        <button
                          onClick={() => approveRequest(request)}
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                          title="Approve"
                          disabled={request.status === "Rejected"}
                        >
                          <FaCheck />
                        </button>
                      )}
                      {request.status !== "Rejected" && (
                        <button
                          onClick={() => rejectRequest(request)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                          title="Reject"
                          disabled={request.status === "Approved"}
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

  );
};

export default AllRequest;
