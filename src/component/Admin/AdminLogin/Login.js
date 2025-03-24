import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function AdminLogin() {
  const [mobile, setMobile] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect admin if already logged in
  useEffect(() => {
    if (isAuthenticated || localStorage.getItem("token")) {
      navigate("/admin"); // Redirect to admin dashboard
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submitting

    try {
      const response = await fetch(`${API_BASE_URL}/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password: pass }),
      });

      const result = await response.json();

      if (response.status === 200 && result.token) {
        localStorage.setItem("token", result.token);
        login(result.token);
        navigate("/admin"); // Redirect to admin panel
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded" style={{ width: "400px" }}>
        <div className="card-header bg-dark text-white text-center">
          <h4>Admin Login</h4>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                className="form-control"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-dark">
                Log In
              </button>
            </div>
          </form>
        </div>
        <div className="text-center mt-3">
          <small>
            <a href="/admin/forgot-password" className="text-decoration-none">
              Forgot Password?
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
