import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BetHistory = () => {
  const { userId, token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   useEffect(()=>{
      document.title = "Bet-History"
    },[]);
  useEffect(() => {
    // Redirect to login if token is missing
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/game/past-bet-history`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: userId }),
        });

        // If token is invalid or expired, redirect to login
        if (response.status === 401 || response.status === 403) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        console.log("Your response:", data.result);

        if (response.ok) {
          //setHistory(data.result || []);
          setHistory((data.result || []).reverse());
        } else {
          console.error("Error fetching bet history:", data.responseMessage);
        }
      } catch (error) {
        console.error("Error fetching bet history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, token, navigate]);

  // Calculate total win and lose amounts
  let totalWinAmount = 0;
  let totalLoseAmount = 0;

  history.forEach((bet) => {
    let winnings = 0;

    if (bet.user_choice) {
      if (bet.user_choice === bet.winner_color) {
        winnings = bet.user_amount * 1.9;
        totalWinAmount += winnings;
      } else {
        totalLoseAmount += bet.user_amount;
      }
    } else if (bet.user_choice_number !== null) {
      if (bet.user_choice_number === bet.winner_number) {
        winnings = bet.user_amount * 5;
        totalWinAmount += winnings;
      } else {
        totalLoseAmount += bet.user_amount;
      }
    }
  });

  return (
    <div className="card p-4 w-80 text-center shadow-lg rounded-2">
      <h2 className="h4 mb-4">Bet History</h2>

      {/* Total Win/Loss Summary */}
      <div className="mb-3">
        <div className="d-flex justify-content-between">
          <strong className="text-success">Total Win Amount:</strong>
          <span className="text-success">${totalWinAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <strong className="text-danger">Total Lose Amount:</strong>
          <span className="text-danger">${totalLoseAmount.toFixed(2)}</span>
        </div>
      </div>

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : history.length > 0 ? (
        <div className="list-group">
          {history.map((bet) => {
            let result = "Lose";
            let winnings = 0;

            if (bet.user_choice) {
              if (bet.user_choice === bet.winner_color) {
                result = "Win";
                winnings = bet.user_amount * 1.9;
              }
            } else if (bet.user_choice_number !== null) {
              if (bet.user_choice_number === bet.winner_number) {
                result = "Win";
                winnings = bet.user_amount * 5;
              }
            }

            return (
              <div key={bet._id} className="list-group-item d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <strong>Game ID:</strong> <span>{bet.game_id}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Winner Color:</strong> <span>{bet.winner_color || "N/A"}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Your Choice:</strong> <span>{bet.user_choice || "N/A"}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Your Bet Amount:</strong> <span>${bet.user_amount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Winner Number:</strong> <span>{bet.winner_number ?? "N/A"}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Your Choice Number:</strong> <span>{bet.user_choice_number ?? "N/A"}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Result:</strong>{" "}
                  <span className={result === "Win" ? "text-success" : "text-danger"}>
                    {result}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Winning Amount:</strong> <span>${winnings.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted">No bet history available.</p>
      )}
    </div>
  );
};

export default BetHistory;
