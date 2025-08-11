import React from 'react';
import { Upload } from 'lucide-react'; // ← import icon

const DocumentUploadForm = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form
      onSubmit={handleNext}
      className="bg-black text-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto mt-25"
    >
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2  text-blue-400">
        <Upload className="w-6 h-6" /> 
        Upload Documents
      </h2>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Identity Proof (Aadhar/PAN)</label>
        <input
          type="file"
          name="identityProof"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          required
          className="w-full bg-white text-black border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Income Proof (Salary Slip/Bank Statement)</label>
        <input
          type="file"
          name="incomeProof"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          required
          className="w-full bg-white text-black border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Address Proof (Utility Bill)</label>
        <input
          type="file"
          name="addressProof"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          required
          className="w-full bg-white text-black border rounded px-3 py-2"
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

export default DocumentUploadForm;
