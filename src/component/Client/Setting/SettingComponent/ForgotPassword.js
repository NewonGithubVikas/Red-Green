import React, { useState,useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    document.title = "forgot password"
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !mobile.trim()) {
      setMessage("⚠️ Please enter both Email and Mobile Number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mobile }),
      });

      const result = await response.json();
      if (response.status === 200) {
        setMessage(`✅ Password reset link has been sent to ${email}.`);
      } else {
        setMessage(result.responseMessage || "❌ Failed to process request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="text-center mb-3">🔑 Forgot Password</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">📧 Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">📱 Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Processing..." : "🔄 Reset Password"}
                </button>
              </div>
            </form>

            {message && <div className="mt-3 alert alert-info">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
