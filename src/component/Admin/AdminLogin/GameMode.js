import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../Context/AuthContext"; // Ensure this is the correct path

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const GameMode = () => {
  const [gameMode, setGameMode] = useState(null);
  const [newGameMode, setNewGameMode] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  
  const { token } = useContext(AuthContext); // Extract userId and token

  useEffect(() => {
    fetchGameMode();
    document.title ="Game-Mode"
  }, []);

  // Fetch the current game mode
  const fetchGameMode = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/view-decision`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setGameMode(data.gameMode);
        setMessage('');
        setError(null);
      } else {
        setError(data.message || 'Error fetching game mode.');
        setMessage('');
      }
    } catch (err) {
      setError('Error fetching game mode. Please try again later.');
      setMessage('');
    }
  };

  // Update the game mode
  const handleGameModeUpdate = async (e) => {
    e.preventDefault();

    if (newGameMode !== 0 && newGameMode !== 1) {
      setError('Invalid game mode value. Please select either 0 (Fixed) or 1 (Random).');
      setMessage('');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/update-decision`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game_mode: newGameMode }),
      });

      const data = await response.json();

      if (response.ok) {
        setGameMode(data.gameMode);
        setMessage('Game mode updated successfully!');
        setError(null);
      } else {
        setError(data.message || 'Error updating game mode.');
        setMessage('');
      }
    } catch (err) {
      setError('Error updating game mode. Please try again later.');
      setMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>Game Mode Management</h4>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <h5>Current Game Mode:</h5>
              <p>
                {gameMode === 0 ? 'Fixed (0)' : 'Random (1)'} 
                <br />
                <small>0 = Fixed, 1 = Random</small>
              </p>

              <form onSubmit={handleGameModeUpdate}>
                <div className="mb-3">
                  <label htmlFor="gameMode" className="form-label">Update Game Mode</label>
                  <select
                    id="gameMode"
                    className="form-select"
                    value={newGameMode}
                    onChange={(e) => setNewGameMode(parseInt(e.target.value))}
                  >
                    <option value={0}>Fixed (0)</option>
                    <option value={1}>Random (1)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Update Game Mode
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
