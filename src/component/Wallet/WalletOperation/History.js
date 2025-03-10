import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
<<<<<<< HEAD

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId } = useContext(AuthContext);
=======
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const History = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId, token } = useContext(AuthContext); // Get token from AuthContext
>>>>>>> c361654 (updated feature Number Game and other thing)

  // Extract the `show` prop from the location's state
  const location = useLocation();
  const { show } = location.state || { show: "Withdraw" }; // Default to "Withdraw" if no prop is passed

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const apiEndpoint =
          show === "Withdraw"
<<<<<<< HEAD
            ? "https://back-5es4.onrender.com/wallet/withdraw-history"
            : "https://back-5es4.onrender.com/wallet/credit-history";
=======
            ? `${API_BASE_URL}/wallet/withdraw-history`
            : `${API_BASE_URL}/wallet/credit-history`;
>>>>>>> c361654 (updated feature Number Game and other thing)

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
<<<<<<< HEAD
=======
            "Authorization": `Bearer ${token}`, // Include authentication token
>>>>>>> c361654 (updated feature Number Game and other thing)
          },
          body: JSON.stringify({ id: userId }),
        });

        const result = await response.json();
        console.log(`All ${show} transactions:`, result);

<<<<<<< HEAD
        // Handle the response
        if (result.responseCode === 200) {
=======
        if (response.ok) {
>>>>>>> c361654 (updated feature Number Game and other thing)
          setTransactions(result.transactions);
        } else {
          console.error("Error fetching history:", result.responseMessage);
          alert(result.responseMessage || `Failed to fetch ${show} transaction history.`);
        }
      } catch (error) {
        console.error("There was an error:", error);
        alert("An error occurred while fetching transaction history. Please try again later.");
      }
    };

<<<<<<< HEAD
    fetchHistory();
  }, [show, userId]);
=======
    if (userId && token) {
      fetchHistory();
    }
  }, [show, userId, token]);
>>>>>>> c361654 (updated feature Number Game and other thing)

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-dark text-white text-center">
<<<<<<< HEAD
              <h4>{show}  History</h4>
=======
              <h4>{show} History</h4>
>>>>>>> c361654 (updated feature Number Game and other thing)
            </div>
            <div className="card-body">
              {transactions.length > 0 ? (
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Amount (USD)</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={transaction._id}>
                        <td>{index + 1}</td>
                        <td>${transaction.amount.toFixed(2)}</td>
                        <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">No transactions available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
