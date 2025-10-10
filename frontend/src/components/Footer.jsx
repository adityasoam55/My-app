import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-inner mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link
            to="/login"
            className="text-white hover:text-gray-200 transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white hover:text-gray-200 transition-colors duration-300"
          >
            Register
          </Link>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors duration-300"
          >
            <FaTwitter size={20} aria-label="Twitter" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors duration-300"
          >
            <FaGithub size={20} aria-label="GitHub" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors duration-300"
          >
            <FaLinkedin size={20} aria-label="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
