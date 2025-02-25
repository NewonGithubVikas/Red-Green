import React from "react";
import { Link } from "react-router-dom";
import DashboardChart from "./DashboardChart";
import { FaBars } from "react-icons/fa";

function AdDashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Toggle Button for Mobile */}
        <nav className="navbar navbar-dark bg-dark d-md-none">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FaBars />
            </button>
          </div>
        </nav>

        {/* Sidebar (Collapsible on Mobile, Always Visible on Large Screens) */}
        <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100">
          <div className="collapse d-md-block" id="sidebarMenu">
            <h4 className="text-center py-3">Admin Panel</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/add-fund">Balance Manager</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/add-fund-request">Add Request</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/withdraw-fund-request">Withdraw Request</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/user-status">User Status</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/total-credit">Today's Total Credit</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/withdraw-command">Total Withdraw</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="#">Game Outcome</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          
          <DashboardChart />
        </main>
      </div>
    </div>
  );
}

export default AdDashboard;
