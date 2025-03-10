import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
<<<<<<< HEAD

=======
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
>>>>>>> c361654 (updated feature Number Game and other thing)
export default function Amount() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
<<<<<<< HEAD
  const [walletBalance, setWalletBalance] = useState(0); // Wallet balance state
  // const [id, setId] = useState("677d67d4d576653a1969d8a5"); // User ID
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message state
  console.log("user id =>", userId);
  // Redirect to /signin if token is not set
=======
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

>>>>>>> c361654 (updated feature Number Game and other thing)
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!userId) return; // Wait until userId is available

      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/wallet/balance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Added Authorization token
          },
          body: JSON.stringify({ id: userId }),
>>>>>>> c361654 (updated feature Number Game and other thing)
        });

        if (response.ok) {
          const result = await response.json();
<<<<<<< HEAD
          setWalletBalance(result.Balance); // Update wallet balance
          setError(""); // Clear any previous errors
=======
          console.log("Wallet balance fetched:", result);
          setWalletBalance(result.Balance);
          setError("");
>>>>>>> c361654 (updated feature Number Game and other thing)
        } else {
          setError("Failed to fetch wallet balance");
        }
      } catch (error) {
<<<<<<< HEAD
        setError("Something went wrong while fetching the balance");
        console.error("Error fetching wallet balance:", error);
      } finally {
        setLoading(false); // Stop loading
=======
        console.error("Error fetching wallet balance:", error);
        setError("Something went wrong while fetching the balance");
      } finally {
        setLoading(false);
>>>>>>> c361654 (updated feature Number Game and other thing)
      }
    };

    fetchWalletBalance();
<<<<<<< HEAD
  }, [userId]);

  // Render a placeholder or null to avoid rendering unnecessary content before redirect
=======
  }, [userId, token]);

>>>>>>> c361654 (updated feature Number Game and other thing)
  if (!token) {
    return null;
  }

  return (
    <div className="container border border-primary w-100 w-md-50 mt-5 p-4 rounded shadow-sm bg-light">
<<<<<<< HEAD
      {/* Wallet Balance */}
      <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        <h1>Wallet</h1>
        <div
          className=" d-flex justify-content-center align-items-center bg-white"
=======
      <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        <h1>Wallet</h1>
        <div
          className="d-flex justify-content-center align-items-center bg-white"
>>>>>>> c361654 (updated feature Number Game and other thing)
          style={{ height: "150px", width: "250px" }}
        >
          <div>
            {loading ? (
              <h1 className="text-muted">Loading...</h1>
<<<<<<< HEAD
            ) : (
              <h1 className="text-success fw-bold mb-0">
                {walletBalance}
                <i className="bi bi-currency-rupee"></i>
              </h1>
=======
            ) : walletBalance !== null ? (
              <h1 className="text-success fw-bold mb-0">
                {walletBalance} <i className="bi bi-currency-rupee"></i>
              </h1>
            ) : (
              <h1 className="text-danger">Balance Unavailable</h1>
>>>>>>> c361654 (updated feature Number Game and other thing)
            )}
          </div>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="text-center mb-4">
        <Link className="btn btn-success me-3 px-4 py-2 fw-bold shadow-sm" to="/add">
          Add
        </Link>

        <Link className="btn btn-danger px-4 py-2 fw-bold shadow-sm" to="/withdraw">
>>>>>>> c361654 (updated feature Number Game and other thing)
          Withdraw
        </Link>
      </div>

<<<<<<< HEAD
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
=======
      <div className="row text-center mt-4 g-3">
        {[
          { to: "/add", icon: "bi bi-wallet2", label: "Deposit" },
          { to: "/withdraw", icon: "bi bi-cash-coin", label: "Withdraw" },
          { to: "/history", icon: "bi bi-clock-history", label: "Deposit History", state: { show: "Depo" } },
          { to: "/history", icon: "bi bi-file-text", label: "Withdraw History", state: { show: "Withdraw" } },
        ].map(({ to, icon, label, state }, index) => (
          <div key={index} className="col-12 col-md-6">
            <div className="border border-danger rounded p-3 d-flex align-items-center justify-content-center">
              <i className={`${icon} me-2 fs-4 text-primary`}></i>
              <Link to={to} state={state}>
                <span className="fw-bold">{label}</span>
              </Link>
            </div>
          </div>
        ))}
>>>>>>> c361654 (updated feature Number Game and other thing)
      </div>
    </div>
  );
}
