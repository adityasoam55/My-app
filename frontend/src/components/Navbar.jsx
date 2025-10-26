import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-white shadow-md sticky top-0 z-50">
      <div className="navbar-content flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <Link
          to="/"
          className="brand text-2xl font-bold text-indigo-700 hover:text-indigo-800 transition-colors duration-300"
        >
          MyApp
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-indigo-700 hover:text-indigo-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 
          bg-white md:bg-transparent border-t md:border-none shadow-md md:shadow-none 
          md:space-x-8 space-y-4 md:space-y-0 items-center p-6 md:p-0 transition-all duration-300`}
        >
          {isLoggedIn ? (
            <>
              <NavLink
                to="/dashboard"
                active={location.pathname === "/dashboard"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
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
              <NavLink
                to="/login"
                active={location.pathname === "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                active={location.pathname === "/register"}
                onClick={() => setIsMobileMenuOpen(false)}
                button
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children, onClick, button = false }) {
  if (button) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`${
          active
            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
            : "bg-gradient-to-r from-cyan-400 to-blue-400"
        } text-white px-5 py-2 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`nav-link text-lg font-medium ${
        active ? "text-indigo-700 font-semibold" : "text-gray-700"
      } hover:text-indigo-800 transition-colors duration-300`}
    >
      {children}
    </Link>
  );
}

export default Navbar;
