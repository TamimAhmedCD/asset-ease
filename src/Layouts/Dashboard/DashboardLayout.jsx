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
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCircleUser, FaClipboardList, FaUserPlus, FaUserTie } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoIosHelpBuoy, IoMdSettings } from "react-icons/io";
import { HiInboxArrowDown } from "react-icons/hi2";
import { IoIosPower } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import "./style.css";
import { MdAssignmentAdd } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

const DashboardLayout = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [role, setRole] = useState("");
  const [hrData, setHrData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const { company_name: hrCompanyName, company_logo: hrCompanyLogo } = hrData;

  const { user, logOut } = useAuth();

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    if (user?.email) {
      // Fetch user role
      axiosPublic.get(`/user/${user.email}`).then((res) => {
        const role = res.data.role;
        console.log(role);
        setRole(role);

        // Fetch additional data based on role
        if (role === "HR") {
          axiosPublic.get(`/hr-account/${user.email}`).then((res) => {
            setHrData(res.data);
          });
        } else {
          axiosPublic.get(`/employee-account/${user.email}`).then((res) => {
            const data = ("Employee data:", res.data);
            setEmployeeData(data);
          });
        }
      });
    }
  }, [user?.email, axiosPublic]);

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
    <div className="px-10 py-6">
      {/* Sidebar and Navbar */}
      <React.Fragment>
        {/* Navbar */}
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="flex items-center gap-3">
            <Button
              onClick={openDrawer}
              size="small"
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
            <Typography variant="h5" color="blue-gray">
              {hrCompanyName}
            </Typography>
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
                    <FaUserTie className="text-xl"/>
                  </ListItemPrefix>
                  My Employee List
                </ListItem>
              </NavLink>
              <NavLink to="add-an-employee">
                {" "}
                <ListItem>
                  <ListItemPrefix>
                  <FaUserPlus className="text-xl"/>
                  </ListItemPrefix>
                  My Employee List
                </ListItem>
              </NavLink>
            </List>
          ) : (
            <List>
              <ListItem>
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ListItemPrefix>
                Dashboard
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                      clipRule="evenodd"
                    />
                  </svg>
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
              <ListItem>
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ListItemPrefix>
                Sales
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ListItemPrefix>
                Profile
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ListItemPrefix>
                Tables
              </ListItem>
            </List>
          )}
          <Button className="mt-3 ml-5" size="sm">
            Documentation
          </Button>
        </Drawer>
      </React.Fragment>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
