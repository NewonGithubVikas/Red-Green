import React, { useState,useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ResendOtp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

   useEffect(()=>{
      document.title = "Resend-Otp"
    },[]);
  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
    setMessage({ text: "", type: "" });
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle Resend OTP submission
  const handleResendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ text: "Email is required", type: "error" });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ text: "Invalid email format", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(${API_BASE_URL}/user/resendotp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: "OTP has been resent to your email, Please Also check spam folder of gmail", type: "success" });
      } else {
        setMessage({ text: result.responseMessage || "Failed to resend OTP", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Something went wrong. Please try again.", type: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h4>Resend OTP</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleResendOtp}>
                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message Display */}
                {message.text && (
                  <p className={text-center ${message.type === "success" ? "text-success" : "text-danger"}}>
                    {message.text}
                  </p>
                )}

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Resending..." : "Resend OTP"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
