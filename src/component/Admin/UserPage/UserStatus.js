import React, { useContext, useState,useEffect } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function UserStatus() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [blockedUsers, setBlockedUsers] = useState([]);
  const { token } = useContext(AuthContext);

   useEffect(()=>{
      document.title = "user-status"
    },[]);
  const handleBlockUser = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setMessage("⚠️ Please enter a valid User ID.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/user/block-user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });
      const result = await response.json();
      if (response.status === 200) {
        setMessage(`✅ User ${userId} has been blocked successfully.`);
        setUserId("");
        handleShowBlockedUsers();
      } else {
        setMessage(result.responseMessage || "❌ Failed to block user.");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      setMessage("⚠️ An error occurred. Please try again later.");
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/unblock-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });
      const result = await response.json();
      if (response.status === 200) {
        setMessage(`✅ User ${userId} has been unblocked successfully.`);
        handleShowBlockedUsers();
      } else {
        setMessage(result.responseMessage || "❌ Failed to unblock user.");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      setMessage("⚠️ Failed to unblock user.");
    }
  };

  const handleShowBlockedUsers = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/user/show-blocked-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      if (response.status === 200) {
        setBlockedUsers(result.data || []);
        setMessage("");
      } else {
        setMessage("⚠️ No blocked users found.");
        setBlockedUsers([]);
      }
    } catch (error) {
      console.error("Error fetching blocked users:", error);
      setMessage("❌ Failed to fetch blocked users.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="text-center mb-4">🔒 Manage Users</h4>

            <form>
              <div className="mb-3">
                <label htmlFor="blockUserId" className="form-label">
                  Enter User ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="blockUserId"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-danger" onClick={handleBlockUser}>
                  🚫 Block User
                </button>
                <button className="btn btn-outline-primary" onClick={handleShowBlockedUsers}>
                  👀 Show Blocked Users
                </button>
              </div>
            </form>

            {message && <div className="mt-3 alert alert-info fade show">{message}</div>}
          </div>
        </div>
      </div>

      {blockedUsers.length > 0 && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            <div className="card shadow p-3">
              <h5 className="text-center mb-3">🚫 Blocked Users</h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">📞 Mobile</th>
                      <th scope="col">🆔 User ID</th>
                      <th scope="col">📊 Status Code</th>
                      <th scope="col">🔓 Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockedUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.mobile}</td>
                        <td>{user._id}</td>
                        <td>{user.statusCode}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleUnblockUser(user._id)}
                          >
                            ✅ {user.statusCode === "ACTIVE" ? "BLOCK" : "UNBLOCK"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserStatus;
