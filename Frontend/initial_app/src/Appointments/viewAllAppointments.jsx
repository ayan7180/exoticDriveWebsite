import React, { useState, useEffect } from "react";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:8080/app", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/deleteAppointment/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to delete appointment");
      alert("Appointment deleted!");
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (appt) => {
    // stash only the fields we care about
    sessionStorage.setItem(
      "appointmentToUpdate",
      JSON.stringify({
        id: appt._id,
        date: appt.date,
        time: appt.time,
        serviceType: appt.serviceType,
      })
    );
    window.location.href = "/updateAppointment";
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
        All Appointments
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="bg-gray-800 rounded-lg p-4 shadow-md hover:scale-105 transition"
          >
            <p>
              <strong>Date:</strong> {appt.date}
            </p>
            <p>
              <strong>Time:</strong> {appt.time}
            </p>
            <p>
              <strong>Service:</strong> {appt.serviceType}
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => handleUpdate(appt)}
                className="bg-yellow-600 text-white py-1 rounded hover:bg-yellow-700 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(appt._id)}
                className="bg-gray-600 text-white py-1 rounded hover:bg-gray-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAppointments;