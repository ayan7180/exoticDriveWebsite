// signupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    admin: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.status === 400) {
        return alert("A user with that email already exists.");
      }
      if (!res.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      // 201 Created — server has already set the cookie
      setUser({ email: form.email, admin: form.admin});
      alert("Signup successful! You’re now logged in.");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
        Sign Up
      </h1>
      <div className="max-w-md mx-auto bg-gray-900 border border-red-600 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            required
          />
          <input
            type="admin"
            name="admin"
            placeholder="0 or 1"
            value={form.admin}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            required
          />
            
          <button
            type="submit"
            className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-red-400 mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="underline text-red-500 hover:text-red-300"
          >
            Login
          </button>
        </p>

                <p className="text-red-400 mt-4 text-center">
          DELETE YOUR ACCOUNT?{" "}
          <button
            onClick={() => navigate("/deleteAccount")}
            className="underline text-red-500 hover:text-red-300"
          >
            Delete Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
