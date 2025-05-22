// DeleteAppointment.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAppointment = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!appointmentId.trim()) {
      return alert("Please enter an appointment ID.");
    }

    try {
      const res = await fetch(
        `http://localhost:8080/deleteAppointment/${appointmentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.status === 401) {
        alert("Please log in to delete an appointment.");
        return navigate("/login");
      }

      if (!res.ok) {
        throw new Error("Failed to delete appointment");
      }

      alert("Appointment deleted successfully!");
      setAppointmentId("");
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert(err.message || "Error deleting appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-red-600 mb-8">
        Delete Appointment
      </h1>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <label className="block mb-4">
          <span className="text-gray-400 mb-2 block">
            Appointment ID
          </span>
          <input
            type="text"
            placeholder="Enter Appointment ID"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded"
          />
        </label>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Delete Appointment
        </button>
      </div>
    </div>
  );
};

export default DeleteAppointment;

