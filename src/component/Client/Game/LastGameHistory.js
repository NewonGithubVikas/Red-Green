import React, { useEffect, useState } from "react";

const LastGameHistory = () => {
  const [history, setHistory] = useState([]); // Complete history fetched from the API
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5; // Number of transactions per page

  useEffect(() => {
    const fetchLastGameHistory = async () => {
      try {
        const response = await fetch("https://back-5es4.onrender.com/game/history");
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

    fetchLastGameHistory();
  }, []);

  // Calculate the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = history.slice(startIndex, startIndex + itemsPerPage);

  // Calculate the total number of pages
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
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Winner Color</th>
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
                    backgroundColor:
                      game.winnerColor === "red" ? "red" : "green",
                  }}
                  title={game.winnerColor}
                ></span>
              </td>
              <td>₹{(game.totalAmount.toFixed(2) * 10).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LastGameHistory;
