import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for named export

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // Check for token in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        setUserId(decoded.data.id);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    }
  }, []);

  // Login function
  const login = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwtDecode(token);
        console.log("decoded data is =>",decoded.data.id);
        setUserId(decoded.data.id);
        setIsLoggedIn(true);
        console.log("User logged in successfully with userId:", decoded.userId);
      } catch (error) {
        console.error("Failed to decode token during login:", error);
        setIsLoggedIn(false);
        setUserId(null);
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
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
