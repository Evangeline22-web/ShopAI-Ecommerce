import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Brand */}

        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            ShopAI
          </h2>

          <p className="mt-4 text-gray-300">
            AI Powered E-Commerce Platform offering
            premium products with intelligent shopping
            recommendations.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="font-bold text-xl mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>Home</li>
            <li>Products</li>
            <li>Wishlist</li>
            <li>Cart</li>
          </ul>
        </div>

        {/* Customer */}

        <div>
          <h3 className="font-bold text-xl mb-4">
            Customer Support
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
          </ul>
        </div>

        {/* Social */}

        <div>

          <h3 className="font-bold text-xl mb-4">
            Connect
          </h3>

          <div className="flex gap-5 text-2xl">

            <FaFacebook className="hover:text-blue-500 cursor-pointer" />

            <FaInstagram className="hover:text-pink-500 cursor-pointer" />

            <FaLinkedin className="hover:text-blue-400 cursor-pointer" />

            <FaGithub className="hover:text-gray-400 cursor-pointer" />

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-gray-400">

        © 2026 ShopAI. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;