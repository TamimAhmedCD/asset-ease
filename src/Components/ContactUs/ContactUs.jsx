import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to backend)
    console.log("Form submitted", formData);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-12">
          We&apos;d love to hear from you! Please fill out the form below, and we&apos;ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-xl space-y-8">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1753c2] focus:border-[#1753c2] transition-all duration-300"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1753c2] focus:border-[#1753c2] transition-all duration-300"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg text-gray-700 mb-2">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1753c2] focus:border-[#1753c2] transition-all duration-300"
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#1753c2] text-white text-lg font-semibold rounded-xl hover:bg-[#1a63d3] focus:outline-none focus:ring-2 focus:ring-[#1753c2] transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
