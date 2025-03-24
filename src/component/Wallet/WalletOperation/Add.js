import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { QRCodeCanvas } from 'qrcode.react'; // Correct import for QRCodeCanvas
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Add = () => {
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { userId, token } = useContext(AuthContext); // Get token from AuthContext

    // UPI ID and Owner's Payment Address (example UPI ID, replace with actual one)
    const upiId = "owner@upi"; // Replace with the actual UPI ID
    const upiUrl = `upi://pay?pa=${upiId}&pn=Owner&mc=0000&tid=${transactionId}&am=${balance}&cu=INR`; // UPI URL for the transaction

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
            });

            const result = await response.json(); // Parse JSON response

            if (response.ok) {
                setMessage(`Successfully added $${balance} to your wallet. Updated balance: $${result.UpdatedBalance}`);
                alert(`Successfully added $${balance} to your wallet. Updated balance: $${result.UpdatedBalance}`);
                setBalance(''); // Reset the amount input
                setTransactionId(''); // Reset transaction ID input
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
        if (parseFloat(balance) > 0 && transactionId.trim()) {
            await addMoney(); // Call the addMoney function to make the API call
        } else {
            setMessage('Please enter a valid transaction ID and amount.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-success text-white text-center">
                            <h4>Add Money to Wallet</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleAddMoney}>
                                <div className="mb-3">
                                    <label htmlFor="transaction_id" className="form-label">
                                        Transaction ID
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="transaction_id"
                                        placeholder="Enter transaction ID"
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
                                <button type="submit" className="btn btn-danger w-100">
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

            {/* Display UPI ID and QR code */}
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-success text-white text-center">
                            <h5>Send Money to UPI ID</h5>
                        </div>
                        <div className="card-body text-center">
                            <p>Use the following UPI ID to send your money:</p>
                            <h5>{upiId}</h5>
                            <p>
                                Or scan the QR code below to pay:
                            </p>
                            <QRCodeCanvas value={upiUrl} size={256} /> {/* Generate QR code */}
                            <p className="mt-3">
                                After making the payment, please enter the transaction ID and amount.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
