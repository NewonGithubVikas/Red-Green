import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy-Policy";
  }, []);

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h1 className="text-center text-danger fw-bold mb-4">Privacy Policy</h1>
        <p className="text-center text-success fs-5">
          Welcome to the <strong className="text-danger">Fantasy Red-Green Game</strong>. 
          Your privacy is our priority. This Privacy Policy explains how we collect, use, 
          and safeguard your personal information when you use our platform.
        </p>

        <hr className="mb-4" />

        <h3 className="mt-4 text-danger fw-bold">1. Information We Collect</h3>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong className="text-success">Personal Information:</strong> We collect your name, email address, and contact number during registration.
          </li>
          <li className="list-group-item">
            <strong className="text-success">Game Activity:</strong> Your bets, game history, and transactions are tracked to enhance your experience.
          </li>
          <li className="list-group-item">
            <strong className="text-success">Device Information:</strong> We collect data about the device and browser you use, including IP address and cookies.
          </li>
        </ul>

        <h3 className="mt-4 text-danger fw-bold">2. How We Use Your Information</h3>
        <ul className="mb-4 text-success">
          <li>To provide and improve our gaming services.</li>
          <li>To manage your account and process bets.</li>
          <li>To send updates, promotional offers, and alerts.</li>
          <li>To comply with legal obligations and resolve disputes.</li>
        </ul>

        <h3 className="mt-4 text-danger fw-bold">3. Information Sharing</h3>
        <p className="text-success">
          We respect your privacy and do not sell your information. However, we may share it with:
        </p>
        <ul className="mb-4 text-success">
          <li>
            <strong className="text-danger">Service Providers:</strong> Trusted partners for payment processing, data analysis, and customer support.
          </li>
          <li>
            <strong className="text-danger">Legal Authorities:</strong> To comply with legal requirements or protect user safety.
          </li>
        </ul>

        <h3 className="mt-4 text-danger fw-bold">4. Security</h3>
        <p className="text-success mb-4">
          We employ robust security measures to protect your data. However, no system is completely secure. 
          Use strong passwords and protect your account information.
        </p>

        <h3 className="mt-4 text-danger fw-bold">5. Your Rights</h3>
        <p className="text-success">As a user, you have the right to:</p>
        <ul className="mb-4 text-success">
          <li>Access and update your personal data.</li>
          <li>Request account and data deletion.</li>
          <li>Opt-out of promotional communications.</li>
        </ul>

        <h3 className="mt-4 text-danger fw-bold">6. Cookies</h3>
        <p className="text-success mb-4">
          We use cookies to personalize your experience and improve functionality. 
          You can manage cookies through your browser settings, but some features may be affected.
        </p>

        <h3 className="mt-4 text-danger fw-bold">7. Children's Privacy</h3>
        <p className="text-success mb-4">
          Our platform is designed for users aged 18 and older. If a child has provided us with personal data, please contact us immediately.
        </p>

        <h3 className="mt-4 text-danger fw-bold">8. Updates to This Policy</h3>
        <p className="text-success mb-4">
          We may update this Privacy Policy occasionally. Significant changes will be communicated via email or app notifications.
        </p>

        <h3 className="mt-4 text-danger fw-bold">9. Contact Us</h3>
        <p className="text-success mb-4">
          If you have questions about this Privacy Policy, reach us at: 
          <strong className="text-danger"> support@fantasyredgreen.com</strong>.
        </p>

        <p className="text-center text-success mt-4">
          <small>Last Updated: January 26, 2025</small>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
