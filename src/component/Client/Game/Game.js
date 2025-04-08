import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PlaceBidModal from "./PlaceBet";
import LastGameHistory from "./LastGameHistory";
import NumberDisplay from "../../NumberGame/NumberC";
import { AuthContext } from "../../../Context/AuthContext";
import { WalletContext } from "../../../Context/WalletContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Game() {
  const navigate = useNavigate();
  const {  token } = useContext(AuthContext);
  const { walletBalance, updateWalletBalance } = useContext(WalletContext);

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [currTime, setCurrTime] = useState(59);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    document.title = "Game";
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  useEffect(() => {
    async function fetchTime() {
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/game/timer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
       
        if (response.ok) {
          const data = await response.json();
          console.log("timer ", data.remainTime);
          if (data?.remainTime !== undefined) {
            setCurrTime(data.remainTime);
          }
        } else if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      } catch (err) {
        console.error("Timer fetch error:", err);
      }
    }

    fetchTime();
    const interval = setInterval(fetchTime, 1000);
    return () => clearInterval(interval);
  }, [token, navigate]);

  useEffect(() => {
    setIsAlertOpen(currTime <= 5 && currTime > 0);
  }, [currTime]);

  const openModal = (color) => {
    if (currTime > 5) {
      setSelectedColor(color);
      setIsModalOpen(true);
    } else {
      setIsAlertOpen(true);
    }
  };

  if (!token) return null;

  return (
    <div className="container py-5">
      <div
        className="card shadow-lg border-primary rounded p-4 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-success m-0">
            ₹{loading ? "..." : Number(walletBalance || 0).toFixed(2)}
          </h4>
          <h5 className="text-primary m-0">Timer: {currTime}s</h5>
        </div>

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

        <NumberDisplay currTime={currTime} />

        <div className="history-section mt-4">
          
          <LastGameHistory currTime={currTime} />
        </div>
      </div>

      <PlaceBidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedColor={selectedColor}
        onConfirm={() => {
          updateWalletBalance(); // ✅ fixed here
        }}
      />

      {isAlertOpen && (
        <div
          className="modal fade show d-block"
          role="dialog"
          aria-modal="true"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Betting Closed</h5>
              </div>
              <div className="modal-body">
                <p>Betting is closed for this round. Please wait for the next round.</p>
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
