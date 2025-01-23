import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAsset from "../../../Hooks/useAsset";
import { FaEdit, FaTrashAlt, FaSearch, FaSort, FaFilter } from 'react-icons/fa';

const AssetList = () => {
  const axiosPublic = useAxiosPublic();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [productType, setProductType] = useState("all");

  const [assets] = useAsset({ search, sort, product_type: productType });

  const handleDelete = (id) => {
    axiosPublic
      .delete(`/assets/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Good job!",
            text: "Asset Delete Success",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Asset Delete Unsuccess",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl rounded-lg p-8 mt-10">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Asset Management</h2>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-8">
        <div className="relative flex-grow mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search by product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative mb-4 md:mb-0">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-auto pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition duration-300 ease-in-out"
          >
            <option value="all-quantity">All Quantity</option>
            <option value="asc">Sort by Quantity (Asc)</option>
            <option value="desc">Sort by Quantity (Desc)</option>
          </select>
          <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full md:w-auto pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition duration-300 ease-in-out"
          >
            <option value="all">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Product Type</th>
              <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr key={asset._id} className="hover:bg-blue-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.product_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.product_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{asset.product_quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  <Link to={`/dashboard/update-asset/${asset._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center">
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out flex items-center inline-flex"
                  >
                    <FaTrashAlt className="mr-2" />
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