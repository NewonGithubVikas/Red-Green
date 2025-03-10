import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Number = ({currTime}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const {userId,token} = useContext(AuthContext);
  const placebet = async()=>{
    try {
      // alert("successfully placed bet");
      const response = await fetch(`${API_BASE_URL}/game/number-bet`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          user_number:selectedNumber,
          user_amount: betAmount,
        })      });
      if(response.ok){
        console.log("your response",response);
        alert("successfully placed bet",response);
        handleClose();
      }
      else{
        console.log("there is something error......");
      }
      console.log("your response",response);
    } catch (error) {
      console.log("there is something error from the user side");
    }
    
  }
  const handleClick = (num) => {
    setSelectedNumber(num);
    setIsModalOpen(true);
  };

  const handleMultiplierClick = (value) => {
    setMultiplier(value);
    const updatedAmount = betAmount ? parseFloat(betAmount) * value : "";
    setBetAmount(updatedAmount);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setBetAmount("");
    setMultiplier(1);
  };

  const colors = [
    "btn-danger", "btn-success", "btn-primary", "btn-warning", "btn-info", "btn-secondary", "btn-dark", "btn-success", "btn-danger"
  ];

  return (
    <div className="container text-center mt-4">    
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {[...Array(9)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn ${colors[index]} btn-lg rounded-circle`}
            style={{ width: "60px", height: "60px" }}
            onClick={() => handleClick(index + 1)}
            disabled = {currTime <= 5}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Your Bet - Number {selectedNumber}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Enter your amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      className={`btn ${multiplier === value ? "btn-primary" : "btn-outline-primary"}`}
                      onClick={() => handleMultiplierClick(value)}
                    >
                      {value}x
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" disabled={!betAmount} onClick={placebet}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Number;