import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [meyData, setMyData] = useState({});
  const [myTeam, setMyTeam] = useState([]);
  const [admin, setAdmin] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get(`/employee-account/${user.email}`).then((res) => {
      setMyData(res.data);
    });

    axiosSecure.get(`/hr-account/${meyData.hr_email}`).then((res) => {
      setAdmin(res.data);
    });

    axiosSecure.get(`/employee-accounts/${meyData.hr_email}`).then((res) => {
      setMyTeam(res.data);
    });
  }, [axiosSecure, meyData.hr_email, user.email]);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <Helmet>
        <title>AssetEase | My Team</title>
      </Helmet>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Team Members
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1753c2] text-white">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Member Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr key={admin._id} className="hover:bg-gray-100">
              <td className="px-4 py-2">
                <img
                  src={admin.company_logo}
                  alt={admin.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2 font-medium text-gray-800">
                {admin.name}
              </td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <span className="text-green-500">
                  {/* <!-- Admin Icon --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 2.5c0-.69.56-1.25 1.25-1.25h2a1.25 1.25 0 011.25 1.25v.5h1.25A1.75 1.75 0 0117.25 4v1.5a1.75 1.75 0 01-1.75 1.75H7.5A1.75 1.75 0 015.75 5.5V4c0-.97.78-1.75 1.75-1.75H8.75v-.5zm-1.5 7.5H16.5m-4.5 4h-3m3 0h3m-3 0v2.75m0-2.75v-2.25"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">{admin.role}</span>
              </td>
            </tr>
            {/* <!-- Example Row 1 --> */}
            {myTeam.map((team) => (
              <tr key={team._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img
                    src={team.profile}
                    alt={team.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {team.name}
                </td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <span className="text-green-500">
                    {/* <!-- Admin Icon --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 2.5c0-.69.56-1.25 1.25-1.25h2a1.25 1.25 0 011.25 1.25v.5h1.25A1.75 1.75 0 0117.25 4v1.5a1.75 1.75 0 01-1.75 1.75H7.5A1.75 1.75 0 015.75 5.5V4c0-.97.78-1.75 1.75-1.75H8.75v-.5zm-1.5 7.5H16.5m-4.5 4h-3m3 0h3m-3 0v2.75m0-2.75v-2.25"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">{team.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
