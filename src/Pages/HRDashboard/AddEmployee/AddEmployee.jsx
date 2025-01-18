import { useState } from "react";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import useEmployee from "../../../Hooks/useEmployee";

const AddEmployee = () => {
  const [employee, refetch] = useEmployee()
  const [selectedMembers, setSelectedMembers] = useState([]);
  // const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();

  // useEffect(() => {
  //   axiosPublic.get("/employee-account").then((res) => {
  //     setMembers(res.data);
  //   });
  // }, [axiosPublic]);

  const [employeeCount, setEmployeeCount] = useState(8); // Current employee count
  const [packageLimit, setPackageLimit] = useState(10); // Current package limit

  const handleSelectMember = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((memberId) => memberId !== id)
        : [...prevSelected, id]
    );
    console.log("Adding members:", id);
  };

  const handleAddMember = (data) => {
    const updateData = {
      employee_status: data.employee_status = true,
      hr_email: user.email,
    };
    axiosPublic.patch(`/employee-account/${data._id}`, updateData).then((res) => {
      console.log(res.data);
      refetch()
    });
    console.log("Adding members:", data._id);
  };

  const handleAddSelectedMembers = (id) => {
    // Call API to add selected members to the team (this is just a simulation)
    console.log("Adding members:", id);
    setEmployeeCount(employeeCount + selectedMembers.length);
  };

  const handleUpgradePackage = () => {
    // Redirect to the package selection page (for simplicity, just log here)
    console.log("Redirect to package selection");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Package Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">
              Employee Count: {employeeCount} / {packageLimit}
            </div>
            <button
              onClick={handleUpgradePackage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Upgrade Package
            </button>
          </div>
        </div>

        {/* Available Members Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Available Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employee.map((member) => (
              <div
                key={member._id}
                className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
              >
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(member._id)}
                  onChange={() => handleSelectMember(member._id)}
                  className="form-checkbox text-indigo-600"
                />
                <img
                  src={member.profile}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">
                    {member.name}
                  </div>
                  <button
                    onClick={() => handleAddMember(member)}
                    className="mt-2 text-sm text-indigo-600 hover:underline"
                  >
                    Add to Team
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bulk Add Button */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleAddSelectedMembers}
            disabled={selectedMembers.length === 0}
            className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ${
              selectedMembers.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Add Selected Members to the Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;