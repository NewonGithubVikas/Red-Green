import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../Context/AuthContext";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function PlaceBet({ isOpen, onClose, selectedColor, onConfirm }) {
  const [betAmount, setBetAmount] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Bet-Place";
  }, []);

  if (!isOpen) return null;

  const modalHeaderStyle = {
    backgroundColor: selectedColor === "Green" ? "#28a745" : "#dc3545",
    color: "white",
  };

  const handleMultiplierClick = (value) => {
    setMultiplier(value);
    const updatedAmount = betAmount ? parseFloat(betAmount) * value : "";
    setBetAmount(updatedAmount);
  };

  const placeBet = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/game/bet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          user_choice: selectedColor,
          user_amount: betAmount,
        }),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok && result.responseCode === 200) {
        console.log("Your bet was placed successfully!", result.responseMessage);

        onConfirm(betAmount, multiplier); // 🔁 Notify parent for wallet refresh
        onClose();
      } else if (result.responseCode === 400) {
        alert("Insufficient balance in wallet. Please try again with a lower amount.");
      } else {
        console.error("Failed to place bet. Error:", result.responseMessage || "Unknown error");
        setErrorMessage(result.responseMessage || "Failed to place the bet.");
      }
    } catch (error) {
      console.error("An error occurred while placing the bet:", error.message);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header" style={modalHeaderStyle}>
            <h5 className="modal-title">Confirm Your Bid ({selectedColor})</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="text-center mb-3">Are you sure you want to place a bid on:</p>
            <form className="mb-4">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter your amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
            </form>
            <div className="d-flex flex-wrap justify-content-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`btn mx-2 my-1 ${
                    multiplier === value ? "btn-primary" : "btn-outline-primary"
                  }`}
                  style={{ minWidth: "60px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMultiplierClick(value);
                  }}
                >
                  {value}x
                </button>
              ))}
            </div>
            {errorMessage && (
              <div className="alert alert-danger mt-3 text-center" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={placeBet}
              disabled={!betAmount}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
