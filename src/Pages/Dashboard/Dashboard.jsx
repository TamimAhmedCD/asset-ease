import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(false);

  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    if (user?.email) {
      // Fetch user role
      axiosPublic.get(`/user/${user.email}`).then((res) => {
        const role = res.data.role;
        console.log(role);
        setRole(role);
      });
    }
  }, [user?.email, axiosPublic]);

  // Find the employee status and then render the data
  axiosPublic.get(`/employee-account/${user.email}`).then((res) => {
    const employeeStatus = res.data.employee_status;
    setStatus(employeeStatus);
  });

  if (role == "HR") {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* <!-- Header --> */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              AssetEase HR
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, HR Manager</span>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* <!-- Main Content --> */}
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <!-- Pending Requests --> */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Pending Requests
              </h2>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-100 rounded-lg">Request 1</li>
                <li className="p-3 bg-gray-100 rounded-lg">Request 2</li>
                <li className="p-3 bg-gray-100 rounded-lg">Request 3</li>
                <li className="p-3 bg-gray-100 rounded-lg">Request 4</li>
                <li className="p-3 bg-gray-100 rounded-lg">Request 5</li>
              </ul>
            </div>

            {/* <!-- Top Most Requested Items --> */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Top Most Requested Items
              </h2>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-100 rounded-lg">Item 1</li>
                <li className="p-3 bg-gray-100 rounded-lg">Item 2</li>
                <li className="p-3 bg-gray-100 rounded-lg">Item 3</li>
                <li className="p-3 bg-gray-100 rounded-lg">Item 4</li>
              </ul>
            </div>

            {/* <!-- Limited Stock Items --> */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Limited Stock Items
              </h2>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-100 rounded-lg">Item A (Qty: 5)</li>
                <li className="p-3 bg-gray-100 rounded-lg">Item B (Qty: 8)</li>
                <li className="p-3 bg-gray-100 rounded-lg">Item C (Qty: 2)</li>
              </ul>
            </div>
          </div>

          {/* <!-- Pie Chart Section --> */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Item Distribution
            </h2>
            <div className="flex justify-center">
              {/* <!-- Placeholder for Pie Chart --> */}
              <div
                id="pie-chart"
                className="h-64 w-64 bg-gray-200 rounded-full"
              ></div>
            </div>
          </div>

          {/* <!-- Extra Section: Recent Activities --> */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activities
              </h2>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-100 rounded-lg">
                  Approved Request for Laptop
                </li>
                <li className="p-3 bg-gray-100 rounded-lg">
                  Rejected Request for Phone
                </li>
                <li className="p-3 bg-gray-100 rounded-lg">
                  Updated Stock for Headphones
                </li>
              </ul>
            </div>

            {/* <!-- Extra Section: Employee Insights --> */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Employee Insights
              </h2>
              <div className="text-gray-600">
                <p>
                  Total Employees Requesting:{" "}
                  <span className="font-bold">20</span>
                </p>
                <p>
                  Active Requesters: <span className="font-bold">60%</span>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  if (role == "employee" && status == true) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* <!-- Header --> */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              AssetEase Employee
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, [Employee Name]</span>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* <!-- Main Content --> */}
        <main className="container mx-auto px-6 py-8">
          {/* <!-- Employee Sections --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <!-- My Pending Requests --> */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                My Pending Requests
              </h2>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-100 rounded-lg">
                  Request for Laptop
                </li>
                <li className="p-3 bg-gray-100 rounded-lg">Request for Desk</li>
                <li className="p-3 bg-gray-100 rounded-lg">
                  Request for Chair
                </li>
              </ul>
            </div>

            {/* <!-- My Monthly Requests --> */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                My Monthly Requests
              </h2>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-100 rounded-lg">
                  Request for Headphones - Jan 12, 2025
                </li>
                <li className="p-3 bg-gray-100 rounded-lg">
                  Request for Monitor - Jan 10, 2025
                </li>
                <li className="p-3 bg-gray-100 rounded-lg">
                  Request for Laptop - Jan 5, 2025
                </li>
              </ul>
            </div>

            {/* <!-- Calendar or Events Section --> */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Upcoming Events
              </h2>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-100 rounded-lg">
                  Employee Training on Asset Management - Jan 25, 2025
                </li>
                <li className="p-3 bg-gray-100 rounded-lg">
                  Quarterly HR Meeting - Jan 30, 2025
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
  if (role == "employee" && status == false) {
    return (
      <div
        id="affiliation-message"
        className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6"
      >
        <p className="text-lg">
          ⚠ You are not affiliated with any company. Please contact your HR to
          complete the affiliation process.
        </p>
      </div>
    );
  }
};

export default Dashboard;
