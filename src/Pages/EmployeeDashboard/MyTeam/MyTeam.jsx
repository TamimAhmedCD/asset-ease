const MyTeam = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Team Members
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1753c2] text-white">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Member Type</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* <!-- Example Row 1 --> */}
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Team Member"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2 font-medium text-gray-800">John Doe</td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <span className="text-green-500">
                  {/* <!-- Admin Icon --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 2.5c0-.69.56-1.25 1.25-1.25h2a1.25 1.25 0 011.25 1.25v.5h1.25A1.75 1.75 0 0117.25 4v1.5a1.75 1.75 0 01-1.75 1.75H7.5A1.75 1.75 0 015.75 5.5V4c0-.97.78-1.75 1.75-1.75H8.75v-.5zm-1.5 7.5H16.5m-4.5 4h-3m3 0h3m-3 0v2.75m0-2.75v-2.25"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">Admin</span>
              </td>
              <td className="px-4 py-2 text-center">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Remove
                </button>
              </td>
            </tr>
            {/* <!-- Example Row 2 --> */}
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Team Member"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2 font-medium text-gray-800">
                Jane Smith
              </td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <span className="text-blue-500">
                  {/* <!-- Employee Icon --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 7.5c-.1-.15-.5-.5-.5-.5V6.25A2.75 2.75 0 0013.25 3.5h-2.5A2.75 2.75 0 008 6.25V7a.5.5 0 01-.5.5H5.75c-.69 0-1.25.56-1.25 1.25v9.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V8.75c0-.69-.56-1.25-1.25-1.25H16.5z"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">Employee</span>
              </td>
              <td className="px-4 py-2 text-center">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
