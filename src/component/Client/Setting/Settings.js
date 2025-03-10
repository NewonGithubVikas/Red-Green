import React from "react";
import { FaUser, FaWallet, FaGift, FaHeadset, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
// , FaFileAlt , FaSignOutAlt
const Settings = () => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center vh-100 bg-light">
      {/* <h2 className="text-center fw-bold mt-3">Settings</h2> */}
      <div className="list-group mt-4 w-100 px-3" style={{ maxWidth: "500px" }}>
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
<<<<<<< HEAD
=======
        <Link to="/update-password" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaLock className="me-3 text-secondary" size={24} /> 
          <span className="fs-5">Password Reset</span>
        </Link>
>>>>>>> c361654 (updated feature Number Game and other thing)
        <Link to="/customer-support" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaHeadset className="me-3 text-info" size={24} /> 
          <span className="fs-5">Customer Support</span>
        </Link>
        <Link to="/pp" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaLock className="me-3 text-secondary" size={24} /> 
          <span className="fs-5">Privacy & Policy</span>
        </Link>
        {/* <Link to="#terms-conditions" className="list-group-item list-group-item-action d-flex align-items-center py-3">
          <FaFileAlt className="me-3 text-dark" size={24} /> 
          <span className="fs-5">Terms & Conditions</span>
        </Link> */}
        {/* <Link to="#logout" className="list-group-item list-group-item-action d-flex align-items-center py-3 text-danger fw-bold">
          <FaSignOutAlt className="me-3" size={24} /> 
          <span className="fs-5">Logout</span>
        </Link> */}
      </div>
    </div>
  );
};

export default Settings;
