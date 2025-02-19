import { useEffect } from "react";
import moment from "moment";
import { Button } from "@material-tailwind/react";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
    const { user, } = useAuth();

  useEffect(() => {
    document.title = "My Profile | AssetEase";
  }, []);

  return (
    <div className="px-4 py-6 lg:px-20 md:px-12 lg:py-8">
      <h1 className="font-bold text-2xl text-[#34d399d7]">
        Welcome, {user.displayName}
      </h1>
      <p className="pt-3 text-lg text-[#ADA7A7] font-light">
        {moment().format("ddd, D MMMM YYYY")}
      </p>
      <div className="py-5">
        <div className="rounded-t-xl bg-gradient-to-r from-[#6ee7b7] to-[#fef3c7] h-20 lg:h-28"></div>
      </div>
      <div className="p-5 flex justify-between items-center">
        <div className="flex lg:gap-6 gap-3 items-center">
          {user && user.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              className="w-10 h-10 lg:w-16 lg:h-16 rounded-full object-cover"
            />
          ) : (
            <FaCircleUser className="lg:text-6xl text-4xl text-black  "></FaCircleUser>
          )}
          <div>
            {user && user.displayName ? (
              <h2 className="text-black font-semibold text-sm lg:text-base">
                {user.displayName}
              </h2>
            ) : (
              <h2 className="text-black font-semibold text-sm lg:text-base">
                Add Name
              </h2>
            )}
            {user && user.email ? (
              <h2 className="text-[#00000054] text-sm lg:text-base">
                {user.email}
              </h2>
            ) : (
              <h2 className="text-[#00000054] text-sm lg:text-base">
                exampale@email.com
              </h2>
            )}
          </div>
        </div>
        <div>
          <Link to="update_profile">
            <Button className="bg-[#20bc73]">Update</Button>
          </Link>
        </div>
      </div>
      <div className="p-5 lg:space-y-16 space-y-10">
        <div className="text-black flex justify-between gap-3 text-sm lg:text-base">
          <p>Name</p>
          {user && user.displayName ? (
            <p>{user.displayName}</p>
          ) : (
            <p>Add Name</p>
          )}
        </div>
        <div className="text-black flex justify-between gap-3 text-sm lg:text-base">
          <p>Email account</p>
          <p>{user.email}</p>
        </div>
        <div className="text-black flex justify-between gap-3 text-sm lg:text-base">
          <p>Mobile Number</p>
          {user && user.phoneNumber ? (
            <p>{user.phoneNumber}</p>
          ) : (
            <p>Add Name</p>
          )}
        </div>
        <div className="text-black flex justify-between gap-3 text-sm lg:text-base">
          <p>Location</p>
          <p>USA</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
