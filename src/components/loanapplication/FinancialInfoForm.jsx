import React from 'react';

const FinancialInfoForm = ({ formData, setFormData, nextStep, prevStep }) => {
    const employmentOptions = ['Full Time', 'Part Time', 'Self-Employed', 'Unemployed', 'Other'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleNext} className="bg-black text-white p-6 rounded-lg shadow-md   w-full max-w-2xl h-full max-h-2xl mx-auto mt-25">
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-400">Financial Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-white ">Annual Income</label>
                    <input
                        type="number"
                        name="annualIncome"
                        value={formData.annualIncome || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border rounded-md bg-[#333] "
                    />
                </div>

                <div>
                    <label className="block text-white">Employment Type</label>
                    <select
                        name="employmentType"
                        value={formData.employmentType || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border rounded-md bg-[#333]"
                    >
                        <option value="">Select</option>
                        {employmentOptions.map((option) => (
                            <option key={option} value={option} className="block bg-white text-black" >{option}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-white">Employer Name</label>
                    <input
                        type="text"
                        name="employerName"
                        value={formData.employerName || ''}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border rounded-md bg-[#333]"
                    />
                </div>

                <div>
                    <label className="block text-white">Year of Employment</label>
                    <input
                        type="number"
                        name="yearOfEmployment"
                        value={formData.yearOfEmployment || ''}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border rounded-md bg-[#333]"
                    />
                </div>

                <div>
                    <label className="block text-white">Monthly Expenses</label>
                    <input
                        type="number"
                        name="monthlyExpenses"
                        value={formData.monthlyExpenses || ''}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border rounded-md bg-[#333]"
                    />
                </div>

                <div>
                    <label className="block text-white">Credit Score</label>
                    <input
                        type="number"
                        name="creditScore"
                        value={formData.creditScore || ''}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border rounded-md bg-[#333]"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default FinancialInfoForm;
