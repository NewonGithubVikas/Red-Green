import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { FaLock, FaCheckCircle, FaExclamationTriangle, FaSpinner, FaKey } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  useEffect(() => {
    document.title = "Update Password";
  }, []);

  const handleUpdatePassword = async () => {
    setMessage({ text: "", type: "" });

    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setMessage({ text: "⚠️ All fields are required.", type: "warning" });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ text: "❌ Password must be at least 8 characters long.", type: "danger" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: "❌ New passwords do not match.", type: "danger" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/user/updatePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ Include token in headers
        },
        body: JSON.stringify({ oldPassword, newPassword, userId }),
      });

      const result = await response.json();
      
      if (response.status === 200) {
        setMessage({ text: "✅ Password updated successfully!", type: "success" });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ text: result.message || "❌ Failed to update password.", type: "danger" });
      }
    } catch (error) {
      setMessage({ text: "⚠️ An error occurred. Please try again.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg p-4 border-0">
          <h3 className="text-center mb-3 text-primary">
            <FaKey className="me-2" /> Update Password
          </h3>

          {message.text && (
            <div className={`alert alert-${message.type} d-flex align-items-center`}>
              {message.type === "success" ? <FaCheckCircle className="me-2" /> : <FaExclamationTriangle className="me-2" />}
              {message.text}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">
              <FaLock className="me-2" /> Current Password
            </label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="Enter current password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <FaLock className="me-2" /> New Password
            </label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password (min 8 characters)"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <FaLock className="me-2" /> Confirm New Password
            </label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleUpdatePassword} disabled={loading}>
            {loading ? <><FaSpinner className="spinner-border spinner-border-sm me-2" /> Updating...</> : "🔄 Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;

// import React, { useState, useContext,useEffect } from 'react';
// import { AuthContext } from '../../../../Context/AuthContext';
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const UpdatePassword = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const { userId } = useContext(AuthContext);
//   const token = localStorage.getItem("token"); // ✅ Get token from localStorage
//    useEffect(()=>{
//       document.title = "update-password"
//     },[]);
//   const handleUpdatePassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setMessage('New passwords do not match');
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/user/updatePassword`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // ✅ Include token in headers
//         },
//         body: JSON.stringify({ oldPassword, newPassword, userId }),
//       });

//       const result = await response.json();
      
//       if (response.status === 200) {
//         setMessage('Password updated successfully!');
//       } else {
//         setMessage(result.message || 'Failed to update password');
//       }
//     } catch (error) {
//       setMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card mx-auto" style={{ maxWidth: "400px" }}>
//         <div className="card-body">
//           <h5 className="card-title text-center bg-danger">Update Password</h5>
//           <div className="mb-3">
//             <label className="form-label">Old Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">New Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Confirm New Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button className="btn btn-success w-100" onClick={handleUpdatePassword}>
//             Update Password
//           </button>
//           {message && <div className="alert alert-success mt-3">{message}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdatePassword;
