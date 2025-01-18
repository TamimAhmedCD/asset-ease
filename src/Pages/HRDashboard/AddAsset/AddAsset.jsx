import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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
      product_quantity: data.product_quantity,
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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add New Asset
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-600"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            {...register("product_name", { required: true })}
            required
            placeholder="Enter product name"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.product_name && (
            <p className="text-red-600">This field is required</p>
          )}
        </div>

        {/* Product Type */}
        <div>
          <label
            htmlFor="productType"
            className="block text-sm font-medium text-gray-600"
          >
            Product Type
          </label>
          <select
            id="productType"
            {...register("product_type", { required: true })}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="" disabled>
              Select product type
            </option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
          {errors.product_type && (
            <p className="text-red-600">This field is required</p>
          )}
        </div>

        {/* Product Quantity */}
        <div>
          <label
            htmlFor="productQuantity"
            className="block text-sm font-medium text-gray-600"
          >
            Product Quantity
          </label>
          <input
            type="number"
            id="productQuantity"
            required
            {...register("product_quantity", { required: true })}
            placeholder="Enter quantity"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.product_quantity && (
            <p className="text-red-600">This field is required</p>
          )}
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
