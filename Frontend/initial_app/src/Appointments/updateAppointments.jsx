// UpdateAppointment.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateAppointment = () => {
  const [form, setForm] = useState({
    id: "",
    date: "",
    time: "",
    serviceType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("appointmentToUpdate");
    if (!stored) {
      alert("No appointment selected. Redirecting you back to the list.");
      return navigate("/viewAppointments");
    }
    const { id, date, time, serviceType } = JSON.parse(stored);
    setForm({ id, date, time, serviceType });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const { id, date, time, serviceType } = form;
    if (!date || !time || !serviceType) {
      return alert("All fields are required.");
    }

    try {
      const res = await fetch(
        `http://localhost:8080/updateAppointment/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, time, serviceType }),
        }
      );

      if (res.status === 401) {
        alert("Please log in to update appointments.");
        return navigate("/login");
      }
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Failed to update appointment");
      }

      alert("Appointment updated successfully!");
      navigate("/viewAppointments");
    } catch (err) {
      console.error("Error updating appointment:", err);
      alert(err.message || "Error updating appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-red-600 mb-8">
        Update Appointment
      </h1>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md">
        {/* Appointment ID (read-only) */}
        <label className="block mb-4">
          <span className="text-gray-400">Appointment ID</span>
          <input
            type="text"
            name="id"
            value={form.id}
            readOnly
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded"
          />
        </label>

        {/* Date */}
        <label className="block mb-4">
          <span className="text-gray-400">Date</span>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded"
          />
        </label>

        {/* Time */}
        <label className="block mb-4">
          <span className="text-gray-400">Time</span>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded"
          />
        </label>

        {/* Service Type */}
        <label className="block mb-6">
          <span className="text-gray-400">Service Type</span>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded"
          >
            <option value="">Select Service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Tire Rotation">Tire Rotation</option>
            <option value="Brake Inspection">Brake Inspection</option>
          </select>
        </label>

        <button
          onClick={handleUpdate}
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
        >
          Update Appointment
        </button>
      </div>
    </div>
  );
};

export default UpdateAppointment;

