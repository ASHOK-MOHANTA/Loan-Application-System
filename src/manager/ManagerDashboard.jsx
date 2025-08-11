import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { getUserRole } from "../utils/getUserRole";

import ManagerApplications from "./ManagerApplications";
import ApplicationDetail from "./ApplicationDetail";
import NewApplication from "../components/loanapplication/MultiStepForm";
import LoanFeaturesGrid from "../components/LoanFeaturesGrid";
import LoanCalculator from "../pages/LoanCalculator";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const current = auth.currentUser;
      if (!current) {
        setRole(null);
        setLoading(false);
        return;
      }
      const fetchedRole = await getUserRole(current.uid); // pass UID
      console.log("ManagerDashboard fetchedRole:", fetchedRole);
      setRole(fetchedRole);
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  const isPending = role === "pending";

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/dashboard" className="font-semibold">Manager Dashboard</Link>
        </h1>

        <nav className="space-x-6 flex items-center">
          {/* Use absolute paths so clicks don't append to current path */}
          {!isPending && (
            <>
              <NavLink to="/dashboard/new-application" className={({isActive})=>isActive?"underline":""}>New Application</NavLink>
              <NavLink to="/dashboard/applications" className={({isActive})=>isActive?"underline":""}>User Applications</NavLink>
            </>
          )}
          <NavLink to="/dashboard/loan-calculator" className={({isActive})=>isActive?"underline":""}>Loan Calculator</NavLink>
          <button onClick={handleLogout} className="ml-4 px-3 py-1 bg-red-600 rounded hover:bg-red-700">Logout</button>
        </nav>
      </header>

      {isPending && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 m-4 rounded">
          Your account is pending admin approval. Manager features are disabled.
        </div>
      )}

      <main className="p-4">
        <Routes>
          {/* nested routes are defined relative to /dashboard/* in App.jsx */}
          <Route index element={<LoanFeaturesGrid />} />
          {!isPending && (
            <>
              <Route path="new-application" element={<NewApplication />} />
              <Route path="applications" element={<ManagerApplications />} />
              <Route path="applications/:id" element={<ApplicationDetail />} />
            </>
          )}
          <Route path="loan-calculator" element={<LoanCalculator />} />
        </Routes>
      </main>
    </div>
  );
};

export default ManagerDashboard;
