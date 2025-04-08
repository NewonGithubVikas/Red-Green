import React, { useEffect } from "react";
import {
  FaIdCard, FaSignOutAlt, FaUser, FaWallet,
  FaGift, FaHeadset, FaLock, FaMoneyCheckAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "setting";

    // Redirect if token not found
    if (!token) {
      navigate("/signin");
    }
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center vh-100 bg-light">
      <div className="list-group mt-4 w-100 px-3" style={{ maxWidth: "500px" }}>
        <Link to="/profile" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaIdCard className="me-3 text-primary" size={24} />
          <span className="fs-5">User Profile</span>
        </Link>
        <Link to="/bet-history" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaMoneyCheckAlt className="me-3 text-primary" size={24} />
          <span className="fs-5">Bet History</span>
        </Link>
        <Link to="/add-account" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaUser className="me-3 text-primary" size={24} />
          <span className="fs-5">Account Details</span>
        </Link>
        <Link to="/user-wallet" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaWallet className="me-3 text-success" size={24} />
          <span className="fs-5">Wallet</span>
        </Link>
        <Link to="/refer-earn" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaGift className="me-3 text-warning" size={24} />
          <span className="fs-5">Refer & Earn</span>
        </Link>
        <Link to="/update-password" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaLock className="me-3 text-secondary" size={24} />
          <span className="fs-5">Password Reset</span>
        </Link>
        <Link to="/customer-support" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaHeadset className="me-3 text-info" size={24} />
          <span className="fs-5">Customer Support</span>
        </Link>
        <Link to="/pp" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaLock className="me-3 text-secondary" size={24} />
          <span className="fs-5">Privacy & Policy</span>
        </Link>

        {/* Logout only if token exists */}
        {token && (
          <button
            onClick={handleLogout}
            className="list-group-item list-group-item-action d-flex align-items-center py-3 text-danger fw-bold bg-transparent border-0"
          >
            <FaSignOutAlt className="me-3" size={24} />
            <span className="fs-5">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
