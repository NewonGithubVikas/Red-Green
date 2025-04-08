// WalletContext.js
import React, { createContext, useState, useEffect,useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WalletContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const WalletProvider = ({ children }) => {
    console.log("thie is calling or not by any component ")
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
      const { userId } = useContext(AuthContext);
  const token = localStorage.getItem("token"); // or useContext(AuthContext)

  const fetchWalletBalance = async () => {
    try {
        console.log("user id",userId);
        const response= await fetch(`${API_BASE_URL}/wallet/balance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Added Authorization token
            },
          });
      const data = await response.json();
      console.log("data",data);
      if (response.ok) {
        console.log("your account balance",data.Balance)
        setWalletBalance(data.Balance);
      } else {
        console.error("Failed to fetch wallet balance", data.message);
      }
    } catch (err) {
      console.error("Error fetching wallet:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <WalletContext.Provider
      value={{ walletBalance, fetchWalletBalance, updateWalletBalance: fetchWalletBalance, loading }}
    >
      {children}
    </WalletContext.Provider>
  );
};
