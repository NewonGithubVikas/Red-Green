import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for named export

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Store token in state

  // Check for token in localStorage when the app loads
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.data.id);
        setToken(storedToken);  // Set token in state
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUserId(null);
        setToken("");
      }
    }
  }, []);

  // Login function
  const login = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      try {
        const decoded = jwtDecode(newToken);
        console.log("decoded data is =>", decoded.data.id);
        setUserId(decoded.data.id);
        setToken(newToken);  // Set token in state
        setIsLoggedIn(true);
        console.log("User logged in successfully with userId:", decoded.data.id);
      } catch (error) {
        console.error("Failed to decode token during login:", error);
        setIsLoggedIn(false);
        setUserId(null);
        setToken("");
      }
    } else {
      console.error("Login failed: Token is undefined or null");
      setIsLoggedIn(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(null);
    setToken("");  // Clear token from state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
