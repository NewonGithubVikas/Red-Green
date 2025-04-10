import React, { useState, useEffect } from "react";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TotalCredit = () => {
  const [transactions, setTransactions] = useState([]); // List of today's transactions
  const [totalMoney, setTotalMoney] = useState(0); // Total money credited today
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   useEffect(()=>{
      document.title = "Total-Credit"
    },[]);
  // Fetch total credit history from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          console.error("No token found");
          setError("Unauthorized: No token provided.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/wallet/total-credit-history`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.responseCode === 200) {
          setTransactions(data.transactions || []);
          setTotalMoney(data.totalCredit || 0);
        } else {
          setError(data.responseMessage);
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Total Money Section */}
      <div className="card mb-4">
        <div className="card-body text-center">
          <h2>Total Money Credited Today</h2>
          {loading ? (
            <p className="text-primary">Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <p className="display-4 text-success">${totalMoney}</p>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card mb-4">
        <div className="card-body">
          <h3>Today's Transactions</h3>
          {loading ? (
            <p className="text-primary">Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : transactions.length === 0 ? (
            <p className="text-warning">No transactions found.</p>
          ) : (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.user_id}</td>
                    <td>${transaction.amount}</td>
                    <td>{new Date(transaction.transaction_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* User Management Section */}
      <div className="card">
        <div className="card-body">
          <h3>User Management</h3>
          <p>Admin functionality to manage users and their accounts can be implemented here.</p>
          <ul>
            <li>View and edit user details</li>
            <li>Deactivate or delete user accounts</li>
            <li>Manually adjust account balances</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TotalCredit;
