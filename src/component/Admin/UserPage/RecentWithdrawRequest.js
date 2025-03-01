import React, { useState, useEffect } from "react";

const RecentWithdrawRequest = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchLatestTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://back-5es4.onrender.com/admin/check-withdraw-request");
      const data = await response.json();
      console.log("API Response:", data);

      if (data.transactions && Array.isArray(data.transactions)) {
        setLatestTransactions(data.transactions);
      } else {
        setLatestTransactions([]);
      }
    } catch (err) {
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestTransactions();
  }, []);

  const handleApprove = async (amount, userId) => {
    try {
      const response = await fetch("https://back-5es4.onrender.com/admin/status-withdraw-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, amount: amount }),
      });

      const result = await response.json();
      alert(result.message);

      if (response.ok) {
        fetchLatestTransactions();
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const fetchAccountDetails = async (userId) => {
    try {
      const res = await fetch("https://back-5es4.onrender.com/account/account-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setAccountDetails(data.data[0]);
      setShowModal(true);
    } catch (error) {
      alert("Failed to fetch account details");
    }
  };

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
