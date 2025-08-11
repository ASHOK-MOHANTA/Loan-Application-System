import React from "react";
import { NavLink, Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import LoanFeaturesGrid from "../components/LoanFeaturesGrid"; // Import new component

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/dashboard" className="font-bold">
            User Dashboard
          </Link>
        </h1>

        <nav className="space-x-4 flex items-center">
          <NavLink to="/dashboard/new-application" className={({ isActive }) => (isActive ? "underline" : "")}>
            New Application
          </NavLink>
          <NavLink to="/dashboard/loan-calculator" className={({ isActive }) => (isActive ? "underline" : "")}>
            Loan Calculator
          </NavLink>
          <NavLink to="/dashboard/payments" className={({ isActive }) => (isActive ? "underline" : "")}>
            Payments
          </NavLink>
          <NavLink to="/dashboard/user-applications" className={({ isActive }) => (isActive ? "underline" : "")}>
            My Applications
          </NavLink>

          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 bg-red-600 rounded hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="p-4">
        {location.pathname === "/dashboard" ? <LoanFeaturesGrid /> : <Outlet />}
      </main>
    </div>
  );
};

export default UserDashboard;
