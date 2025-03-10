import React, { useState } from "react";
import { useLocation } from "react-router-dom";
<<<<<<< HEAD

=======
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
>>>>>>> c361654 (updated feature Number Game and other thing)
export default function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
<<<<<<< HEAD
  const { mobile } = location.state || {}; // Retrieve the mobile number from the state
=======
  const { mobile } = location.state || {}; // Retrieve the mobile number from state
>>>>>>> c361654 (updated feature Number Game and other thing)

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
<<<<<<< HEAD
      const response = await fetch("https://back-5es4.onrender.com/user/otpvarify", {
=======
      const response = await fetch(`${API_BASE_URL}/user/otpvarify`, {
>>>>>>> c361654 (updated feature Number Game and other thing)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, mobile }), // Include the mobile number in the request
      });

      if (!response.ok) {
        throw new Error("Invalid OTP. Please try again.");
      }

      const result = await response.json();
      console.log(result);
      setSuccessMessage("OTP verified successfully!");
      setError("");
      setOtp(""); // Reset the OTP field
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };

  if (!mobile) {
    return (
<<<<<<< HEAD
      <div className="container w-50 bg-secondary p-4">
        <h2 className="text-center mt-3">Error</h2>
        <p className="text-center">Mobile number not provided. Please go back and register again.</p>
=======
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card text-center shadow-lg p-4 border-danger" style={{ maxWidth: "400px" }}>
          <h2 className="text-danger">Error</h2>
          <p className="text-muted">Mobile number not provided.</p>
          <p>Please go back and register again.</p>
        </div>
>>>>>>> c361654 (updated feature Number Game and other thing)
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="container w-50 bg-secondary p-4">
      <h2 className="text-center mt-3">OTP Confirmation</h2>
      <p className="text-center">We have sent an OTP to your mobile number: {mobile}</p>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <div className="mb-3 mt-3">
          <label htmlFor="otp" className="form-label">
            Enter OTP:
          </label>
          <input
            type="text"
            className="form-control"
            id="otp"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleChange}
            maxLength={6}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mb-4">
            Confirm OTP
          </button>
        </div>
      </form>
=======
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-3">OTP Confirmation</h2>
          <p className="text-center text-muted">
            We've sent a 6-digit OTP to <strong>{mobile}</strong>.
          </p>
          <form onSubmit={handleSubmit} className="mt-3">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                Enter OTP:
              </label>
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
              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Confirm OTP
              </button>
            </div>
          </form>
        </div>
      </div>
>>>>>>> c361654 (updated feature Number Game and other thing)
    </div>
  );
}
