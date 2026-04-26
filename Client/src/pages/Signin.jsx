import React, { useState, useContext } from "react";
import "../css/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";
import { loginUser, googleLogin } from "../services/api";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      const res = await loginUser(email, password);

      if (res.data.token) {
        login(res.data.user, res.data.token);
        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔵 GOOGLE LOGIN SUCCESS
  const handleGoogleSuccess = async (credentialResponse) => {
    // ✅ ADD THIS CHECK (important)
    if (!credentialResponse || !credentialResponse.credential) {
      alert("Google login failed (no credential)");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await googleLogin({
        credential: credentialResponse.credential,
      });

      if (res.data.token) {
        login(res.data.user, res.data.token);
        alert("Google login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Google login failed";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔴 GOOGLE LOGIN ERROR
  const handleGoogleError = () => {
    setError("Google login failed");
    alert("Google login failed");
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
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* GOOGLE LOGIN UI */}
          <div
            className="google-login"
            style={{
              marginTop: "20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ marginBottom: "10px" }}>
              Or continue with Google
            </p>

            { <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
            /> }
          </div>

          <div className="signup-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;