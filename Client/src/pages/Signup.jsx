import React, { useState, useContext } from "react";
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signupUser } from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic") {
      setFormData({
        ...formData,
        profilePic: files[0],
      });
      // Preview image
      if (files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.name || !formData.email || !formData.password) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("confirmPassword", formData.confirmPassword);
      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      const res = await signupUser(data);

      if (res.data.token) {
        login(res.data.user, res.data.token);
        alert("Signup successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* left side */}
      <div className="signup-form-section">
        <h1>Create Account</h1>
        <p>Start your travel journey today</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />

          <div style={{ marginTop: "10px" }}>
            <label htmlFor="profilePic" style={{ display: "block", marginBottom: "8px" }}>
              Profile Picture (Optional):
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              disabled={loading}
            />
            {preview && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="login-next">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </form>
      </div>

      {/* right side */}
      <div className="signup-image-section">
        <div className="overlay">
          <h2>Your Adventure Starts Here</h2>
          <p>
            Discover hidden destinations, book exciting trips,
            and create unforgettable memories.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;