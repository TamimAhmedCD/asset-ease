import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { FaBox, FaClipboardList, FaPlus } from "react-icons/fa"

const AddAsset = () => {
  // post data using axios
  const axiosPublic = useAxiosPublic();

  // react form to get data
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // navigate user
  const navigate = useNavigate();

  //   submit form
  const onSubmit = async (data) => {
      const createdAt = new Date().toISOString();
    console.log(data, createdAt);
    // asset info
    const assetInfo = {
      product_name: data.product_name,
      product_type: data.product_type,
      product_quantity: Number(data.product_quantity),
      createdAt
    }
    axiosPublic.post("/assets", assetInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Good job!",
          text: "Asset Added",
          icon: "success"
        });
      }
    } ) .catch(error => {
      console.log(error);
    })
    reset()
    navigate('/dashboard/asset-list')
  };

  return (
<div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl rounded-lg p-8 mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Asset</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div className="relative">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="productName"
              {...register("product_name", { required: "Product name is required" })}
              placeholder="Enter product name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1753c2] focus:border-transparent transition duration-300 ease-in-out"
            />
            <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.product_name && <p className="text-red-600 text-sm mt-1">{errors.product_name.message}</p>}
        </div>

        {/* Product Type */}
        <div className="relative">
          <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
            Product Type
          </label>
          <div className="relative">
            <select
              id="productType"
              {...register("product_type", { required: "Product type is required" })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1753c2] focus:border-transparent transition duration-300 ease-in-out appearance-none"
            >
              <option value="" disabled selected>
                Select product type
              </option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
            <FaClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.product_type && <p className="text-red-600 text-sm mt-1">{errors.product_type.message}</p>}
        </div>

        {/* Product Quantity */}
        <div className="relative">
          <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700 mb-1">
            Product Quantity
          </label>
          <div className="relative">
            <input
              type="number"
              id="productQuantity"
              {...register("product_quantity", {
                required: "Product quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
              placeholder="Enter quantity"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1753c2] focus:border-transparent transition duration-300 ease-in-out"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">#</span>
          </div>
          {errors.product_quantity && <p className="text-red-600 text-sm mt-1">{errors.product_quantity.message}</p>}
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="w-full bg-[#1753c2] text-white py-3 rounded-lg hover:bg-[#1345a0] focus:ring-2 focus:ring-[#1753c2] focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <FaPlus className="mr-2" />
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
