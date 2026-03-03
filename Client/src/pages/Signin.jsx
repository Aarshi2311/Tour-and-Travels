import React, { useState, useContext } from "react";
import "../css/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signin() {
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
    <div className="signin-container">
      <div className="signin-image-section">
        <div className="overlay">
          <h2>Welcome Back Explorer</h2>
          <p>
            Continue your journey, discover new destinations,
            and plan your next unforgettable adventure.
          </p>
        </div>
      </div>

      <div className="signin-form-section">
        <h1>Sign In</h1>
        <p>Welcome back! Please sign in to continue</p>

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

          <button type="submit">Sign In</button>

          <div className="signup-text">
            Don't have an account? <Link to="/Signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
