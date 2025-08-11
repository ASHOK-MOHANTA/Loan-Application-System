import React from 'react';

const LoanDetailsForm = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="bg-black text-white p-6 rounded-lg shadow-md w-full max-w-2xl h-full max-h-2xl mx-auto mt-25">
      <h2 className="text-2xl font-bold mb-6 text-center  text-blue-400">Loan Details</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Loan Type</label>
        <select
          name="loanType"
          value={formData.loanType || ''}
          onChange={handleChange}
          required
          className="mt-1 w-full px-3 py-2 border rounded"
        >
          <option value=""className='bg-gray-700' >Select Loan Type</option>
          <option value="Personal Loan" className='bg-gray-700' >Personal Loan</option>
          <option value="Car Loan" className='bg-gray-700'>Car Loan</option>
          <option value="Home Loan"className='bg-gray-700'>Home Loan</option>
          <option value="Gold Loan"className='bg-gray-700'>Gold Loan</option>
          <option value="Education"className='bg-gray-700'>Education</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Loan Amount (₹)</label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount || ''}
          onChange={handleChange}
          required
          className="mt-1 w-full px-3 py-2 border rounded"
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Loan Term (in months)</label>
        <input
          type="number"
          name="loanTerm"
          value={formData.loanTerm || ''}
          onChange={handleChange}
          required
          className="mt-1 w-full px-3 py-2 border rounded"
          placeholder="Ex - 24"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Loan Purpose</label>
        <textarea
          name="loanPurpose"
          value={formData.loanPurpose || ''}
          onChange={handleChange}
          required
          className="mt-1 w-full px-3 py-2 border rounded"
          placeholder="Describe the reason for taking the loan"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default LoanDetailsForm;
