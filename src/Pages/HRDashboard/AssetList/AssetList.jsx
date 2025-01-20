import { useEffect, useState } from "react";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/assets").then((res) => {
      const assets = res.data;
      setAssets(assets);
    });
  }, [axiosPublic]);

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
            {/* Table Row */}
            {assets.map((asset) => (
              <tr key={asset._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{asset.product_name}</td>
                <td className="px-4 py-2">{asset.product_type}</td>
                <td className="px-4 py-2 text-center">
                  {asset.product_quantity}
                </td>
                <td className="px-4 py-2 text-center">
                  <Link to={`/dashboard/update-asset/${asset._id}`}>
                    {" "}
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Edit
                    </button>
                  </Link>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Delete
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

export default AssetList;
