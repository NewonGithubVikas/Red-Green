
import React, { useState, useContext,useEffect } from 'react';
import { AuthContext } from '../../../../Context/AuthContext';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { userId } = useContext(AuthContext);
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage
   useEffect(()=>{
      document.title = "update-password"
    },[]);
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/updatePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ✅ Include token in headers
        },
        body: JSON.stringify({ oldPassword, newPassword, userId }),
      });

      const result = await response.json();
      
      if (response.status === 200) {
        setMessage('Password updated successfully!');
      } else {
        setMessage(result.message || 'Failed to update password');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title text-center text-success">Update Password</h5>

          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success w-100" onClick={handleUpdatePassword}>
            Update Password
          </button>
          {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
