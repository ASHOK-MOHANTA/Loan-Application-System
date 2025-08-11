import React, { useEffect, useState } from "react";
import { db, auth } from "../services/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Approved: "bg-green-200 text-green-800",
  Rejected: "bg-red-200 text-red-800",
  Start: "bg-gray-200 text-gray-800",
};

export default function UserApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const q = query(
      collection(db, "loanApplications"),
      where("uid", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(apps);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">My Loan Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-600 text-center">You have no loan applications submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map(app => (
            <li
              key={app.id}
              className="border border-gray-300 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">Application ID: <span className="font-normal">{app.id}</span></p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    statusColors[app.status] || "bg-gray-200 text-gray-800"
                  }`}
                >
                  {app.status || "Unknown"}
                </span>
              </div>

              {/* You can add more application details here if needed */}
              {app.loanAmount && (
                <p className="text-gray-700">
                  <strong>Loan Amount:</strong> ₹{app.loanAmount}
                </p>
              )}
              {app.createdAt && (
                <p className="text-gray-500 text-sm">
                  Submitted on: {new Date(app.createdAt.seconds * 1000).toLocaleDateString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
