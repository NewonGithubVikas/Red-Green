import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted. Our support team will contact you soon!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h3 className="fw-bold text-center">Customer Support</h3>
        <p className="text-muted text-center">We’re here to help you! Contact us for any issues.</p>

        {/* Contact Info */}
        <div className="d-flex flex-column align-items-center">
          <p><FaEnvelope className="text-primary me-2" /> support@example.com</p>
          <p><FaPhone className="text-success me-2" /> +91 98765 43210</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="3"
              placeholder="Describe your issue"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            <FaPaperPlane className="me-2" /> Submit
          </button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="card shadow-lg mt-4 p-4">
        <h4 className="fw-bold">Frequently Asked Questions (FAQs)</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Q: How long does it take to get a response?</strong>
            <p>A: Our team responds within 24-48 hours.</p>
          </li>
          <li className="list-group-item">
            <strong>Q: How do I reset my password?</strong>
            <p>A: Click on "Forgot Password" on the login page to reset it.</p>
          </li>
          <li className="list-group-item">
            <strong>Q: Can I contact support via phone?</strong>
            <p>A: Yes, call us at +91 98765 43210.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerSupport;
