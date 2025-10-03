import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", course: "" });
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.name || !formData.email || !formData.course) {
      setError("⚠️ Please fill in all fields before submitting.");
      return;
    }

    setEntries((prev) => [...prev, formData]);
    setFormData({ name: "", email: "", course: "" }); // reset form
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Course Registration</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${!formData.name && error ? "border-red-500" : "focus:ring-blue-400"}`}
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${!formData.email && error ? "border-red-500" : "focus:ring-blue-400"}`}
              placeholder="Enter your email"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block font-medium mb-1">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${!formData.course && error ? "border-red-500" : "focus:ring-blue-400"}`}
              placeholder="Enter your course"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Table of Entries */}
      {entries.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-3">Submitted Entries</h2>
          <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Course</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="text-center hover:bg-gray-100">
                  <td className="py-2 px-4 border">{entry.name}</td>
                  <td className="py-2 px-4 border">{entry.email}</td>
                  <td className="py-2 px-4 border">{entry.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
