import { useState } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import animation from "./Register.json";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "./../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userRole, setUserRole] = useState("employee");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    if (role === "employee") {
      setValue("email", "employee@example.com");
      setValue("password", "Employee@123");
    } else {
      setValue("email", "hr@example.com");
      setValue("password", "Hr@12345");
    }
  };

  const onSubmit = async (data) => {
    loginUser(data.email, data.password).then(() => {
      Swal.fire({
        title: "Login Success!",
        text: "Successfully Logged In",
        icon: "success",
        timer: 1500,
      });
      navigate("/dashboard/dashboard");
    });
    reset();
  };

  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>AssetEase | Login</title>
      </Helmet>
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-r from-[#1753c2] to-[#1c76e6]">
        <Lottie animationData={animation} />
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 lg:px-16 bg-white my-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Welcome Back!</h1>
        <p className="text-gray-600 mb-8 text-center">
          Welcome to <span className="text-[#1753c2] font-semibold">AssetEase</span>.
          Manage your company assets with ease!
        </p>

        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 border rounded-lg ${userRole === "employee" ? "bg-[#1753c2] text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => handleRoleChange("employee")}
          >
            Employee
          </button>
          <button
            className={`px-4 py-2 border rounded-lg ${userRole === "hr" ? "bg-[#1753c2] text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => handleRoleChange("hr")}
          >
            HR
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your email address"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-600">This field is required</p>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2]"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 top-[40%] flex items-center text-gray-500 hover:text-[#1753c2] focus:outline-none"
            >
              {passwordVisible ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1753c2] text-white py-2 px-4 rounded-lg hover:bg-[#1753c2ce] focus:outline-none focus:ring-2 focus:ring-[#1753c2] focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 my-4">
          Have an account?
          <Link to="/employee-register" className="text-[#1753c2] font-medium hover:underline">
            Register
          </Link>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
