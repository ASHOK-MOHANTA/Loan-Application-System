import React, { useState } from 'react';

const LoanCalculator = () => {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [term, setTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculatePayment = (e) => {
    e.preventDefault();

    const principal = parseFloat(amount);
    const monthlyInterest = parseFloat(interest) / 100 / 12;
    const numPayments = parseFloat(term);

    if (principal && monthlyInterest && numPayments) {
      const x = Math.pow(1 + monthlyInterest, numPayments);
      const monthly = (principal * x * monthlyInterest) / (x - 1);
      setMonthlyPayment(monthly.toFixed(2));
    } else {
      setMonthlyPayment(null);
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg max-w-xl mx-auto mt-10 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Loan Calculator</h2>
      <form onSubmit={calculatePayment} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="number"
          placeholder="Loan Term (in months)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Calculate
        </button>
      </form>
      {monthlyPayment && (
        <div className="mt-4 text-center text-lg">
          Estimated Monthly Payment: ₹{monthlyPayment}
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
