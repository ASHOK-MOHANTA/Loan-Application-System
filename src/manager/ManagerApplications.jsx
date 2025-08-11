import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { Link } from "react-router-dom";

const ManagerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "loanApplications"));
        const apps = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(apps);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Loan Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Applicant UID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Submitted On</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="border px-4 py-2">{app.uid}</td>
                <td className="border px-4 py-2">{app.status}</td>
                <td className="border px-4 py-2">{app.createdAt?.toDate?.().toLocaleString() || new Date(app.createdAt.seconds * 1000).toLocaleString()}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/dashboard/applications/${app.id}`}
                    className="text-blue-600 underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerApplications;
