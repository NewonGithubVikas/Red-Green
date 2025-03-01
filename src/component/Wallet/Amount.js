import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Amount() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [walletBalance, setWalletBalance] = useState(0); // Wallet balance state
  // const [id, setId] = useState("677d67d4d576653a1969d8a5"); // User ID
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message state
  console.log("user id =>", userId);
  // Redirect to /signin if token is not set
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  // Fetch wallet balance when the component loads or id changes
  useEffect(() => {
    const fetchWalletBalance = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("https://back-5es4.onrender.com/wallet/balance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }), // Send the user ID
        });

        if (response.ok) {
          const result = await response.json();
          setWalletBalance(result.Balance); // Update wallet balance
          setError(""); // Clear any previous errors
        } else {
          setError("Failed to fetch wallet balance");
        }
      } catch (error) {
        setError("Something went wrong while fetching the balance");
        console.error("Error fetching wallet balance:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchWalletBalance();
  }, [userId]);

  // Render a placeholder or null to avoid rendering unnecessary content before redirect
  if (!token) {
    return null;
  }

  return (
    <div className="container border border-primary w-100 w-md-50 mt-5 p-4 rounded shadow-sm bg-light">
      {/* Wallet Balance */}
      <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        <h1>Wallet</h1>
        <div
          className=" d-flex justify-content-center align-items-center bg-white"
          style={{ height: "150px", width: "250px" }}
        >
          <div>
            {loading ? (
              <h1 className="text-muted">Loading...</h1>
            ) : (
              <h1 className="text-success fw-bold mb-0">
                {walletBalance}
                <i className="bi bi-currency-rupee"></i>
              </h1>
            )}
          </div>
        </div>
      </div>

      {/* Display error message if any */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Buttons */}
      <div className="text-center mb-4">
        <Link
          className="btn btn-success me-3 px-4 py-2 fw-bold shadow-sm"
          to="/add"
        >
          Add
        </Link>

        <Link
          className="btn btn-danger px-4 py-2 fw-bold shadow-sm"
          to="/withdraw"
        >
          Withdraw
        </Link>
      </div>

      {/* Action Buttons Section */}
      <div className="row text-center mt-4 g-3">
        <div className="col-12 col-md-6">
          <div className="border border-danger rounded p-3 d-flex align-items-center justify-content-center">
            <i className="bi bi-wallet2 me-2 fs-4 text-primary"></i>
            <Link to="/add">
              <span className="fw-bold">Deposit</span>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="border border-danger rounded p-3 d-flex align-items-center justify-content-center">
            <i className="bi bi-cash-coin me-2 fs-4 text-primary"></i>
            <Link to="/withdraw">
              <span className="fw-bold">Withdraw</span>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="border border-danger rounded p-3 d-flex align-items-center justify-content-center">
            <i className="bi bi-clock-history me-2 fs-4 text-primary"></i>
            <Link to="/history" state={{ show: "Depo" }}>
              <span className="fw-bold">Deposit History</span>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="border border-danger rounded p-3 d-flex align-items-center justify-content-center">
            <i className="bi bi-file-text me-2 fs-4 text-primary"></i>
            <Link to="/history" state={{ show: "Withdraw" }}>
              <span className="fw-bold">Withdraw History</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
