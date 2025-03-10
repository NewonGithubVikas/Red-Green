import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for named export

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
<<<<<<< HEAD

  // Check for token in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        setUserId(decoded.data.id);
=======
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Store token in state

  // Check for token in localStorage when the app loads
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.data.id);
        setToken(storedToken);  // Set token in state
>>>>>>> c361654 (updated feature Number Game and other thing)
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUserId(null);
<<<<<<< HEAD
=======
        setToken("");
>>>>>>> c361654 (updated feature Number Game and other thing)
      }
    }
  }, []);

  // Login function
<<<<<<< HEAD
  const login = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwtDecode(token);
        console.log("decoded data is =>",decoded.data.id);
        setUserId(decoded.data.id);
        setIsLoggedIn(true);
        console.log("User logged in successfully with userId:", decoded.userId);
=======
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
>>>>>>> c361654 (updated feature Number Game and other thing)
      } catch (error) {
        console.error("Failed to decode token during login:", error);
        setIsLoggedIn(false);
        setUserId(null);
<<<<<<< HEAD
=======
        setToken("");
>>>>>>> c361654 (updated feature Number Game and other thing)
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
<<<<<<< HEAD
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
=======
    setToken("");  // Clear token from state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, token, login, logout }}>
>>>>>>> c361654 (updated feature Number Game and other thing)
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
