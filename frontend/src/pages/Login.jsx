import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../api/auth";

const Login = ({ onSwitchMode, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (name, value) => {
    let newErrors = { ...errors };

    if (name === "email") {
      if (!value) newErrors.email = "Email is required";
      else if (!emailRegex.test(value)) newErrors.email = "Invalid email format";
      else delete newErrors.email;
    }

    if (name === "password") {
      if (!value) newErrors.password = "Password is required";
      else if (value.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      else delete newErrors.password;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validate(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    validate("email", form.email);
    validate("password", form.password);

    if (Object.keys(errors).length > 0) return; 

    setLoading(true);

    try {
      const data = await loginUser(form);

      localStorage.setItem("token", data.token);

      setSuccess("Login successful! Redirecting...");
      if (onLoginSuccess) onLoginSuccess(data.token);
    } catch (err) {
      setErrors({ submit: err?.response?.data?.error || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to access your dashboard.">
      {errors.submit && <div className="error-box">{errors.submit}</div>}
      {success && <div className="success-box">{success}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="field-group">
          <label className="field-label">Email</label>
          <input
            className={`field-input ${errors.email ? "input-error" : ""}`}
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="field-group">
          <label className="field-label">Password</label>
          <input
            className={`field-input ${errors.password ? "input-error" : ""}`}
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button
          className="auth-button"
          type="submit"
          disabled={
            loading || !form.email || !form.password || Object.keys(errors).length > 0
          }
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="secondary-text">
        Don&apos;t have an account?{" "}
        <span className="secondary-link" onClick={onSwitchMode}>
          Create one
        </span>
      </p>
    </AuthLayout>
  );
};

export default Login;
