import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext'; // Import AuthContext
<<<<<<< HEAD

=======
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
>>>>>>> c361654 (updated feature Number Game and other thing)
export default function Signin() {
  const [mobile, setMobile] = useState('');
  const [pass, setPass] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext); // Get authentication state
  const navigate = useNavigate();

  // Check localStorage to ensure redirection in new tabs
  useEffect(() => {
    if (isAuthenticated || localStorage.getItem("token")) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
      const response = await fetch("https://back-5es4.onrender.com/user/signin", {
=======
      const response = await fetch(`${API_BASE_URL}/user/signin`, {
>>>>>>> c361654 (updated feature Number Game and other thing)
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, password: pass }),
      });

      const result = await response.json();

      if (response.status === 200 && result.token) {
        localStorage.setItem("token", result.token); // Store token in localStorage
        login(result.token); // Update AuthContext
        console.log('Login successful:', result);
        navigate('/'); // Redirect to the home page
      } else {
        console.error('Login failed:', result);
        alert(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
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
                <div className="d-grid">
                  <button type="submit" className="btn btn-dark">Log In</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
<<<<<<< HEAD
=======
                <p><Link to="">Forgot Password?</Link></p>
>>>>>>> c361654 (updated feature Number Game and other thing)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> c361654 (updated feature Number Game and other thing)
