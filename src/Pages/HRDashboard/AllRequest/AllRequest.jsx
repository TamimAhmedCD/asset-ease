import useAllRequest from "../../../Hooks/useAllRequest";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllRequest = () => {
  const [requests, refetch] = useAllRequest();

  const axiosPublic = useAxiosPublic();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const approveRequest = (data) => {
    const updateStatus = {
      status: (data.status = "Approved"),
    };
    axiosPublic
      .patch(`/requested-asset/${data._id}`, updateStatus)
      .then((res) => {
        console.log(res.data);
        console.log(data._id);
        refetch();
      });
  };

  const rejectRequest = (data) => {
    const updateStatus = {
      status: (data.status = "Rejected"),
    };
    axiosPublic
      .patch(`/requested-asset/${data._id}`, updateStatus)
      .then((res) => {
        console.log(res.data);
        console.log(data._id);
        refetch();
      });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      {/* <!-- Search Section --> */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Search Requests
        </h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* <!-- Request List Section --> */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Request List
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1753c2] text-white">
              <th className="px-4 py-2 text-left">Asset Name</th>
              <th className="px-4 py-2 text-left">Asset Type</th>
              <th className="px-4 py-2 text-left">Requester Email</th>
              <th className="px-4 py-2 text-left">Requester Name</th>
              <th className="px-4 py-2 text-left">Request Date</th>
              <th className="px-4 py-2 text-left">Additional Note</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* <!-- Example Row 1 --> */}
            {requests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{request.asset_name}</td>
                <td className="px-4 py-2">{request.asset_type}</td>
                <td className="px-4 py-2">{request.requester_email}</td>
                <td className="px-4 py-2">{request.requester_name}</td>
                <td className="px-4 py-2">
                  {formatDate(request.request_date)}
                </td>
                <td className="px-4 py-2">
                  {request.additional_notes === ""
                    ? "N/A"
                    : request.additional_notes}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-3 py-1 ${
                      request.status === "Pending"
                        ? "bg-yellow-500"
                        : request.status === "Approved"
                          ? "bg-green-600"
                          : "bg-red-500"
                    } text-white rounded-lg`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => approveRequest(request)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectRequest(request)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequest;
