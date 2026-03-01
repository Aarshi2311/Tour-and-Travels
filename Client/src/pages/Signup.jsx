import React from "react";
import "../SignUp.css";


function Signup() {
  return (
    <div className="signup-container">
    
      {/* left side */}
      <div className = "signup-form-section">
        <h1>Create Account</h1>
        <p>Strart your travel journey today</p>

        <form>
          <input type="text" placeholder="Full Name" required/>
          <input type="email" placeholder="Email" required/>
          <input type="password" placeholder="Password" required/>
          <input type="password" placeholder="Confirm Password" required/>

          <button type="submit">Sign Up</button>
          <div className="login-next">
            Already have an account? <span>Login</span>
          </div>
        </form>
      </div>

      {/* right side */}
      <div className="signup-image-section">
        <div className="overlay">
          <h2>Your Adventure Starts Here</h2>
          <p>Discover hidden destinations, book exciting trips,
              and create unforgettable memories.
          </p>
        </div>
      </div>
      
    </div>
    
  );
}



export default Signup;