import React, { useState,useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
const Add = () => {
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [transactionId,setTransactionId] = useState('');
    const {userId} = useContext(AuthContext);
    const addMoney = async () => {
        try {
            const response = await fetch('http://localhost:4500/user/add-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transaction_id:transactionId,amount:balance, userId:userId }),
            });

            const result = await response.json(); // Parse JSON response

            if (response.ok) {
                setMessage(`Successfully added $${balance} to your wallet. Updated balance: $${result.UpdatedBalance}`);
                alert(`Successfully added $${balance} to your wallet. Updated balance: $${result.UpdatedBalance}`);
                setBalance(''); // Reset the amount input
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
        if (parseFloat(balance) > 0) {
            await addMoney(); // Call the addMoney function to make the API call
        } else {
            setMessage('Please enter a valid amount.');
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
                            <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">
                                        Transaction Id
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="transaction_id"
                                        placeholder="Enter transaction Id"
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
