import { useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animation from "./Register.json";
import { IoEye, IoEyeOff } from "react-icons/io5";

const JoinHR = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Animation Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-r from-[#1753c2] to-[#1c76e6]">
        <Lottie animationData={animation} />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 lg:px-16 bg-white my-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Join as HR Manager</h1>
        <p className="text-gray-600 mb-8 text-center">
          Welcome to <span className="text-[#1753c2] font-semibold">AssetEase</span>. Manage your company assets with ease!
        </p>

        <form className="w-full max-w-md">
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your full name"
            />
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="company">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your company name"
            />
          </div>

          {/* Company Logo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="logo">
              Company Logo
            </label>
            <input
              type="file"
              id="logo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your password"
            />
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
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
            />
          </div>

          {/* Package Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="package">
              Select a Package
            </label>
            <select
              id="package"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
            >
              <option value="basic">Basic - $49/month</option>
              <option value="standard">Standard - $99/month</option>
              <option value="premium">Premium - $199/month</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1753c2] text-white py-2 px-4 rounded-lg hover:bg-[#1753c2ce] focus:outline-none focus:ring-2 focus:ring-[#1753c2] focus:ring-offset-2"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1753c2] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinHR;
