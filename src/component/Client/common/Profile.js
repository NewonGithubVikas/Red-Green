import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState({ user_id: "N/A", email: "not_available@example.com", mobile: "0000000000" });
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("No token provided. Unable to fetch user data.");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User data:", data);

        if (data.responseCode === 200) {
          setUser({
            user_id: data.responseResult._id || "N/A",
            email: data.responseResult.email || "not_available@example.com",
            mobile: data.responseResult.mobile || "0000000000",
          });
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <FaUserCircle className="text-primary mb-3" size={60} />
          <h2 className="card-title mb-3">User Profile</h2>
          <ul className="list-group list-group-flush text-start">
            <li className="list-group-item"><strong>User ID:</strong> {user.user_id}</li>
            <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
            <li className="list-group-item"><strong>Mobile:</strong> {user.mobile}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
