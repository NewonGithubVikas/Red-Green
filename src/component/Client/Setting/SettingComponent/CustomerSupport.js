import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    document.title = "Customer Support"; // Change tab title
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted. Our support team will contact you soon!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 border-0">
        <h3 className="fw-bold text-center text-danger">Customer Support</h3>
        <p className="text-center text-success">We’re here to help you! Contact us for any issues.</p>

        {/* Contact Info */}
        <div className="d-flex flex-column align-items-center">
          <p className="text-danger">
            <FaEnvelope className="me-2" /> support@example.com
          </p>
          <p className="text-success">
            <FaPhone className="me-2" /> +91 98765 43210
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label text-danger">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control border-success"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-danger">Your Email</label>
            <input
              type="email"
              name="email"
              className="form-control border-success"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-danger">Your Message</label>
            <textarea
              name="message"
              className="form-control border-success"
              rows="3"
              placeholder="Describe your issue"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            <FaPaperPlane className="me-2" /> Submit
          </button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="card shadow-lg mt-4 p-4 border-0">
        <h4 className="fw-bold text-danger">Frequently Asked Questions (FAQs)</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <strong className="text-success">Q: How long does it take to get a response?</strong>
            <p className="text-danger">A: Our team responds within 24-48 hours.</p>
          </li>
          <li className="list-group-item">
            <strong className="text-success">Q: How do I reset my password?</strong>
            <p className="text-danger">A: Click on "Forgot Password" on the login page to reset it.</p>
          </li>
          <li className="list-group-item">
            <strong className="text-success">Q: Can I contact support via phone?</strong>
            <p className="text-danger">A: Yes, call us at +91 98765 43210.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerSupport;
