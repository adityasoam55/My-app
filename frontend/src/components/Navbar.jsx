import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-blue-600/90 via-blue-700/90 to-indigo-800/90 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-3xl font-extrabold tracking-tight drop-shadow-md hover:scale-105 transition-transform duration-300"
        >
          MyApp
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-gray-200 focus:outline-none transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 
          bg-gradient-to-b from-blue-700/95 to-blue-900/95 md:bg-transparent 
          backdrop-blur-md md:backdrop-blur-0 p-6 md:p-0 space-y-6 md:space-y-0 
          md:space-x-8 items-center shadow-lg md:shadow-none rounded-b-2xl md:rounded-none 
          transition-all duration-300 ease-in-out`}
        >
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-white text-lg font-medium hover:text-cyan-300 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-lg font-medium hover:text-cyan-300 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
