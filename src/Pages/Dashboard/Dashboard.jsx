import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";
import {
  Activity,
  Box,
  Users,
  AlertTriangle,
  Clock,
  TrendingUp,
} from "lucide-react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [paymentStatus, setPaymentStatus] = useState({});
  const [status, setStatus] = useState(false);
  const [pendingAssets, setPendingAssets] = useState([]);
  const [hrPendingAssets, setHrPendingAssets] = useState([]);
  const [mostRequestedAssets, setMostRequestedAssets] = useState([]);
  const [monthlyRequest, setMonthlyRequest] = useState();
  console.log(paymentStatus);

  const { user } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    if (user?.email) {
      // Fetch user role
      axiosSecure.get(`/user/${user.email}`).then((res) => {
        const role = res.data.role;
        setRole(role);
      });
    }

    // get pending data
    if (role === "employee" && status === true) {
      axiosSecure
        .get(`/requested-asset/pending/?email=${user.email}`)
        .then((res) => {
          setPendingAssets(res.data);
        });
    }

    // Get requests made this month
    if (role === "employee" && status === true) {
      axiosSecure
        .get(`/requested-asset/monthly/?email=${user.email}`)
        .then((res) => {
          setMonthlyRequest(res.data);
        });
    }

    // Get HR Pending Request asset
    if (role === "HR") {
      axiosSecure
        .get(`/requested-assets/pending?email=${user.email}`)
        .then((res) => {
          setHrPendingAssets(res.data);
        });
    }
    // Get HR most Request asset
    if (role === "HR") {
      axiosSecure.get("/assets/request-count").then((res) => {
        setMostRequestedAssets(res.data);
      });
    }
    if (role === "HR") {
      axiosSecure.get(`/hr-account/${user.email}`).then((res) => {
        setPaymentStatus(res.data.paymentStatus);
      });
    }
  }, [user.email, axiosSecure, role, status]);

  // Find the employee status and then render the data
  axiosPublic.get(`/employee-account/${user.email}`).then((res) => {
    const employeeStatus = res.data.employee_status;
    setStatus(employeeStatus);
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  if (role == "HR" && paymentStatus === true) {
    return (
      <div className="min-h-screen">
        <Helmet>
          <title>AssetEase | Dashboard</title>
        </Helmet>
        <div className="lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Pending Requests
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {hrPendingAssets.length}
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Box className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>12% increase</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">20</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-green-600">
                  <span>60% engagement rate</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Low Stock Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-red-600">
                  <span>Requires attention</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Assets
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">124</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-purple-600">
                  <span>Updated recently</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pending Requests */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Pending Requests
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {hrPendingAssets.length} New
                </span>
              </div>
              <div className="space-y-4">
                {hrPendingAssets.map((asset) => (
                  <div
                    key={asset._id}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Box className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Request for {asset.asset_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Requested 2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Requested Items */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Most Requested
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {mostRequestedAssets.map((asset) => (
                  <div
                    key={asset._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Box className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {asset.product_name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          32 requests this month
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">85%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Activities
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  See all
                </button>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-4 h-full w-px bg-gray-200"></div>
                <div className="space-y-6 relative">
                  <div className="flex gap-4">
                    <div className="flex-none">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center relative z-10">
                        <Activity className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Asset Request Approved
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Laptop #LC234 approved for John Doe
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        2 minutes ago
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-none">
                      <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center relative z-10">
                        <Clock className="w-4 h-4 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Low Stock Alert
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Monitors running low on stock
                      </p>
                      <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-none">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center relative z-10">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        New Employee Added
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Sarah Johnson joined the team
                      </p>
                      <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (role == "HR" && paymentStatus === false) {
    return navigate("/dashboard/payment");
  }
  if (role == "employee" && status == true) {
    return (
      <div className="min-h-screen">
        <Helmet>
          <title>AssetEase | Dashboard</title>
        </Helmet>
        {/* <!-- Main Content --> */}
        <main className="lg:px-8 py-8">
          {/* <!-- Employee Sections --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* My Pending Requests */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  My Pending Requests
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {pendingAssets?.length || 0} Requests
                </span>
              </div>
              <div className="space-y-4">
                {pendingAssets?.length > 0 ? (
                  pendingAssets.map((asset) => (
                    <div
                      key={asset._id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="bg-blue-50 p-3 rounded-lg mr-4">
                        <Box className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Request for {asset.asset_name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Requested {formatDate(asset.request_date)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No pending requests found.
                  </p>
                )}
              </div>
            </div>

            {/* My Monthly Requests */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  My Monthly Requests
                </h2>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {monthlyRequest?.length || 0} This Month
                </span>
              </div>
              <div className="space-y-4">
                {monthlyRequest?.length > 0 ? (
                  monthlyRequest.map((asset) => (
                    <div
                      key={asset._id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="bg-green-50 p-3 rounded-lg mr-4">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Request for {asset.asset_name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Requested on {formatDate(asset.request_date)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No requests made this month.
                  </p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming Events
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-purple-50 p-3 rounded-lg mr-4">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Employee Training on Asset Management
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Jan 25, 2025</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-red-50 p-3 rounded-lg mr-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Quarterly HR Meeting
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Jan 30, 2025</p>
                  </div>
                </div>
              </div>
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
        <Helmet>
          <title>AssetEase | Dashboard</title>
        </Helmet>
        <p className="text-lg">
          ⚠ You are not affiliated with any company. Please contact your HR to
          complete the affiliation process.
        </p>
      </div>
    );
  }
};

export default Dashboard;
