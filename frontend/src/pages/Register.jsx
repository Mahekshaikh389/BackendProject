import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../api/auth";

const Register = ({ onSwitchMode }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (name, value) => {
    let newErrors = { ...errors };

    if (name === "name") {
      if (!value) newErrors.name = "Name is required";
      
      else delete newErrors.name;
    }

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

    if (name === "role") {
      if (!value) newErrors.role = "Role is required";
      else delete newErrors.role;
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

    // validate all fields before calling API
    validate("name", form.name);
    validate("email", form.email);
    validate("password", form.password);
    validate("role", form.role);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      const data = await registerUser(form);
      setSuccess("Registration successful! You can now log in.");

    } catch (err) {
      setErrors({
        submit: err?.response?.data?.error || "Registration failed, please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join and start using the app in seconds.">
      {errors.submit && <div className="error-box">{errors.submit}</div>}
      {success && <div className="success-box">{success}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="field-group">
          <label className="field-label">Full name</label>
          <input
            className={`field-input ${errors.name ? "input-error" : ""}`}
            name="name"
            type="text"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

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
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {/* Role */}
        <div className="field-group">
          <label className="field-label">Role</label>
          <select
            className={`field-select ${errors.role ? "input-error" : ""}`}
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="error-text">{errors.role}</p>}
        </div>

        <button
          className="auth-button"
          type="submit"
          disabled={
            loading ||
            !form.name ||
            !form.email ||
            !form.password ||
            Object.keys(errors).length > 0
          }
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="secondary-text">
        Already have an account?{" "}
        <span className="secondary-link" onClick={onSwitchMode}>
          Log in
        </span>
      </p>
    </AuthLayout>
  );
};

export default Register;
