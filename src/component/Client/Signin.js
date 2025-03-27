import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext'; // Import AuthContext
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Signin() {
  const [mobile, setMobile] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const { login, isAuthenticated } = useContext(AuthContext); // Get authentication state
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Signin"; // Change tab title here
  }, []);

  // Check localStorage to ensure redirection in new tabs
  useEffect(() => {
    if (isAuthenticated || localStorage.getItem("token")) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await fetch(`${API_BASE_URL}/user/signin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, password: pass }),
      });

      const result = await response.json();

      if (result.responseCode === 403) {
        const message = "Your account is blocked. Please contact support.";
        setErrorMessage(message);
        alert(message);
        return; // Stop execution here
      }

      if (response.status === 200 && result.token) {
        localStorage.setItem("token", result.token); // Store token in localStorage
        login(result.token); // Update AuthContext
        console.log('Login successful:', result);
        navigate('/'); // Redirect to the home page
      } else {
        const message = result.responseMessage || 'Login failed. Please check your credentials.';
        setErrorMessage(message);
        alert(message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      const message = 'An error occurred. Please try again later.';
      setErrorMessage(message);
      alert(message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-dark text-white text-center">
              <h4>Sign In</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter mobile number"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="pass"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    required
                  />
                </div>
                {errorMessage && <span className="text-danger">{errorMessage}</span>}
                <div className="d-grid mt-2">
                  <button type="submit" className="btn btn-dark">Log In</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                <p><Link to="/forget-password">Forgot Password?</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
