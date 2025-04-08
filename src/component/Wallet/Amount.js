import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export default function Amount() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

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
          // body: JSON.stringify({ id: userId }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Wallet balance fetched:", result);
          setWalletBalance(result.Balance);
          setError("");
        } else {
          setError("Failed to fetch wallet balance");
        }
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        setError("Something went wrong while fetching the balance");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();
  }, [userId, token]);

  if (!token) {
    return null;
  }

  return (
    <div className="container border border-primary w-100 w-md-50 mt-5 p-4 rounded shadow-sm bg-light">
      <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        <h1>Wallet</h1>
        <div
          className="d-flex justify-content-center align-items-center bg-white"
          style={{ height: "150px", width: "250px" }}
        >
          <div>
            {loading ? (
              <h1 className="text-muted">Loading...</h1>
            ) : walletBalance !== null ? (
              <h1 className="text-success fw-bold mb-0">
                {walletBalance} <i className="bi bi-currency-rupee"></i>
              </h1>
            ) : (
              <h1 className="text-danger">Balance Unavailable</h1>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="text-center mb-4">
        <Link className="btn btn-success me-3 px-4 py-2 fw-bold shadow-sm" to="/add">
          Add
        </Link>

        <Link className="btn btn-danger px-4 py-2 fw-bold shadow-sm" to="/withdraw">
          Withdraw
        </Link>
      </div>

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
      </div>
    </div>
  );
}
