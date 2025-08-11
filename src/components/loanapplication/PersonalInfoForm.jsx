import React from 'react'

const PersonalInfoForm = ({ formData, handleChange, nextStep }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4efef] text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
        className="bg-[#1a1a1a] p-8 rounded-lg shadow-md w-[95%] max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#333] text-white outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 w-full py-2 rounded text-white font-semibold mt-6"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoForm
