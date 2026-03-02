import "../css/styles.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Elite Escapes</h3>
          <p>
            Curated luxury travel experiences designed for those
            who seek elegance, comfort, and unforgettable journeys.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li>Luxury Packages</li>
            <li>Destinations</li>
            <li>Travel Guides</li>
            <li>Exclusive Offers</li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Why Choose Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>Email: support@eliteescapes.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Global Offices</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Elite Escapes. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;