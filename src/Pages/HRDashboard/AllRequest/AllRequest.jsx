import { useState } from "react";
import useAllRequest from "../../../Hooks/useAllRequest";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";

const AllRequest = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [requests, refetch] = useAllRequest(searchQuery); // Fetch requests based on search query

  const axiosPublic = useAxiosPublic();
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
    axiosPublic
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
    axiosPublic
      .patch(`/requested-asset/${data._id}`, updateStatus)
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-8">
      {/* Search Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Search Requests
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or asset..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1753c2] focus:border-transparent transition duration-300 ease-in-out"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Request List Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Request List</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {requests.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            {searchQuery
              ? "No results found"
              : "No asset requests found. Check back later."}
          </p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#1753c2] to-blue-700 text-white">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Asset Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Asset Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Requester Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Requester Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Additional Note
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request, index) => (
                <tr
                  key={request._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.asset_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.asset_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.requester_email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.requester_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(request.request_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.additional_notes || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {request.status !== "Returned" &&
                      request.status !== "Canceled" && (
                        <div className="flex justify-center space-x-2">
                          {request.status !== "Approved" && (
                            <button
                              onClick={() => approveRequest(request)}
                              className="flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition disabled:bg-green-300"
                              disabled={request.status === "Rejected"}
                              title="Approve the request"
                            >
                              <FaCheck className="mr-1" />
                              Approve
                            </button>
                          )}
                          {request.status !== "Rejected" && (
                            <button
                              onClick={() => rejectRequest(request)}
                              className="flex items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition disabled:bg-red-300"
                              disabled={request.status === "Approved"}
                              title="Reject the request"
                            >
                              <FaTimes className="mr-1" />
                              Reject
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
