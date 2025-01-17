import { useState } from "react";

const MyEmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      image: "https://via.placeholder.com/150",
      type: "admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://via.placeholder.com/150",
      type: "normal",
    },
    {
      id: 3,
      name: "Sam Wilson",
      image: "https://via.placeholder.com/150",
      type: "normal",
    },
  ]);

  const removeFromTeam = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Image</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Name</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Type</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full"
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
                    onClick={() => removeFromTeam(employee.id)}
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
        Total Team Members: <span className="font-medium">{employees.length}</span>
      </div>
    </div>
  );
};

export default MyEmployeeList;
