import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; // Import Auth Context
import { FaBars } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdDashboard() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalCredit: 0,
    totalWithdraw: 0,
  });

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/admin/dashboard-stats`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          console.error("Unauthorized: Invalid or expired token");
          logout();
          navigate("/login");
          return;
        }

        const data = await response.json();
        setDashboardData({
          totalCredit: data.totalCredit || 0,
          totalWithdraw: data.totalWithdraw || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, [logout, navigate]);

  // Bar Chart Data
  const barData = {
    labels: ["Credit (Today)", "Withdraw (Today)"],
    datasets: [
      {
        label: "Amount in Rupees",
        data: [dashboardData.totalCredit, dashboardData.totalWithdraw],
        backgroundColor: ["#28a745", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  // Logout function
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100 collapse d-md-block" id="sidebarMenu">
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
            <li className="nav-item">
              <button className="nav-link text-white btn btn-danger w-100 mt-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="container mt-4">
            <div className="row">
              {/* Statistics */}
              <div className="col-md-6 mb-3">
                <div className="card bg-success text-white p-3">
                  <h5>Today's Total Credit</h5>
                  <h2>{dashboardData.totalCredit} ₹</h2>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card bg-danger text-white p-3">
                  <h5>Today's Total Withdraw</h5>
                  <h2>{dashboardData.totalWithdraw} ₹</h2>
                </div>
              </div>

              {/* Bar Chart Section */}
              <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
                <div className="card p-3">
                  <h5 className="mb-3">Today's Credit & Withdraw</h5>
                  <div className="chart-container">
                    <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bootstrap-Only Responsive CSS */}
      <style>
        {`
          .chart-container {
            width: 100%;
            height: 300px;
          }

          @media (max-width: 768px) {
            #sidebarMenu {
              position: fixed;
              width: 250px;
              height: 100vh;
              background: #343a40;
              z-index: 1000;
              left: -250px;
              transition: left 0.3s ease;
            }

            #sidebarMenu.show {
              left: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default AdDashboard;
