// src/pages/SubmissionSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SubmissionSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Application Submitted!</h1>
        <p className="text-gray-700 mb-6">We have received your loan application. You can track its status from your dashboard.</p>
        <Link
          to="/dashboard"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
