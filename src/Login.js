import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check if user exists in registered users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      u => (u.username === username.trim() || u.email === email.trim()) && u.password === password
    );

    if (!user) {
      setErrors({ 
        password: 'Invalid username/email or password. Please register if you don\'t have an account.' 
      });
      return;
    }

    // Store authentication data
    localStorage.setItem('username', user.username);
    localStorage.setItem('isAuthenticated', 'true');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: '' });
              }}
              placeholder="Enter username"
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: '' });
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
                setErrors({ ...errors, password: '' });
              }}
              placeholder="Enter password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
