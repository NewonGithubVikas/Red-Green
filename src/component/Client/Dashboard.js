import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashbord() {
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate('game');
  }
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      {/* Background Image */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1920x1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          filter: "brightness(0.5)",
        }}
      ></div>

      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="display-3 fw-bold text-warning">Fantasy Red-Green Game</h1>
        <p className="lead fs-4">
          Test your luck and strategy in this exciting color game! <br />
          Will you pick the winning color?
        </p>
      </div>

      {/* Game Options */}
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4">
        <button
          className="btn btn-success btn-lg px-5 py-3 shadow-lg rounded-pill"
          onClick={() => handleNavigate()}

        >
          Play Green
        </button>
        <button
          className="btn btn-danger btn-lg px-5 py-3 shadow-lg rounded-pill"
          onClick={() => handleNavigate()}
        >
          Play Red
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-5">
        <p className="text-muted">
          Predict wisely, play responsibly, and enjoy the thrill!
        </p>
        <p className="small text-warning">
          * This game is for entertainment purposes only. Terms and conditions
          apply.
        </p>
      </div>
    </div>
  );
}
