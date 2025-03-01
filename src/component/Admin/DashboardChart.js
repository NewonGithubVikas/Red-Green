import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DashboardChart = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCredit: 0,
    totalWithdraw: 0,
   
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("https://back-5es4.onrender.com/admin/dashboard-stats");
        const data = await response.json();
        console.log(data);
        setDashboardData({
          totalCredit: data.totalCredit || 0,
          totalWithdraw: data.totalWithdraw || 0,
         
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Bar Chart Data (Credit & Withdraw)
  const barData = {
    labels: ["Credit (Today)", "Withdraw (Today)"],
    datasets: [
      {
        label: "Amount Rupees",
        data: [dashboardData.totalCredit, dashboardData.totalWithdraw],
        backgroundColor: ["#4CAF50", "#FF5733"],
        borderWidth: 1,
      },
    ],
  };



  return (
    <div className="container mt-4">
     

      <div className="row">
        {/* Bar Chart Section */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="mb-3">Today's Credit & Withdraw</h5>
            <Bar data={barData} />
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default DashboardChart;



