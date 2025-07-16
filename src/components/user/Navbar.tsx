import React, { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../user/Login";
import Register from "./Register";
import { setSearchTerm } from "../../redux/productSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const products = useSelector((state: any) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
    navigate("/filter-data");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-red-600 tracking-widest">
          Q-SHOP
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="relative flex-1 max-w-md mx-4 hidden md:block"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-2.5 right-4 text-red-600"
          >
            <FaSearch />
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/Cart" className="relative">
            <FaShoppingCart className="text-xl" />
            {products.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {products.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsModelOpen(true)}
            className="hidden md:block text-sm font-medium text-gray-700 hover:text-red-600"
          >
            Login / Register
          </button>

          {/* Hamburger icon */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex justify-center space-x-10 py-3 text-sm font-semibold text-gray-700">
        <Link to="/" className="hover:text-red-600">
          Home
        </Link>
        <Link to="/Contact" className="hover:text-red-600">
          Contact
        </Link>
        <Link to="/About" className="hover:text-red-600">
          About
        </Link>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white px-6 py-4 shadow-inner space-y-4"
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded"
              />
              <button type="submit" className="text-red-600">
                <FaSearch />
              </button>
            </form>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 font-medium hover:text-red-600"
            >
              Home
            </Link>
            <Link
              to="/Contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 font-medium hover:text-red-600"
            >
              Contact
            </Link>
            <Link
              to="/About"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 font-medium hover:text-red-600"
            >
              About
            </Link>
            <button
              onClick={() => {
                setIsModelOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-sm font-medium text-red-600"
            >
              Login / Register
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login/Register Modal */}
      {isModelOpen && (
        <div className="modal fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          {isLogin ? (
            <Login
              openSignUp={() => setIsLogin(false)}
              onClose={() => setIsModelOpen(false)}
            />
          ) : (
            <Register
              openLogin={() => setIsLogin(true)}
              onClose={() => setIsModelOpen(false)}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
