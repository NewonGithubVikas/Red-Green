import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { FaUserCircle, FaGamepad, FaWallet, FaHome, FaCog, FaSignInAlt } from "react-icons/fa";
import { MdHelp, MdPolicy } from "react-icons/md";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("token"));

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop / Tablet Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-none d-md-flex">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="text-danger">Red</span>-
            <span className="text-success">Green</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {loggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/game">Game</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-wallet">Wallet</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/customer-support">Help</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pp">Privacy & Policy</Link>
              </li>
              {loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">Settings</Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav">
              {loggedIn ? (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle d-flex align-items-center bg-transparent border-0"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <FaUserCircle size={24} className="me-2 text-danger" />
                    Profile
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">View Profile</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="btn btn-success" to="/signin">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="d-md-none bg-light border-top position-fixed bottom-0 w-100">
        <div className="d-flex justify-content-around py-2">
          <Link to="/" className={`text-center ${isActive("/") ? "text-danger" : "text-secondary"}`}>
            <FaHome size={20} />
            <div style={{ fontSize: "0.7rem" }}>Home</div>
          </Link>

          {loggedIn && (
            <>
              <Link to="/game" className={`text-center ${isActive("/game") ? "text-danger" : "text-secondary"}`}>
                <FaGamepad size={20} />
                <div style={{ fontSize: "0.7rem" }}>Game</div>
              </Link>

              <Link to="/user-wallet" className={`text-center ${isActive("/user-wallet") ? "text-danger" : "text-secondary"}`}>
                <FaWallet size={20} />
                <div style={{ fontSize: "0.7rem" }}>Wallet</div>
              </Link>
            </>
          )}

          {/* <Link to="/customer-support" className={`text-center ${isActive("/customer-support") ? "text-danger" : "text-secondary"}`}>
            <MdHelp size={20} />
            <div style={{ fontSize: "0.7rem" }}>Help</div>
          </Link> */}

          {loggedIn ? (
            <Link to="/settings" className={`text-center ${isActive("/settings") ? "text-danger" : "text-secondary"}`}>
              <FaCog size={20} />
              <div style={{ fontSize: "0.7rem" }}>Settings</div>
            </Link>
          ) : (
            <Link to="/signin" className={`text-center ${isActive("/signin") ? "text-danger" : "text-secondary"}`}>
              <FaSignInAlt size={20} />
              <div style={{ fontSize: "0.7rem" }}>Login</div>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
