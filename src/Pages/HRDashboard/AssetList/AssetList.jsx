
const AssetList = () => {
    return (
<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asset List</h2>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#1753c2] text-white">
          <th className="px-4 py-2 text-left">Product Name</th>
          <th className="px-4 py-2 text-left">Product Type</th>
          <th className="px-4 py-2 text-center">Quantity</th>
          <th className="px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {/* <!-- Example Row 1 --> */}
        <tr className="hover:bg-gray-100">
          <td className="px-4 py-2">Laptop</td>
          <td className="px-4 py-2">Returnable</td>
          <td className="px-4 py-2 text-center">10</td>
          <td className="px-4 py-2 text-center">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
        {/* <!-- Example Row 2 --> */}
        <tr className="hover:bg-gray-100">
          <td className="px-4 py-2">Office Chair</td>
          <td className="px-4 py-2">Non-Returnable</td>
          <td className="px-4 py-2 text-center">25</td>
          <td className="px-4 py-2 text-center">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    );
};

export default AssetList;