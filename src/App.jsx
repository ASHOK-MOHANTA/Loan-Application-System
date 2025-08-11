import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConfig";
import { getUserRole } from "./utils/getUserRole";

import UserDashboard from "./user/UserDashboard";
import ManagerDashboard from "./manager/ManagerDashboard";
import LoanCalculator from "./pages/LoanCalculator";
import Payments from "./pages/Payments";
import LoanApplicationForm from "./components/loanapplication/MultiStepForm";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Register";
import SubmitionSuccess from "./pages/SubmissionSuccess";
import UserApplications from "./user/UserApplications";
import ManagerApplications from "./manager/ManagerApplications";
import AdminDashboard from "./admin/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const fetchedRole = await getUserRole(currentUser.uid); // ✅ pass UID
        setUser(currentUser);
        setRole(fetchedRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  const RequireAdmin = ({ children }) => {
    if (!user || role !== "admin") {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* User Dashboard */}
      {role === "user" && (
        <Route path="/dashboard/*" element={<UserDashboard />}>
          <Route path="new-application" element={<LoanApplicationForm />} />
          <Route path="user-applications" element={<UserApplications />} />
          <Route path="loan-calculator" element={<LoanCalculator />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      )}

      {/* Manager Dashboard (approved + pending) */}
      {(role === "manager" || role === "pending") && (
        <Route path="/dashboard/*" element={<ManagerDashboard />} />
      )}

      <Route path="submission-success" element={<SubmitionSuccess />} />

      {/* Admin Dashboard */}
      {role === "admin" && <Route path="/admin/*" element={<AdminDashboard />} />}

      {/* Default Redirect */}
      <Route
        path="*"
        element={
          user
            ? role === "admin"
              ? <Navigate to="/admin" />
              : <Navigate to="/dashboard" />
            : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}
