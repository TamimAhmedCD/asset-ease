import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  MenuList,
  MenuHandler,
  Menu,
  MenuItem,
} from "@material-tailwind/react";
import { IoMenu } from "react-icons/io5";
import logo from "/Logo.svg";
import useAuth from "../../Hooks/useAuth";
import {
  FaCircleUser,
  FaClipboardList,
  FaUserPlus,
  FaUserTie,
} from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoIosHelpBuoy, IoMdSettings } from "react-icons/io";
import { HiInboxArrowDown } from "react-icons/hi2";
import { IoIosPower } from "react-icons/io";
import { MdAccountCircle, MdSpaceDashboard } from "react-icons/md";
import "./style.css";
import { MdAssignmentAdd } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiFileList3Fill } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const DashboardLayout = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [role, setRole] = useState("");
  const [hrData, setHrData] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [employeeData, setEmployeeData] = useState([]);

  const { company_name: hrCompanyName, company_logo: hrCompanyLogo } = hrData;
  const { company_name, company_logo } = employeeData;

  const { user, logOut } = useAuth();

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      // Fetch user role
      axiosPublic.get(`/user/${user.email}`).then((res) => {
        const role = res.data.role;
        setRole(role);

        // Fetch additional data based on role
        if (role === "HR") {
          axiosSecure.get(`/hr-account/${user.email}`).then((res) => {
            setHrData(res.data);
          });
        } else {
          axiosSecure.get(`/employee-account/${user.email}`).then((res) => {
            const data = ("Employee data:", res.data);
            setEmployeeData(data);
          });
        }
      });
    }
  }, [user.email, axiosSecure, axiosPublic]);

  // Nav List
  const profile = (
    <>
      <MenuItem>
        <div className="flex gap-2">
          <FaCircleUser></FaCircleUser> <Link to="/my_profile">My Profile</Link>
        </div>
      </MenuItem>
      <MenuItem>
        <div className="flex gap-2">
          <IoMdSettings />{" "}
          <Link to="/my_profile/update_profile">Edit Profile</Link>
        </div>
      </MenuItem>
      <MenuItem>
        <div className="flex gap-2">
          <HiInboxArrowDown /> Inbox
        </div>
      </MenuItem>
      <MenuItem>
        <div className="flex gap-2">
          <IoIosHelpBuoy /> Help
        </div>
      </MenuItem>
    </>
  );

  return (
    <div className="px-5 md:px-10 py-6">
      {/* Sidebar and Navbar */}
      <React.Fragment>
        {/* Navbar */}
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="flex items-center gap-3">
            <Button
              onClick={openDrawer}
              size="sm"
              className="bg-white text-black shadow-none hover:shadow-none p-0"
            >
              <IoMenu className="text-2xl" />
            </Button>
            {role === "HR" ? (
              <img
                src={hrCompanyLogo}
                alt={hrCompanyName}
                className="w-[150px] lg:w-[180px]"
              />
            ) : employeeData?.company_logo ? (
              <img
                src={company_logo}
                alt={company_name}
                className="w-[130px] lg:w-[160px]"
              />
            ) : (
              <div className="flex gap-2 items-center">
                <img src={logo} alt="" className="w-[55px] lg:w-[70px]" />
                <h1 className="text-2xl font-bold text-[#1753c2] sm:block hidden">
                  AssetEase
                </h1>
              </div>
            )}
          </div>
          {/* Profile Icon */}
          <div>
            <Menu placement="bottom-start">
              <MenuHandler>
                {user && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="rounded-full w-11 h-11 object-cover cursor-pointer"
                    alt=""
                  />
                ) : (
                  <IconButton size="md" className="rounded-full bg-transparent">
                    <FaCircleUser className="text-4xl text-black  "></FaCircleUser>
                  </IconButton>
                )}
              </MenuHandler>
              <MenuList>
                <div className="flex items-center gap-3">
                  <div>
                    {user && user.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="w-9 h-9 object-cover rounded-full"
                        alt=""
                      />
                    ) : (
                      <FaCircleUser className="text-3xl text-black"></FaCircleUser>
                    )}
                  </div>
                  <div>
                    {user && user.displayName ? (
                      <h1 className="font-semibold text-gray-800">
                        {user.displayName}
                      </h1>
                    ) : (
                      <h1 className="font-semibold text-gray-800">User Name</h1>
                    )}
                    {user && user.email ? (
                      <p className="text-sm font-normal text-gray-800">
                        {user.email}
                      </p>
                    ) : (
                      <h1>email@user.com</h1>
                    )}
                  </div>
                </div>
                <div className="divider mt-0 mb-0"></div>
                <div>
                  {profile}{" "}
                  <MenuItem>
                    <div onClick={logOut} className="flex gap-2 text-red-400">
                      <IoIosPower className="text-lg"></IoIosPower>
                      <Link>Log Out</Link>
                    </div>
                  </MenuItem>
                </div>
              </MenuList>
            </Menu>
          </div>
        </div>
        {/* Sidebar */}
        <Drawer open={open} onClose={closeDrawer}>
          <div className="mb-2 flex items-center justify-between p-4">
            {role === "HR" ? (
              <Typography variant="h5" color="blue-gray">
                {hrCompanyName}
              </Typography>
            ) : (
              <Typography variant="h5" color="blue-gray">
                {company_name}
              </Typography>
            )}
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          {role === "HR" ? (
            // HR Nav
            <List>
              <NavLink to="dashboard">
                <ListItem className="hover:bg-blue-gray-50">
                  <ListItemPrefix>
                    <MdSpaceDashboard className="text-xl" />
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
              </NavLink>
              <NavLink to="asset-list">
                {" "}
                <ListItem>
                  <ListItemPrefix>
                    <FaClipboardList className="text-xl" />
                  </ListItemPrefix>
                  Asset List
                  <ListItemSuffix>
                    <Chip
                      value="5"
                      size="sm"
                      color="green"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
              </NavLink>
              <NavLink to="add-an-asset">
                <ListItem>
                  <ListItemPrefix>
                    <MdAssignmentAdd className="text-xl" />
                  </ListItemPrefix>
                  Add an Asset
                </ListItem>
              </NavLink>
              <NavLink to="all-request">
                <ListItem>
                  <ListItemPrefix>
                    <VscGitPullRequestNewChanges className="text-xl" />
                  </ListItemPrefix>
                  All Request
                </ListItem>
              </NavLink>
              <NavLink to="my-employee-list">
                {" "}
                <ListItem>
                  <ListItemPrefix>
                    <FaUserTie className="text-xl" />
                  </ListItemPrefix>
                  My Employee List
                </ListItem>
              </NavLink>
              <NavLink to="add-an-employee">
                <ListItem>
                  <ListItemPrefix>
                    <FaUserPlus className="text-xl" />
                  </ListItemPrefix>
                  Add Employee
                </ListItem>
              </NavLink>
              <NavLink to="profile">
                <ListItem>
                  <ListItemPrefix>
                    <MdAccountCircle className="text-xl" />
                  </ListItemPrefix>
                  My Profile
                </ListItem>
              </NavLink>
            </List>
          ) : (
            // Employee Nav
            <List>
              <NavLink to="dashboard">
                {" "}
                <ListItem>
                  <ListItemPrefix>
                    <MdSpaceDashboard className="text-xl" />
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
              </NavLink>
              <NavLink to="my-requested-assets">
                <ListItem>
                  <ListItemPrefix>
                    <RiFileList3Fill className="text-xl" />
                  </ListItemPrefix>
                  My Requested Assets
                  <ListItemSuffix>
                    <Chip
                      value="5"
                      size="sm"
                      color="green"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
              </NavLink>
              <NavLink to="my-team">
                <ListItem>
                  <ListItemPrefix>
                    <HiMiniUserGroup className="text-xl" />
                  </ListItemPrefix>
                  My Team
                  <ListItemSuffix>
                    <Chip
                      value="5"
                      size="sm"
                      color="green"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
              </NavLink>
              <NavLink to="request-for-an-asset">
                <ListItem>
                  <ListItemPrefix>
                    <VscGitPullRequestNewChanges className="text-xl" />
                  </ListItemPrefix>
                  Request for an Asset
                </ListItem>
              </NavLink>
              <NavLink to="profile">
                <ListItem>
                  <ListItemPrefix>
                    <MdAccountCircle className="text-xl" />
                  </ListItemPrefix>
                  My Profile
                </ListItem>
              </NavLink>
            </List>
          )}
        </Drawer>
      </React.Fragment>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
