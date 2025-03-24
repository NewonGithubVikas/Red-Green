import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const { email, mobile } = location.state || {}; // Retrieve both email and mobile

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/otpvarify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, email, mobile }), // Send both email and mobile
      });

      const result = await response.json();

      if (result.responseCode === 200) {
        setSuccessMessage("✅ OTP verified successfully!");
        setError("");
        setOtp(""); // Reset the OTP field
      } else if (result.responseCode === 400) {
        setError(result.responseMessage);
        setSuccessMessage("");
      } else if (result.responseCode === 404) {
        setError("User does not exist. Please register again.");
        setSuccessMessage("");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };

  if (!email || !mobile) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card text-center shadow-lg p-4 border-danger" style={{ maxWidth: "400px" }}>
          <h2 className="text-danger">Error</h2>
          <p className="text-muted">Email or mobile number not provided.</p>
          <p>Please go back and register again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-3">OTP Confirmation</h2>
          <p className="text-center text-muted">
            We've sent a 6-digit OTP to <strong>{email}</strong> and <strong>{mobile}</strong>.
          </p>
          <form onSubmit={handleSubmit} className="mt-3">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

            <div className="mb-3">
              <label htmlFor="otp" className="form-label">Enter OTP:</label>
              <input
                type="text"
                className="form-control text-center fs-4 fw-bold"
                id="otp"
                placeholder="••••••"
                value={otp}
                onChange={handleChange}
                maxLength={6}
                required
                style={{
                  letterSpacing: "4px",
                  padding: "10px",
                  textTransform: "uppercase",
                }}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100 fw-bold">Confirm OTP</button>
            </div>
          </form>

          {/* Resend OTP Link */}
          <div className="text-center mt-3">
            <p className="text-muted">
              Didn't receive the OTP?{" "}
              <Link to="/resend-otp" className="btn btn-link text-primary fw-bold">
                Resend OTP
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
