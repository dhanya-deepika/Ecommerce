import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({
  openSignUp,
  onClose,
}: {
  openSignUp: () => void;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      const { token, user } = res.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
  
      if (remember) {
        localStorage.setItem("rememberEmail", email);
      }
  
      onClose();
      navigate("/");
    } catch (err: any) {
      const message = err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
      console.error("Login error:", message);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="w-full max-w-sm bg-white p-6 rounded shadow-lg relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        {error && (
          <div className="text-red-600 text-sm mb-3 text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="••••••"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
  <span>Don't have an account?</span>{" "}
  <button
    type="button"
    onClick={() => {
      onClose();
      openSignUp();
    }}
    className="text-blue-500 hover:underline"
  >
    Sign up
  </button>
</div>

      </div>
    </div>
  );
};

export default Login;
