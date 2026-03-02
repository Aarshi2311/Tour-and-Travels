import React, { useState, useContext } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake login (since no backend)
    const fakeUser = {
      name: email.split("@")[0],
      email: email,
    };

    login(fakeUser);

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <div className="overlay">
          <h2>Welcome Back Explorer</h2>
          <p>
            Continue your journey, discover new destinations,
            and plan your next unforgettable adventure.
          </p>
        </div>
      </div>

      <div className="login-form-section">
        <h1>Login</h1>
        <p>Welcome back! Please login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <div className="signup-text">
            Don't have an account? <Link to="/Signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;