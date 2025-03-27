import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
   useEffect(()=>{
      document.title = "reset-password"
    },[]);
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage("⚠️ Invalid or expired reset link!");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("⚠️ Token is missing.");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setMessage("⚠️ Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pass: password, cpass: confirmPassword }),
      });

      const result = await response.json();
      if (result.responseCode === 200) {
        setMessage("✅ Password updated successfully!");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(result.responseMessage || "❌ Failed to reset password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Internal server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="text-center mb-3">🔑 Reset Password</h4>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">🔐 New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">🔄 Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-success" type="submit" disabled={loading || !token}>
                  {loading ? "Processing..." : "🔄 Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
