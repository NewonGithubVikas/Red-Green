import React, { useState,useEffect } from "react";
import { FaCopy, FaShareAlt } from "react-icons/fa";

const ReferEarn = () => {
  const [referralCode] = useState("REF123456"); // Example referral code
  const [copied, setCopied] = useState(false);

  // Function to copy referral code
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };
   useEffect(()=>{
      document.title = "Refer-Earn"
    },[]);
  // Function to share referral code
  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: "Refer & Earn",
        text: `Use my referral code ${referralCode} to get rewards!`,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 text-center">
        <h3 className="fw-bold">Refer & Earn</h3>
        <p className="text-muted">Invite friends and earn rewards!</p>

        {/* Referral Code Section */}
        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
          <span className="fw-bold">{referralCode}</span>
          <button className="btn btn-sm btn-primary" onClick={copyToClipboard}>
            <FaCopy className="me-1" /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Share Button */}
        <button className="btn btn-success mt-3 w-100" onClick={shareReferral}>
          <FaShareAlt className="me-2" /> Share Referral Code
        </button>
      </div>
    </div>
  );
};

export default ReferEarn;
