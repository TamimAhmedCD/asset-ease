import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-16">
      <footer className="bg-[#1753c2] text-white py-10">
        <div className="w-11/12 md:w-10/12 mx-auto mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8">
            {/* Logo and About */}
            <div>
              <h2 className="text-lg font-bold mb-4">AssetEase</h2>
              <p className="text-gray-200">
                Streamline your asset management with AssetEase – a simple and
                efficient way to track and manage your company assets.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-200 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-200 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/TamimAhmedCD" target="_blank" className="text-gray-200 hover:text-white">
                <FaGithub />
                </a>
                <a href="https://www.instagram.com/_https.tamim/" target="_blank" className="text-gray-200 hover:text-white">
                <FaInstagram />
                </a>
                <a href="https://www.facebook.com/tamim.ahmed.360496" target="_blank" className="text-gray-200 hover:text-white">
                <FaFacebook />
                </a>
                <a href="https://www.linkedin.com/in/tamim-ahmed-dev/" target="_blank" className="text-gray-200 hover:text-white">
                <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white pt-6 text-center text-gray-200 text-sm">
            <p>© 2025 AssetEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
