import { useState } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import animation from "./Register.json";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "./../../../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../../Login/SocialLogin";
import { Helmet } from "react-helmet-async";

const JoinHR = () => {
  // Host image
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // navigate user
  const navigate = useNavigate();

  // post data using axios
  const axiosPublic = useAxiosPublic();

  // user auth
  const { createUser, updateUserProfile } = useAuth();

  // payment status
  const paymentStatus = false;

  // react form to get data
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // password toggle
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // submit form
  const onSubmit = async (data) => {
    const imageFile = { image: data.company_logo[0] };
    // host image
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const profile = res.data.data.display_url;

    // user info
    const userInfo = {
      name: data.name,
      email: data.email,
      company_name: data.company_name,
      company_logo: profile,
      package: data.package,
      dob: data.dob,
      password: data.password,
      paymentStatus: paymentStatus,
      role: "HR",
    };

    // post user info
    axiosPublic.post("/hr-account", userInfo).then((res) => {
      if (res.data.insertedId) {
        // create user
        createUser(data.email, data.password).then((result) => {
          const loggedUser = result.user;
          console.log(loggedUser);

          // update user
          updateUserProfile(data.name, profile)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        });

        // after success fully submit form then reset the form
        reset();

        // if account create and post data the show the success alert
        Swal.fire({
          title: "Register Success!",
          text: "Successfully Register",
          icon: "success",
          timer: 1500,
        });

        // navigate the user
        navigate("/dashboard/dashboard");
      } else {
        Swal.fire({
          title: "Already Exist",
          text: "Email Already Exist",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>AssetEase | Register</title>
      </Helmet>
      {/* Left Animation Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-r from-[#1753c2] to-[#1c76e6]">
        <Lottie animationData={animation} />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 lg:px-16 bg-white my-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Join as HR Manager
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Welcome to{" "}
          <span className="text-[#1753c2] font-semibold">AssetEase</span>.
          Manage your company assets with ease!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          {/* Full Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-600">This field is required</p>
            )}
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="company"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your company name"
              {...register("company_name", { required: true })}
            />
            {errors.company_name && (
              <p className="text-red-600">This field is required</p>
            )}
          </div>

          {/* Company Logo */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="logo"
            >
              Company Logo
            </label>
            <input
              type="file"
              id="logo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              {...register("company_logo", { required: true })}
            />
            {errors.company_logo && (
              <p className="text-red-600">This field is required</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your email address"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-600">This field is required</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 16,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
            />
            {errors.password && (
              <p className="text-red-600">This field is required</p>
            )}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 top-[40%] flex items-center text-gray-500 hover:text-[#1753c2] focus:outline-none"
            >
              {passwordVisible ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              {...register("dob", { required: true })}
            />
            {errors.dob && (
              <p className="text-red-600">This field is required</p>
            )}
          </div>

          {/* Package Selection */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="package"
            >
              Select a Package
            </label>
            <select
              id="package"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              {...register("package", { required: true })}
            >
              <option value="basic">Maximum 5 Employees- $5/month</option>
              <option value="standard">Maximum 10 Employees- $8/month</option>
              <option value="premium">Maximum 20 Employees- $15/month</option>
            </select>
            {errors.package && (
              <p className="text-red-600">This field is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1753c2] text-white py-2 px-4 rounded-lg hover:bg-[#1753c2ce] focus:outline-none focus:ring-2 focus:ring-[#1753c2] focus:ring-offset-2"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-gray-600 my-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#1753c2] font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default JoinHR;
