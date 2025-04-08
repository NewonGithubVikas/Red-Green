import React, { useEffect, useState } from "react";

import CurrentBetHistory from "../common/CurrentBetHistory";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LastGameHistory = ({ currTime }) => {
  const [history, setHistory] = useState([]); // Complete history fetched from the API
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("currentGame"); // Track which tab is active
  const itemsPerPage = 4; // Number of transactions per page

  useEffect(() => {
    document.title = "Game-History";
  }, []);

  const fetchLastGameHistory = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/game/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setHistory(data.result || []);
      } else {
        setError(data.responseMessage || "Failed to fetch history.");
      }
    } catch (err) {
      setError("An error occurred while fetching history.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLastGameHistory();
  }, []);

  useEffect(() => {
    if (currTime === 5) {
      const timer = setTimeout(() => {
        fetchLastGameHistory();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [currTime]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = history.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return <p className="text-center text-muted">Loading history...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (history.length === 0) {
    return <p className="text-center text-muted">No game history available.</p>;
  }

  return (
    <div className="container mt-4">
      {/* Tab Navigation */}
      <div className="d-flex justify-content-between mb-3">
        <button
          className={`btn ${activeTab === "currentGame" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("currentGame")}
        >
          Current Game
        </button>
        <button
          className={`btn ${activeTab === "myBet" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("myBet")}
        >
          My Bet
        </button>
      </div>

      {/* Render Components Based on Active Tab */}
      {activeTab === "currentGame" ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Winner Color</th>
                <th>Winner Number</th>
                <th>Total Bet (₹)</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((game, index) => (
                <tr key={index}>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: game.winnerColor === "red" ? "red" : "green",
                      }}
                      title={game.winnerColor}
                    ></span>
                  </td>
                  <td>{game.winnerNumber || "N/A"}</td>
                  <td>₹{(game.totalAmount.toFixed(2) * 10).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button className="btn btn-secondary" onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <CurrentBetHistory /> // Renders the MyBetHistory component when "My Bet" is clicked
      )}
    </div>
  );
};

export default LastGameHistory;
