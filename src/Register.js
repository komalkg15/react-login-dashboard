import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((user) => user.username === username.trim())) {
      newErrors.username = "Username already exists";
    }
    if (users.some((user) => user.email === email.trim())) {
      newErrors.email = "Email already registered";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
      return;
    }

    // Store user data
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({
      username: username.trim(),
      email: email.trim(),
      password: password,
    });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registration successful! Redirecting to login...");
    setErrors({});

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: "" });
              }}
              placeholder="Enter username"
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              placeholder="Enter email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              placeholder="Enter password"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({ ...errors, confirmPassword: "" });
              }}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
