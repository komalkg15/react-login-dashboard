# React Login Dashboard

A simple React application with login authentication and a dashboard page.

## Features

- **Registration Page**: Create new account with username, email, and password
- **Login Page**: Sign in with registered credentials (username/email + password)
- **Form Validation**: 
  - Username is required (min 3 characters for registration)
  - Email validation with proper format
  - Password must be at least 6 characters
  - Password confirmation on registration
  - Duplicate username/email detection
- **Error Messages**: Displays appropriate error messages for invalid inputs
- **Authentication**: Login validates against registered users
- **Protected Dashboard**: Only accessible after successful login
- **Welcome Message**: Dashboard displays "Welcome @username"
- **Logout Functionality**: Users can log out and return to login page

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.js          # Main app with routing
├── Register.js     # Registration component
├── Login.js        # Login component
├── Dashboard.js    # Dashboard component
├── Register.css    # Registration page styles
├── Login.css       # Login page styles
├── Dashboard.css   # Dashboard page styles
└── index.css       # Global styles
```

## How It Works

1. **First Time Users - Register**:
   - Click "Register here" on login page
   - Enter username (min 3 chars), email, password, and confirm password
   - System checks for duplicate usernames/emails
   - On success, redirected to login page

2. **Login**:
   - Enter username/email and password
   - System validates credentials against registered users
   - Shows error if credentials don't match or user not registered
   - On success, redirected to dashboard

3. **Dashboard**:
   - Displays welcome message with username
   - Protected route - redirects to login if not authenticated
   - Logout button to return to login page

**Note**: User data is stored in browser's localStorage (for demo purposes only)
