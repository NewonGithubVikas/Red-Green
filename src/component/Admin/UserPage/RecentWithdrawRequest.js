import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RecentWithdrawRequest = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");
   useEffect(()=>{
      document.title = "Withdraw-Request"
    },[]);
  // Fetch latest withdraw requests
  const fetchLatestTransactions = useCallback(async () => {
    setLoading(true);
    const token = getToken();

    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/check-withdraw-request`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      console.log("API Response:", data);
      setLatestTransactions(Array.isArray(data.transactions) ? data.transactions : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Approve withdraw request
  const handleApprove = useCallback(async (amount, userId) => {
    const token = getToken();

    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/status-withdraw-change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, amount: amount }),
      });

      const result = await response.json();
      alert(result.message);

      if (response.ok) {
        fetchLatestTransactions(); // Refresh transactions after approval
      }
    } catch (error) {
      alert("Failed to update status");
    }
  }, [navigate, fetchLatestTransactions]);

  // Fetch account details
  const fetchAccountDetails = useCallback(async (userId) => {
    const token = getToken();

    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/account/account-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch account details");
      }

      const data = await res.json();
      setAccountDetails(data.data[0]);
      setShowModal(true);
    } catch (error) {
      alert(error.message);
    }
  }, [navigate]);

  useEffect(() => {
    fetchLatestTransactions();
  }, [fetchLatestTransactions]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Recent Withdraw Request List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : latestTransactions.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>User ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
              <th>Account Details</th>
            </tr>
          </thead>
          <tbody>
            {latestTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.userId || "N/A"}</td>
                <td>{transaction.amount || "N/A"}</td>
                <td>{transaction.status || "N/A"}</td>
                <td>
                  {transaction.status === "pending" && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(transaction.amount, transaction.userId)}
                    >
                      Approve
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => fetchAccountDetails(transaction.userId)}
                  >
                    Show Account Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending transactions found.</p>
      )}

      {/* Account Details Modal */}
      {showModal && accountDetails && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Account Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Account Holder:</strong> {accountDetails.accountHolderName || "N/A"}</p>
                <p><strong>Bank Name:</strong> {accountDetails.branch || "N/A"}</p>
                <p><strong>Account Number:</strong> {accountDetails.accountNumber || "N/A"}</p>
                <p><strong>IFSC Code:</strong> {accountDetails.ifscCode || "N/A"}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentWithdrawRequest;
