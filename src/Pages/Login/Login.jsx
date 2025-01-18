import {useState } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import animation from "./Register.json";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "./../../Hooks/useAuth";

const Login = () => {
  // navigate user
  const navigate = useNavigate();

  // user auth
  const { loginUser } = useAuth();

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

  //   submit form
  const onSubmit = async (data) => {
    // create user
    loginUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      Swal.fire({
        title: "Login Success!",
        text: "Successfully Register",
        icon: "success",
        timer: 1500,
      });
    });

    // after success fully submit form then reset the form
    reset();

    // navigate the user
      navigate("/dashboard/dashboard");

  };

  return (
    <div className="flex min-h-screen">
      {/* Left Animation Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-r from-[#1753c2] to-[#1c76e6]">
        <Lottie animationData={animation} />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 lg:px-16 bg-white my-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Welcome Back!
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Welcome to{" "}
          <span className="text-[#1753c2] font-semibold">AssetEase</span>.
          Manage your company assets with ease!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1753c2] text-white py-2 px-4 rounded-lg hover:bg-[#1753c2ce] focus:outline-none focus:ring-2 focus:ring-[#1753c2] focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Have already account?
          <Link
            to="/employee-register"
            className="text-[#1753c2] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
