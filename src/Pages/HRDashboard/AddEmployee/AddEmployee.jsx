import { useState } from 'react';

const AddEmployee = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members] = useState([
    { id: 1, name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    // Add more members here
  ]);
  const [employeeCount, setEmployeeCount] = useState(8); // Current employee count
  const [packageLimit, setPackageLimit] = useState(10); // Current package limit

  const handleSelectMember = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((memberId) => memberId !== id) : [...prevSelected, id]
    );
  };

  const handleAddSelectedMembers = () => {
    // Call API to add selected members to the team (this is just a simulation)
    console.log('Adding members:', selectedMembers);
    setEmployeeCount(employeeCount + selectedMembers.length);
    setSelectedMembers([]); // Clear selected members after adding
  };

  const handleUpgradePackage = () => {
    // Redirect to the package selection page (for simplicity, just log here)
    console.log('Redirect to package selection');
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
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
              >
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(member.id)}
                  onChange={() => handleSelectMember(member.id)}
                  className="form-checkbox text-indigo-600"
                />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">{member.name}</div>
                  <button
                    onClick={() => setEmployeeCount(employeeCount + 1)}
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
              selectedMembers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
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
