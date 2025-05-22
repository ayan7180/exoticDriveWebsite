// loginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // simple blank check
    for (let key of ["email", "password"]) {
      if (!credentials[key].trim()) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (res.status === 401) {
        alert("Invalid email or password.");
        return;
      }

      if (!res.ok) {
        throw new Error("Login failed. Try again later.");
      }

      // ✅ DEFINE data HERE by parsing the response JSON
      const data = await res.json();
      console.log(data.admin);

      // success — set the user and go home
      setUser({email: credentials.email, admin: data.admin});
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
        Login
      </h1>
      <div className="max-w-md mx-auto bg-gray-900 border border-red-600 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            required
          />

          <button
            type="submit"
            className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-red-400 mt-4 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="underline text-red-500 hover:text-red-300"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

