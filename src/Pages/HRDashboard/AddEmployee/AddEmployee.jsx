import { useEffect, useState } from "react";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import useEmployee from "../../../Hooks/useEmployee";
import useEmployeeList from "../../../Hooks/useEmployeeList";

const AddEmployee = () => {
  const [employee, refetch] = useEmployee();
  const [employeeList, setEmployeeList] = useEmployeeList();
  const [admin, setAdmin] = useState({})
  console.log(admin);

  const [employeeLimit, setEmployeeLimit] = useState(0);

  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch package details and set employee limit
  useEffect(() => {
    axiosPublic
    .get(`/hr-account/${user.email}`)
    .then((res) => {
      const data = res.data;
      setAdmin(data)
      if (data.package === "premium") {
        setEmployeeLimit(20);
      } else if (data.package === "standard") {
        setEmployeeLimit(10);
      } else if (data.package === "basic") {
        setEmployeeLimit(5);
      }
    })
  }, [axiosPublic, user.email])

  // Track selected members' IDs
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedMembers(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((memberId) => memberId !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  const handleAddMember = (data) => {
    if (employeeList.length >= employeeLimit) {
      alert(
        "You have reached the employee limit for your package. Upgrade to add more employees."
      );
      return;
    }

    const updateData = {
      employee_status: true,
      hr_email: user.email,
      company_name: admin.company_name,
      company_logo: admin.company_logo,
    };

    axiosPublic
      .patch(`/employee-account/${data._id}`, updateData)
      .then((res) => {
        console.log(res.data);

        // Update employee list locally and re-render
        const updatedEmployeeList = [
          ...employeeList,
          { ...data, employee_status: true },
        ];
        setEmployeeList(updatedEmployeeList);
        refetch();
      })
      .catch((err) => console.error("Error adding member:", err));
  };

  const handleAddSelectedMembers = () => {
    if (employeeList.length + selectedMembers.length > employeeLimit) {
      alert(
        "Adding these employees exceeds your package limit. Upgrade to add more employees."
      );
      return;
    }

    // Update the status of all selected members
    const updatePromises = selectedMembers.map((id) => {
      const updateData = {
        employee_status: true,
        hr_email: user.email,
      };

      return axiosPublic
        .patch(`/employee-account/${id}`, updateData)
        .then(() => {
          const updatedMember = employee.find((member) => member._id === id);
          if (updatedMember) {
            setEmployeeList((prevList) => [
              ...prevList,
              { ...updatedMember, employee_status: true },
            ]);
          }
        });
    });

    // Wait for all updates to complete
    Promise.all(updatePromises)
      .then(() => {
        console.log("All selected members added successfully.");
        setSelectedMembers([]); // Clear selected members
      })
      .catch((err) => console.error("Error adding selected members:", err));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Package Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">
              Employee Count: {employeeList.length} / {employeeLimit}
            </div>
            <button
              onClick={() => console.log("Redirect to package selection")}
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
                  onChange={() => handleCheckboxChange(member._id)}
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
            className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ${
              selectedMembers.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={selectedMembers.length === 0}
          >
            Add Selected Members to the Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
