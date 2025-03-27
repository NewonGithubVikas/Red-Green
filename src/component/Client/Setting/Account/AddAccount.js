import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AddAccount = () => {
    const { userId } = useContext(AuthContext);
    const token = localStorage.getItem("token"); // Get token from localStorage
    const [accounts, setAccounts] = useState([]);
    const [show, setShow] = useState(false);
    const [dataExists, setDataExists] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    const [formData, setFormData] = useState({
        userId: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
        accountHolderName: ""
    });
    useEffect(() => {
        document.title = "add account"; // Change tab title here
      }, []);
    // ✅ Fetch Accounts
    const fetchAccounts = useCallback(async () => {
        if (!userId || !token) return;

        try {
            const res = await fetch(`${API_BASE_URL}/account/account-details`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // 🔹 Include token in header
                },
                body: JSON.stringify({ userId })
            });

            if (res.ok) {
                const data = await res.json();
                setAccounts(data.data || []);
                setDataExists(data.data.length > 0);
            } else {
                setDataExists(false);
            }
        } catch (error) {
            console.error("Error fetching accounts", error);
            setDataExists(false);
        }
    }, [userId, token]);

    useEffect(() => {
        if (userId) {
            setFormData(prevData => ({ ...prevData, userId }));
            fetchAccounts();
        }
    }, [userId, fetchAccounts]);

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Add or Update Account
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const endpoint = editMode
            ? `${API_BASE_URL}/account/update/${selectedAccountId}`
            : `${API_BASE_URL}/account/add-account`;

        const method = editMode ? "PUT" : "POST";

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // 🔹 Include token in header
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchAccounts();
                setShow(false);
                setEditMode(false);
                setFormData({
                    userId,
                    accountNumber: "",
                    ifscCode: "",
                    branch: "",
                    accountHolderName: ""
                });
            }
        } catch (error) {
            console.error("Error saving account", error);
        }
    };

    // ✅ Delete Account
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this account?")) return;

        try {
            const res = await fetch(`${API_BASE_URL}/account/delete/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` } // 🔹 Include token in header
            });

            if (res.ok) {
                fetchAccounts();
            }
        } catch (error) {
            console.error("Error deleting account", error);
        }
    };

    // ✅ Edit Account
    const handleEdit = (account) => {
        setFormData({
            userId,
            accountNumber: account.accountNumber,
            ifscCode: account.ifscCode,
            branch: account.branch,
            accountHolderName: account.accountHolderName
        });
        setSelectedAccountId(account._id);
        setEditMode(true);
        setShow(true);
    };

    return (
        <div className="container mt-4">
            <h2>Account Details</h2>

            {/* ✅ Show "Add Account" button only if no account exists */}
            {!dataExists && (
                <button className="btn btn-success" onClick={() => setShow(true)}>Add Account</button>
            )}

            {/* ✅ Form for Adding or Editing Account */}
            {show && (
                <div className="mt-3">
                    <h3>{editMode ? "Edit Account" : "Add Account"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Account Number</label>
                            <input type="text" className="form-control" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label>IFSC Code</label>
                            <input type="text" className="form-control" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label>Branch</label>
                            <input type="text" className="form-control" name="branch" value={formData.branch} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label>Account Holder Name</label>
                            <input type="text" className="form-control" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-success">{editMode ? "Update" : "Add"}</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => { setShow(false); setEditMode(false); }}>Cancel</button>
                    </form>
                </div>
            )}

            {/* ✅ Account List */}
            {dataExists === null ? (
                <p>Checking account data...</p>
            ) : dataExists ? (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>IFSC Code</th>
                            <th>Branch</th>
                            <th>Holder Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.length > 0 ? (
                            accounts.map((account) => (
                                <tr key={account._id}>
                                    <td>{account.accountNumber}</td>
                                    <td>{account.ifscCode}</td>
                                    <td>{account.branch}</td>
                                    <td>{account.accountHolderName}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(account)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(account._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No accounts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                <p>No accounts available. Please add an account.</p>
            )}
        </div>
    );
};

export default AddAccount;
