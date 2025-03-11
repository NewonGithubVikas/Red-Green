import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Withdraw = () => {
    const [balance, setBalance] = useState('');
    const [walletBalance, setWalletBalance] = useState(0); // Holds actual wallet balance
    const [message, setMessage] = useState('');
    const { userId, token } = useContext(AuthContext); // Get token from AuthContext
    
    const handleWithdraw = async (e) => {
        e.preventDefault();
        const withdrawAmount = parseFloat(balance); // Ensure valid number

        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            alert("Please enter a valid withdrawal amount.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/wallet/withdraw-balance`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token
                },
                body: JSON.stringify({ balance: withdrawAmount, id: userId }),
            });

            const result = await response.json();
            console.log("Withdraw Response:", result);
            
            if (response.ok) {
                setWalletBalance(result.UpdatedBalance); // Update balance display
                setMessage(`Successfully withdrew $${withdrawAmount}. Updated balance: $${result.UpdatedBalance}`);
                alert(`Successfully withdrew $${withdrawAmount}. Updated balance: $${result.UpdatedBalance}`);
                setBalance(''); // Reset input field
            } else {
                console.error('Failed to withdraw money:', result);
                alert(result.message || 'There was an error withdrawing money.');
                return;
            }

            // Additional API call to /user/withdraw-request
            await fetch(`${API_BASE_URL}/user/withdraw-request`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ amount: withdrawAmount, userId: userId }),
            });

        } catch (error) {
            console.error('There was an error:', error);
            alert('An error occurred while withdrawing money. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-danger text-white text-center">
                            <h4>Withdraw Amount</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="text-center mb-4">
                                Current Balance: <strong>${walletBalance}</strong>
                            </h5>
                            <form onSubmit={handleWithdraw}>
                                <div className="mb-3">
                                    <label htmlFor="withdrawAmount" className="form-label">
                                        Amount (USD)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="withdrawAmount"
                                        placeholder="Enter amount to withdraw"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                        min="1"
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger w-100">
                                    Withdraw
                                </button>
                            </form>
                        </div>
                        {message && (
                            <div className="card-footer text-center">
                                <p className={message.includes('Insufficient') ? 'text-danger' : 'text-success'}>
                                    {message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
