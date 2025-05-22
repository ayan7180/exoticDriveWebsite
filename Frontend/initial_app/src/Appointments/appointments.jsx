import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentsData = () => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    serviceType: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/addAppointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      // not logged in?
      if (res.status === 401) {
        alert("Please log in to add an appointment.");
        return navigate("/login");
      }

      if (!res.ok) throw new Error("Failed to add appointment");
      alert("Appointment added successfully!");

      // clear the form
      setForm({ date: "", time: "", serviceType: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleViewAll = async () => {
    try {
      const res = await fetch("http://localhost:8080/app", {
        credentials: "include",
      });
      if (res.status === 401) {
        alert("Please log in to view appointments.");
        return navigate("/login");
      }
    
      navigate("/viewAppointments");
    } catch (err) {
      console.error(err);
      alert("Unable to load appointments.");
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
        Car Service Appointments
      </h1>

      <div className="max-w-md mx-auto bg-gray-900 border border-red-600 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Add Appointment
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded"
              required
            />
          </label>

          <label className="block mb-2">
            Time
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded"
              required
            />
          </label>

          <label className="block mb-4">
            Service Type
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded"
              required
            >
              <option value="">Select Service</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Tire Rotation">Tire Rotation</option>
              <option value="Brake Inspection">Brake Inspection</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded mb-3"
          >
            Add Appointment
          </button>

          <button
            type="button"
            onClick={handleViewAll}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            View All Appointments
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentsData;
