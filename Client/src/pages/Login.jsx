import React from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">

      {/* Left Image Section */}
      <div className="login-image-section">
        <div className="overlay">
          <h2>Welcome Back Explorer</h2>
          <p>
            Continue your journey, discover new destinations,
            and plan your next unforgettable adventure.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="login-form-section">
        <h1>Login</h1>
        <p>Welcome back! Please login to continue</p>

        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit">Login</button>

          <div className="signup-text">
            Don't have an account?  <Link to="/Signup"> Sign Up</Link>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Login;