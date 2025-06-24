import axios from "axios"; // Put this at the top if not already
import React, { useState } from "react";

const Register = ({
  openLogin,
  onClose,
}: {
  openLogin: () => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ Important for CORS
        }
      );
      

      console.log("Registration successful:", res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      onClose();     
      openLogin();   
    } catch (err: any) {
      const message = err.response?.data?.error || "Registration failed.";
      setError(message);
      console.error("Registration error:", message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 relative">
       
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="••••••"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span>Already have an account?</span>{" "}
          <button
            onClick={() => {
              onClose();    // close Register
              openLogin();  // open Login
            }}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
