import React from "react";
import { useNavigate } from "react-router-dom";

const loanProducts = [
  {
    name: "Education Loan",
    interest: "7.5% p.a.",
    features: [
      "Loan Section Upto ₹35 Lakh",
      "Low Processing Charge",
      "Minimum Documentation",
      "Zero Hidden Cost",
      "Digital Documentation Execution",
    ],
  },
  {
    name: "Car Loan",
    interest: "8.2% p.a.",
    features: [
      "Loan Section Upto ₹25 Lakh",
      "Quick Approval",
      "Low EMI Options",
      "Zero Hidden Cost",
      "Digital Documentation Execution",
    ],
  },
  {
    name: "Personal Loan",
    interest: "10.5% p.a.",
    features: [
      "Loan Section Upto ₹20 Lakh",
      "No Collateral Required",
      "Minimum Documentation",
      "Zero Hidden Cost",
      "Digital Documentation Execution",
    ],
  },
  {
    name: "Gold Loan",
    interest: "9.0% p.a.",
    features: [
      "Loan Section Upto ₹15 Lakh",
      "Instant Approval",
      "Secure Locker Facility",
      "Zero Hidden Cost",
      "Digital Documentation Execution",
    ],
  },
];

const LoanFeaturesGrid = () => {
  const navigate = useNavigate();

  const handleApply = (loanType) => {
    navigate("/dashboard/new-application", { state: { loanType } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {loanProducts.map((loan, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-bold mb-2 text-blue-600">{loan.name}</h3>
            <p className="text-sm text-gray-700 mb-4">
              Interest Rate: <span className="font-semibold">{loan.interest}</span>
            </p>
            <ul className="text-sm space-y-2 mb-4">
              {loan.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-green-500">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => handleApply(loan.name)}
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default LoanFeaturesGrid;
