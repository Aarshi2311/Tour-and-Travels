import { Link } from "react-router-dom";
import "../css/styles.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <h2>Elite Escapes</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/rateus">Rate Us</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;