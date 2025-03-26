import React, { useState,useEffect } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AddFundsForm = () => {
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [transactionType, setTransactionType] = useState('add');
    const [userId, setUserId] = useState('');

     useEffect(()=>{
        document.title = "Add-Fund"
      },[]);
    const handleTransaction = async (e) => {
        e.preventDefault();
        if (!userId) {
            setMessage('User ID is required.');
            return;
        }
        
        if (parseFloat(balance) <= 0) {
            setMessage('Please enter a valid amount.');
            return;
        }

        try {
            const token = localStorage.getItem("token"); // Retrieve token from localStorage
            if (!token) {
                setMessage("Unauthorized: No token provided.");
                return;
            }

            const url = transactionType === 'add' 
                ? `${API_BASE_URL}/admin/admin-addbalance` 
                : `${API_BASE_URL}/admin/admin-withdraw-balance`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to headers
                },
                body: JSON.stringify({ balance: balance, id: userId }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`Successfully ${transactionType === 'add' ? 'added' : 'withdrawn'} $${balance}. Updated balance: $${result.UpdatedBalance}`);
                alert(`Successfully ${transactionType === 'add' ? 'added' : 'withdrawn'} $${balance}. Updated balance: $${result.UpdatedBalance}`);
                setBalance('');
                setUserId('');
            } else {
                setMessage(result.message || `Error occurred while ${transactionType === 'add' ? 'adding' : 'withdrawing'} money.`);
            }
        } catch (error) {
            console.error('Transaction error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className={`card-header text-white text-center ${transactionType === 'add' ? 'bg-primary' : 'bg-danger'}`}>
                            <h4>{transactionType === 'add' ? 'Add Money to Wallet' : 'Withdraw from Wallet'}</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="transactionType" className="form-label">Select Transaction Type</label>
                                <select
                                    className="form-control"
                                    id="transactionType"
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                >
                                    <option value="add">Add Money</option>
                                    <option value="withdraw">Withdraw Money</option>
                                </select>
                            </div>
                            <form onSubmit={handleTransaction}>
                                <div className="mb-3">
                                    <label htmlFor="userId" className="form-label">User ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userId"
                                        placeholder="Enter User ID"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">Amount (USD)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        placeholder="Enter amount"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className={`btn w-100 ${transactionType === 'add' ? 'btn-primary' : 'btn-danger'}`}>
                                    {transactionType === 'add' ? 'Add Money' : 'Withdraw Money'}
                                </button>
                            </form>
                        </div>
                        {message && (
                            <div className="card-footer text-center">
                                <p className={message.includes('Error') ? 'text-danger' : 'text-success'}>
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

export default AddFundsForm;
