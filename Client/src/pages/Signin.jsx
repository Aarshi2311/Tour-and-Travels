import React, { useState, useContext } from "react";
import "../css/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      login(data.user);
      navigate("/dashboard");
    }

  } catch (error) {
    console.error("Login error:", error);
  }
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
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
