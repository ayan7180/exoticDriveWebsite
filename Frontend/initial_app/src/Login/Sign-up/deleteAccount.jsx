// DeleteAccount.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({ setUser }) => {
  const navigate = useNavigate();

   const handleDelete = async () => {
    const asciiArt = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣠⣴⣾⣶⣶⣤⣄⣄⣤⣶⣾⣿⣿⣿⣿⣿⣶⣤⢀⣀⠀⠀⠀⠀
⡈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢸⣿⣿⣶⡄⠀
⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣯⣕⣶⡇⠀
⢰⣿⡟⠙⠿⠿⠿⣿⣹⣿⠟⠛⠛⠋⠁⠈⠻⣿⣿⣧⠹⣿⣿⠁⠀
⠘⣟⣤⠠⠀⠤⠀⡘⣿⣿⡷⠄⡀⢐⡒⠻⠻⣿⣿⣿⡇⠿⣫⢤⠀
⠃⣿⣿⣜⣋⣀⠜⡪⣸⣿⣧⣼⣇⣩⣠⣬⣁⣾⣿⣿⣿⣰⡇⣠⡀
⠀⣿⣿⣿⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⣨⠀
⣶⡘⣿⣿⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢏⣼⣿⣵⠏⠀
⠘⣷⡸⣿⣿⣿⣿⣇⠻⠿⠛⢹⣿⣿⣿⣿⣿⣿⢃⣾⣿⠿⠏⠀⠀
⠀⠸⡇⣿⣿⡿⠛⠀⠁⠀⠀⠀⠉⠛⢿⣿⣿⣿⢸⣿⣿⢠⡆⠀⠀
⠀⠀⣇⢿⣿⠁⠀⠀⠀⢀⣀⣀⣀⠀⠀⢿⣿⡟⣸⣿⣿⢸⡇⠀⠀
⠀⠀⢻⡜⣿⣴⣿⣿⣯⣛⣛⣿⣿⣿⣶⣬⣿⢣⣿⡿⠃⣠⡇⠀⠀
⠀⠀⠀⢻⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⠟⠀⣸⣿⣇⠀⠀
⠀⠀⠀⣆⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢃⢂⣼⣿⣿⣿⠀⠀
⠀⠀⠀⢿⣧⠹⣿⣿⣿⣷⣿⣿⣿⣿⣿⡟⣱⢃⣾⣿⣿⣿⣿⣄⡀
⠀⠀⠀⠸⠿⠷⠔⠭⠭⠭⠭⠭⠥⠶⠶⠾⠇⠾⠿⠿⠿⠿⠿⠿⠿
`;

    const message = `
${asciiArt}
“ARE U SURE?” 
`;

    if (!window.confirm(message)) {
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/deleteAccount", {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 401) {
        alert("You must be logged in to delete your account.");
        return navigate("/login");
      }
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Failed to delete account");
      }

      alert("Your account and appointments have been deleted.");
      if (setUser) setUser(null);
      navigate("/signup");
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-6">
        Delete Your Account
      </h1>
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg shadow-lg transition"
      >
        Permanently Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;