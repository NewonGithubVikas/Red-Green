import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function CurrentBetHistory() {
  const [betHistory, setBetHistory] = useState([]); // Ensure it starts as an array
  const { userId, token } = useContext(AuthContext);

  // Function to fetch bet history
  const fetchBetHistory = async () => {
    try {
      const result = await fetch(`${API_BASE_URL}/game/curr-bet-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify({ id: userId }), // Send user_id in body if required
      });

      const data = await result.json(); // Wait for the JSON response
      console.log("your data", data.result);
      
      // Ensure data is an array and set the state
      setBetHistory(Array.isArray(data.result) ? data.result : []);
    } catch (error) {
      console.error("Error fetching bet history:", error);
      setBetHistory([]); // If an error occurs, ensure it's an empty array
    }
  };

  // Fetch bet history when component mounts or userId/token changes
  useEffect(() => {
    fetchBetHistory();
  }, [userId, token]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Current Bet History</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Game ID</th>
            <th>User Amount</th>
            <th>User Choice </th>
          </tr>
        </thead>
        <tbody>
          {betHistory.length > 0 ? (
            betHistory.map((bet, index) => (
              <tr key={index}>
                <td>{bet.game_id}</td>
                <td>{bet.user_amount}</td>
                <td>{bet.user_choice_number ? bet.user_choice_number : bet.user_choice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentBetHistory;
