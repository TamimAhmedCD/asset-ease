import { Link } from "react-router-dom";

const Packages = () => {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto mt-10">
      <div>
        <div className="">
          <h2 className="text-3xl font-bold text-[#1753c2] text-center mb-8">
            Our Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Maximum 5 Employees
              </h3>
              <p className="text-gray-600 text-lg mb-6">$5/month</p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li>Manage up to 5 employees</li>
                <li>Basic asset management tools</li>
                <li>Email support</li>
              </ul>
              <Link to="hr-register">
                <button className="bg-[#1753c2] text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center border-2 border-[#1753c2]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Maximum 10 Employees
              </h3>
              <p className="text-gray-600 text-lg mb-6">$8/month</p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li>Manage up to 10 employees</li>
                <li>Advanced asset management tools</li>
                <li>Email & Chat support</li>
              </ul>
              <Link to="hr-register">
                <button className="bg-[#1753c2] text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Maximum 20 Employees
              </h3>
              <p className="text-gray-600 text-lg mb-6">$15/month</p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li>Manage up to 20 employees</li>
                <li>All asset management tools</li>
                <li>Priority support</li>
              </ul>
              <Link to="hr-register">
                <button className="bg-[#1753c2] text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
