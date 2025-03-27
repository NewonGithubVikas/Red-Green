import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaLock, FaKey, FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Reset Password";
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage({ text: "⚠️ Invalid or expired reset link!", type: "danger" });
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!token) {
      setMessage({ text: "⚠️ Token is missing.", type: "warning" });
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setMessage({ text: "⚠️ Both password fields are required.", type: "warning" });
      return;
    }

    if (password.length < 8) {
      setMessage({ text: "❌ Password must be at least 8 characters long.", type: "danger" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "❌ Passwords do not match.", type: "danger" });
      return;
    }

    setLoading(true);

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
        setMessage({ text: "✅ Password updated successfully!", type: "success" });
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ text: result.responseMessage || "❌ Failed to reset password.", type: "danger" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "⚠️ Internal server error. Please try again later.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg p-4">
          <h3 className="text-center mb-3 text-danger">
            <FaKey className="me-2" /> Reset Password
          </h3>

          {message.text && (
            <div className={`alert alert-${message.type} d-flex align-items-center`}>
              {message.type === "success" ? <FaCheckCircle className="me-2" /> : <FaExclamationTriangle className="me-2" />}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <FaLock className="me-2" /> New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter new password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                <FaLock className="me-2" /> Confirm Password
              </label>
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
              <button className="btn btn-danger" type="submit" disabled={loading || !token}>
                {loading ? <><FaSpinner className="spinner-border spinner-border-sm me-2" /> Processing...</> : "🔄 Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// function ResetPassword() {
//   const [searchParams] = useSearchParams();
//   const [token, setToken] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//    useEffect(()=>{
//       document.title = "reset-password"
//     },[]);
//   useEffect(() => {
//     const tokenFromUrl = searchParams.get("token");
//     if (tokenFromUrl) {
//       setToken(tokenFromUrl);
//     } else {
//       setMessage("⚠️ Invalid or expired reset link!");
//     }
//   }, [searchParams]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       setMessage("⚠️ Token is missing.");
//       return;
//     }

//     if (!password.trim() || !confirmPassword.trim()) {
//       setMessage("⚠️ Both password fields are required.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setMessage("❌ Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ pass: password, cpass: confirmPassword }),
//       });

//       const result = await response.json();
//       if (result.responseCode === 200) {
//         setMessage("✅ Password updated successfully!");
//         setPassword("");
//         setConfirmPassword("");
//       } else {
//         setMessage(result.responseMessage || "❌ Failed to reset password.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("⚠️ Internal server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow p-4">
//             <h4 className="text-center mb-3">🔑 Reset Password</h4>

//             {message && <div className="alert alert-info">{message}</div>}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">🔐 New Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   placeholder="Enter new password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="confirmPassword" className="form-label">🔄 Confirm Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="confirmPassword"
//                   placeholder="Re-enter new password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="d-grid gap-2">
//                 <button className="btn btn-success" type="submit" disabled={loading || !token}>
//                   {loading ? "Processing..." : "🔄 Reset Password"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;
