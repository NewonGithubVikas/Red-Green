<<<<<<< HEAD
import React, { useState,useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
const Add = () => {
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [transactionId,setTransactionId] = useState('');
    const {userId} = useContext(AuthContext);
    const addMoney = async () => {
        try {
            const response = await fetch('https://back-5es4.onrender.com/user/add-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transaction_id:transactionId,amount:balance, userId:userId }),
=======
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Add = () => {
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { userId, token } = useContext(AuthContext); // Get token from AuthContext

    const addMoney = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/add-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the header
                },
                body: JSON.stringify({
                    transaction_id: transactionId,
                    amount: balance,
                    userId: userId,
                }),
>>>>>>> c361654 (updated feature Number Game and other thing)
            });

            const result = await response.json(); // Parse JSON response

            if (response.ok) {
                setMessage(`Successfully added $${balance} to your wallet. Updated balance: $${result.UpdatedBalance}`);
                alert(`Successfully added $${balance} to your wallet. Updated balance: $${result.UpdatedBalance}`);
                setBalance(''); // Reset the amount input
<<<<<<< HEAD
=======
                setTransactionId(''); // Reset transaction ID input
>>>>>>> c361654 (updated feature Number Game and other thing)
            } else {
                console.error('Failed to add money:', result);
                alert(result.message || 'There was an error adding money to your wallet.');
            }
        } catch (error) {
            console.error('There was an error:', error);
            alert('An error occurred while adding money. Please try again later.');
        }
    };

    const handleAddMoney = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        if (parseFloat(balance) > 0) {
            await addMoney(); // Call the addMoney function to make the API call
        } else {
            setMessage('Please enter a valid amount.');
=======
        if (parseFloat(balance) > 0 && transactionId.trim()) {
            await addMoney(); // Call the addMoney function to make the API call
        } else {
            setMessage('Please enter a valid transaction ID and amount.');
>>>>>>> c361654 (updated feature Number Game and other thing)
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h4>Add Money to Wallet</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleAddMoney}>
<<<<<<< HEAD
                            <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">
                                        Transaction Id
=======
                                <div className="mb-3">
                                    <label htmlFor="transaction_id" className="form-label">
                                        Transaction ID
>>>>>>> c361654 (updated feature Number Game and other thing)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="transaction_id"
<<<<<<< HEAD
                                        placeholder="Enter transaction Id"
=======
                                        placeholder="Enter transaction ID"
>>>>>>> c361654 (updated feature Number Game and other thing)
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">
                                        Amount (USD)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        placeholder="Enter amount"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Add Money
                                </button>
                            </form>
                        </div>
                        {message && (
                            <div className="card-footer text-center">
                                <p className="text-success">{message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
