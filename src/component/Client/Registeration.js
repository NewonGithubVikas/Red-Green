import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Registration() {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    pass: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, mobile, pass, confirmPassword } = formData;

    // Reset previous error and success messages
    setError("");
    setSuccess("");

    // Email validation
    if (!email) {
      setError("Email is required.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    // Mobile number validation (exactly 10 digits)
    if (!mobile) {
      setError("Mobile number is required.");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    // Password validation (minimum 8 characters)
    if (!pass) {
      setError("Password is required.");
      return;
    }

    if (pass.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Confirm password validation
    if (confirmPassword !== pass) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mobile, pass }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.responseCode === 404) {
          setError("This email or mobile number is already registered.");
        } else {
          setSuccess("Registration successful!");
          navigate("/otp-confirmation", { state: {email, mobile } });

          // Reset form data after successful registration
          setFormData({ email: "", mobile: "", pass: "", confirmPassword: "" });
        }
      } else {
        const result = await response.json();
        setError(result.responseMessage || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-danger text-white text-center">
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {/* Mobile Input */}
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="pass" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="pass"
                    name="pass"
                    placeholder="Enter password (min 8 characters)"
                    value={formData.pass}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Error and Success Messages */}
                {error && <p className="text-danger text-center">{error}</p>}
                {success && <p className="text-success text-center">{success}</p>}

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">Register</button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>
                Already have an account? {" "}
                <Link to="/signin" className="text-success">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
