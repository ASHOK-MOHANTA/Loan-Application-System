import React, { useState } from "react";
import { db, auth } from "../../services/firebaseConfig";  // Import auth here
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ReviewSubmitForm({ formData, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const currentUser = auth.currentUser; // Get current user
      if (!currentUser) throw new Error("User not logged in");

      // Remove File objects from formData
      const cleanedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value instanceof File ? null : value,
        ])
      );

      const finalData = {
        ...cleanedData,
        uid: currentUser.uid,      // ADD USER ID HERE
        createdAt: new Date(),
        status: "Pending",
      };

      await addDoc(collection(db, "loanApplications"), finalData);

      setLoading(false);
      onSuccess?.();
      navigate("/submission-success");
    } catch (error) {
      console.error("Error submitting application:", error);
      setLoading(false);
      onError?.(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-black rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Review & Submit
      </h2>

      <div className="bg-black p-4 rounded-lg mb-6 ">
        {Object.entries(formData).map(([key, value]) => (
          <p key={key} className="text-white mb-2">
            <span className="font-semibold">{key}:</span>{" "}
            {value instanceof File ? "Skipped (Not Uploaded)" : value}
          </p>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
