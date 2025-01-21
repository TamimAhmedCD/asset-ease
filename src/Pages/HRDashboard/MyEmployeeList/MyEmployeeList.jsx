// import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useEmployeeList from "../../../Hooks/useEmployeeList";

const MyEmployeeList = () => {
  const [employeeList, refetch] = useEmployeeList();
  const axiosPublic = useAxiosPublic();

  const handleRemoveMember = (data) => {
    const updateData = {
      employee_status: false,
      hr_email: null
    };

    axiosPublic
      .patch(`/employee-account/${data._id}`, updateData)
      .then((res) => {
        console.log(res.data);
        refetch();
      });
    console.log("Removing member:", data._id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 text-gray-600 font-medium">
                Image
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">
                Name
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">
                Type
              </th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={employee.profile}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{employee.name}</td>
                <td className="py-3 px-4 flex items-center space-x-2">
                  {employee.type === "admin" ? (
                    <span className="text-blue-600 font-medium">Admin</span>
                  ) : (
                    <span className="text-gray-600">Normal</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleRemoveMember(employee)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Remove From Team
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-gray-600">
        Total Team Members:{" "}
        <span className="font-medium">{employeeList.length}</span>
      </div>
    </div>
  );
};

export default MyEmployeeList;
