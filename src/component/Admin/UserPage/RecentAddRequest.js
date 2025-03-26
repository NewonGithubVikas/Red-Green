import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const RecentAddRequest = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
   useEffect(()=>{
      document.title = "Add-Request"
    },[]);
  useEffect(() => {
    const fetchLatestTransactions = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized! Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/admin/check-add-request`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

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
        setError(err.message || "Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTransactions();
  }, [navigate]);

  const handleAddMoney = async (userId, amount) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/wallet/addbalance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ balance: amount, id: userId }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Successfully added $${amount} to user ${userId}.`);
        setLatestTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.userId !== userId)
        );
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
