// Import React and required libraries
import { useState } from 'react';
import { FaSearch, FaTrash, FaPrint, FaArrowAltCircleLeft } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';

const MyRequestedAssets = () => {
  // State variables
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [assets, setAssets] = useState([ // Example assets
    {
      id: 1,
      name: 'Laptop',
      type: 'Returnable',
      requestDate: '2025-01-10',
      approvalDate: '',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Office Chair',
      type: 'Non-Returnable',
      requestDate: '2025-01-09',
      approvalDate: '2025-01-11',
      status: 'Approved',
    },
  ]);

  // Handlers
  const handleSearch = () => {
    console.log(`Searching for: ${search}`);
    // Implement server-side search here
  };

  const handleFilter = () => {
    console.log(`Filtering by status: ${filterStatus}, type: ${filterType}`);
    // Implement server-side filtering here
  };

  const cancelRequest = (id) => {
    console.log(`Cancel request for asset ID: ${id}`);
    // Implement cancel request here
  };

  const printAssetDetails = (asset) => {
    console.log(`Printing details for asset: ${asset.name}`);
    // Implement React-PDF logic here
  };

  const returnAsset = (id) => {
    console.log(`Returning asset ID: ${id}`);
    // Implement return logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-md shadow mb-6 flex flex-wrap gap-4 items-center">
        {/* Search Bar */}
        <div className="flex items-center w-full md:w-1/2 border rounded-lg">
          <FaSearch className="text-gray-500 ml-3" />
          <input
            type="text"
            placeholder="Search by Asset Name..."
            className="flex-grow p-2 border-0 focus:ring-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <select
          className="border p-2 rounded-lg focus:ring-indigo-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>

        <select
          className="border p-2 rounded-lg focus:ring-indigo-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filter by Type</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-Returnable">Non-Returnable</option>
        </select>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={handleFilter}
        >
          Apply Filters
        </button>

        <button
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          onClick={() => {
            setSearch('');
            setFilterStatus('');
            setFilterType('');
          }}
        >
          <AiOutlineReload className="inline mr-2" /> Reset Filters
        </button>
      </div>

      {/* Asset List Section */}
      <div className="bg-white p-4 rounded-md shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Asset Name</th>
              <th className="p-3 border">Asset Type</th>
              <th className="p-3 border">Request Date</th>
              <th className="p-3 border">Approval Date</th>
              <th className="p-3 border">Request Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-100">
                <td className="p-3 border">{asset.name}</td>
                <td className="p-3 border">{asset.type}</td>
                <td className="p-3 border">{asset.requestDate}</td>
                <td className="p-3 border">{asset.approvalDate || 'N/A'}</td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      asset.status === 'Pending'
                        ? 'bg-yellow-500'
                        : asset.status === 'Approved'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="p-3 border">
                  {asset.status === 'Pending' && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                      onClick={() => cancelRequest(asset.id)}
                    >
                      <FaTrash /> Cancel
                    </button>
                  )}
                  {asset.status === 'Approved' && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                        onClick={() => printAssetDetails(asset)}
                      >
                        <FaPrint /> Print
                      </button>
                      {asset.type === 'Returnable' && (
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={() => returnAsset(asset.id)}
                        >
                          <FaArrowAltCircleLeft /> Return
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
