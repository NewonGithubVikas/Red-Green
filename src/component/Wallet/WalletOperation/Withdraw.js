import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

const Withdraw = () => {
    const [balance, setBalance] = useState(0); // Example initial wallet balance
    const [message, setMessage] = useState('');
    const { userId } = useContext(AuthContext);
    
    const handleWithdraw = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4500/wallet/withdraw-balance", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ balance: balance, id: userId }),
            });
            const result = await response.json(); // Parse JSON response
            console.log("response", result);
            
            if (response.ok) {
                setMessage(`Successfully withdrew $${balance} from your wallet. Updated balance: $${result.UpdatedBalance}`);
                alert(`Successfully withdrew $${balance} from your wallet. Updated balance: $${result.UpdatedBalance}`);
                setBalance(''); // Reset the amount input
            } else {
                console.error('Failed to withdraw money:', result);
                alert(result.message || 'There was an error withdrawing money from your wallet.');
            }

            // Additional API call to /user/withdraw-request
            await fetch("http://localhost:4500/user/withdraw-request", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: balance, userId: userId }),
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
                                Current Balance: <strong>${balance}</strong>
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
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger w-100">
                                    Withdraw
                                </button>
                            </form>
                        </div>
                        {message && (
                            <div className="card-footer text-center">
                                <p className={message === 'Insufficient balance.' ? 'text-danger' : 'text-success'}>
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