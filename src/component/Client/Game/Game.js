import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceBidModal from "./PlaceBet";
import LastGameHistory from "./LastGameHistory";
import Number from "../../NumberGame/Number";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export default function Game() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [currTime, setCurrTime] = useState(59);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
   useEffect(()=>{
      document.title = "game"
    },[]);
  useEffect(() => {
    async function fetchTime() {
      if (!token) return; // Ensure the token is present before making a request

      try {
        const response = await fetch(`${API_BASE_URL}/game/timer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token in headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.remainTime) {
            setCurrTime(data.remainTime);
          }
        } else if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin"); // Redirect to login if token is invalid
        } else {
          console.error("Failed to fetch the time from the server.");
        }
      } catch (error) {
        console.error("Error fetching the time:", error);
      }
    }

    fetchTime();
    const interval = setInterval(fetchTime, 1000);
    return () => clearInterval(interval);
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  // Monitor currTime for popup
  useEffect(() => {
    if (currTime <= 5 && currTime > 0) {
      setIsAlertOpen(true);
    } else {
      setIsAlertOpen(false);
    }
  }, [currTime]);

  const openModal = (color) => {
    if (currTime > 5) {
      setSelectedColor(color);
      setIsModalOpen(true);
    } else {
      setIsAlertOpen(true);
    }
  };

  const placeBid = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/game/place-bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Token included
        },
        body: JSON.stringify({ color: selectedColor }),
      });

      if (!response.ok) {
        throw new Error("Failed to place bid. Try again.");
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  if (!token) return null;

  return (
    <div className="container py-4">
      <div
        className="card shadow-lg border-primary rounded p-4 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="text-center text-primary mb-4">
          Game Timer: {currTime}s
        </h1>

        <div className="d-flex justify-content-center mb-4">
          <button
            type="button"
            className="btn btn-success w-50 me-3"
            onClick={() => openModal("Green")}
            disabled={currTime <= 5}
          >
            Green
          </button>
          <button
            type="button"
            className="btn btn-danger w-50"
            onClick={() => openModal("Red")}
            disabled={currTime <= 5}
          >
            Red
          </button>
        </div>
        <Number currTime={currTime}/>
        <div className="history-section mt-4">
          <h3 className="text-center text-secondary mb-3">Last Game History</h3>
          <LastGameHistory currTime={currTime}/>
        </div>
      </div>

      {/* Modal Component */}
      <PlaceBidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedColor={selectedColor}
        onConfirm={placeBid}
      />

      {/* Alert Popup */}
      {isAlertOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Betting Closed</h5>
              </div>
              <div className="modal-body">
                <p>
                  Betting is closed for this round. Please wait for the next
                  round to place your bet.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsAlertOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
