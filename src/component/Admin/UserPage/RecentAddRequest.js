import React, { useState, useEffect } from "react";

const RecentAddRequest = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://back-5es4.onrender.com/admin/check-add-request");
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data) && data.length > 0) {
          setLatestTransactions(data);
        } else if (data.transactions && Array.isArray(data.transactions) && data.transactions.length > 0) {
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

    fetchLatestTransactions();
  }, []);

  const handleAddMoney = async (userId, amount) => {
    try {
      const response = await fetch("https://back-5es4.onrender.com/wallet/addbalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance: amount, id: userId }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(`Successfully added $${amount} to user ${userId}.`);
      } else {
        alert(result.message || "Failed to add money.");
      }
    } catch (error) {
      console.error("Error adding money:", error);
      alert("An error occurred while adding money.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Recent Add Request List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : latestTransactions.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Transaction ID</th>
              <th>User ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {latestTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.transaction_id || "N/A"}</td>
                <td>{transaction.userId || "N/A"}</td>
                <td>{transaction.amount || "N/A"}</td>
                <td>{transaction.status || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddMoney(transaction.userId, transaction.amount)}
                  >
                    Add Money
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending transactions found.</p>
      )}
    </div>
  );
};

export default RecentAddRequest;
