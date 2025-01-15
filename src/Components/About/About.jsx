import Lottie from "lottie-react";
import about from "./about.json";

const About = () => {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      <div className="flex items-center justify-between gap-10">
        <div className="space-y-4 lg:w-2/4 mt-16">
          <div className="space-y-4 mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-[#1753c2]">
              About AssetEase
            </h2>
            <p className="text-lg text-gray-600">
              Welcome to{" "}
              <span className="font-semibold text-[#1753c2]">AssetEase</span>,
              the ultimate solution for businesses to simplify and streamline
              asset management. Designed to provide transparency, efficiency,
              and control, our platform ensures that managing company resources
              has never been easier.
            </p>
          </div>
          {/* Feature 1 */}
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-500 text-white p-4 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v5m6-5v5m2-8h2a2 2 0 012 2v7H5v-7a2 2 0 012-2h2m4-6h2a2 2 0 012 2v4H7V7a2 2 0 012-2h2m4-2H9v4h6V3z"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Returnable Items
              </h3>
              <p className="text-gray-600 mt-2">
                Easily track assets that need to be returned, such as laptops,
                phones, or other equipment.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-500 text-white p-4 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.105 0-2-.9-2-2s.895-2 2-2 2 .9 2 2-.895 2-2 2zM12 12v6m8-6H4"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Non-Returnable Items
              </h3>
              <p className="text-gray-600 mt-2">
                Manage one-time issued items like ID cards, uniforms, or
                consumables efficiently.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-3/6">
          <Lottie animationData={about} />
        </div>
      </div>
    </div>
  );
};

export default About;
