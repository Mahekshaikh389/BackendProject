import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth-page">
      <div className="auth-overlay">
        <div className="auth-card">
         

          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}

          {children}

          <p className="footer-text">Built with Node.js · Express · MongoDB</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
