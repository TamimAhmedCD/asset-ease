import { useState } from 'react';
import { FaCogs, FaUserCheck } from 'react-icons/fa';
import { MdInsertChartOutlined } from "react-icons/md";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create an account to get access to all features of AssetEase.",
      icon: <FaUserCheck />
    },
    {
      id: 2,
      title: "Configure",
      description: "Set up your asset management preferences and parameters for smooth operations.",
      icon: <FaCogs />
    },
    {
      id: 3,
      title: "Track & Optimize",
      description: "Monitor and optimize your assets in real-time, using data-driven insights.",
      icon: <MdInsertChartOutlined />
    }
  ];

  const [stepsData] = useState(steps);

  return (
    <section id="how-it-works" className="py-20 bg-[#f4f7fb]">
      <div className="w-11/12 md:w-10/12 mx-auto text-center">
        <h2 className="text-[#1753c2] text-4xl font-bold mb-12">How It Works</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
          Discover how AssetEase makes your asset management simple and efficient. Follow these easy steps to get started:
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {stepsData.map((step) => (
            <div
              key={step.id}
              className="bg-white p-8 shadow-lg rounded-2xl flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="text-5xl mb-6 text-[#1753c2]">
                {step.icon}
              </div>
              <h4 className="text-[#333] text-2xl font-semibold mb-4">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <a
          href="#contact-us"
          className="bg-[#1753c2] text-white py-3 px-8 rounded-full text-lg mt-12 inline-block hover:bg-[#154a9a] transition-all"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;
