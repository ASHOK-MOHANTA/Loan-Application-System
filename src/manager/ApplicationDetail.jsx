import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useParams, useNavigate } from "react-router-dom";

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const docRef = doc(db, "loanApplications", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setApplication(docSnap.data());
        } else {
          alert("Application not found");
          navigate("/dashboard/applications");
        }
      } catch (error) {
        console.error("Error fetching application:", error);
      }
      setLoading(false);
    };

    fetchApplication();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const docRef = doc(db, "loanApplications", id);
      await updateDoc(docRef, { status: newStatus });
      setApplication((prev) => ({ ...prev, status: newStatus }));
      alert(`Application ${newStatus.toLowerCase()} successfully.`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
    setUpdating(false);
  };

  if (loading) return <p>Loading application details...</p>;

  if (!application) return null;

  return (
    <div className="max-w-3xl mx-auto bg-black text-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Application Details</h2>
      {Object.entries(application).map(([key, value]) => (
        <div key={key} className="mb-2">
          <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong>{" "}
          <span>{typeof value === "object" ? JSON.stringify(value) : value?.toString()}</span>
        </div>
      ))}

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => handleStatusChange("Approved")}
          disabled={updating || application.status === "Approved"}
          className={`px-4 py-2 rounded text-white ${
            application.status === "Approved"
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Approve
        </button>

        <button
          onClick={() => handleStatusChange("Rejected")}
          disabled={updating || application.status === "Rejected"}
          className={`px-4 py-2 rounded text-white ${
            application.status === "Rejected"
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Reject
        </button>

        <button
          onClick={() => navigate("/dashboard/applications")}
          className="ml-auto px-4 py-2 bg-amber-300 rounded hover:bg-amber-400"
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetail;
