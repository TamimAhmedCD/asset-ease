import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is AssetEase?",
      answer: "AssetEase helps you streamline your asset management, making it easier to track and manage your assets efficiently."
    },
    {
      question: "How does AssetEase work?",
      answer: "AssetEase uses an intuitive platform that integrates various asset management features into a user-friendly interface. You can track, manage, and analyze your assets from a single dashboard."
    },
    {
      question: "Can I integrate AssetEase with other tools?",
      answer: "Yes, AssetEase supports integrations with a variety of tools to improve your asset management experience."
    },
    // Add more FAQ items here as needed
  ];

  return (
    <section className="faq-section py-16 bg-gray-50" id="faq">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#1753c2]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="w-full text-left p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out"
                onClick={() => toggleAnswer(index)}
                aria-expanded={activeIndex === index ? "true" : "false"}
              >
                <span className="font-medium text-lg text-gray-800">{faq.question}</span>
              </button>
              {activeIndex === index && (
                <div
                  className="p-4 mt-2 bg-gray-100 text-gray-700 border-l-4 border-[#1753c2] rounded-lg transition-all duration-300 ease-in-out"
                  style={{ opacity: activeIndex === index ? 1 : 0 }}
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
