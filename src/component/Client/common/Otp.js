import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const { mobile } = location.state || {}; // Retrieve the mobile number from the state

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
      const response = await fetch("http://localhost:4500/user/otpvarify", {
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
      <div className="container w-50 bg-secondary p-4">
        <h2 className="text-center mt-3">Error</h2>
        <p className="text-center">Mobile number not provided. Please go back and register again.</p>
      </div>
    );
  }

  return (
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
    </div>
  );
}
