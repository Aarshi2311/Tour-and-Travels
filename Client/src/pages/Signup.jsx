import React, { useState } from "react";
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      alert(data.message);

      if(res.ok){
        navigate("/signin");
      }

    } catch (error) {
      console.error("Signup error:", error);
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
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
          />

          <button type="submit">Sign Up</button>

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