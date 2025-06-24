import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Q-SHOP Description */}
        <div>
          <h3 className="text-xl font-bold">Q-SHOP</h3>
          <p className="mt-4 text-sm">
            Your one-stop destination for all your shopping needs. Shop smart, shop easy.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:items-center">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 mb-4 text-xl">
            <a href="#" className="hover:text-gray-400"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-400"><FaGithub /></a>
            <a href="#" className="hover:text-gray-400"><FaLinkedin /></a>
          </div>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2 rounded-l-lg bg-gray-800 border border-gray-600 text-sm focus:outline-none"
            />
            <button className="bg-red-600 px-4 py-2 rounded-r-lg text-sm hover:bg-red-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-sm flex flex-col md:flex-row justify-between items-center container mx-auto">
        <p>&copy; {new Date().getFullYear()} Q-SHOP. All rights reserved.</p>
        <div className="flex space-x-5 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
