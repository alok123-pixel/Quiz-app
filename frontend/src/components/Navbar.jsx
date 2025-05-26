import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold dark:text-white">🧠 Quiz App</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-800 dark:text-white font-medium hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-800 dark:text-white font-medium hover:underline"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-gray-800 dark:text-white font-medium hover:underline"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow-md transform transition-transform duration-200 hover:-translate-y-1"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;