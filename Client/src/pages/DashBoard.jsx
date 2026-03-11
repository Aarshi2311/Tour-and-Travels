import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../css/dashboard.css";

function Dashboard() {
  
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
  window.scrollTo(0, 0);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  fetchBookings();
}, []);

  const [bookings, setBookings] = useState([]);


  if (!user) {
    return (
      <>
        <div className="dashboard-page">
          <div className="container dashboard-guard">
            <div className="guard-card">
              <h2>Access Restricted</h2>
              <p>
                Please login or create an account to access your
                personalized dashboard and manage your luxury journeys.
              </p>

              <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                <Link to="/signin" className="btn btn-gold">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-gold">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const userBookings = bookings.filter(
    (b) => b.userEmail === user.email
  );

  const totalSpent = userBookings.reduce(
    (acc, curr) => acc + Number(curr.totalPrice),
    0
  );

  const handleRemove = async (bookingToRemove) => {
    try {
      const res = await fetch(`http://localhost:3000/api/bookings/${bookingToRemove.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove booking");
      setBookings((prev) => prev.filter((b) => b.id !== bookingToRemove.id));
    } catch (error) {
      console.error("Error removing booking:", error);
      alert("Could not remove booking. Please try again.");
    }
  };

  return (
    <>
      <div className="dashboard-page">
        <div className="container">
          <div className="dashboard-header">
            <div>
              <h1>Welcome, {user.name}</h1>
              <p className="dashboard-sub">
                Here’s a summary of your exclusive travel experiences.
              </p>
            </div>

            <button onClick={logout} className="btn btn-outline">
              Logout
            </button>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>{userBookings.length}</h3>
              <p>Total Bookings</p>
            </div>

            <div className="stat-card">
              <h3>₹ {totalSpent}</h3>
              <p>Total Spent</p>
            </div>
          </div>

          <h2 style={{ marginBottom: "20px" }}>Your Bookings</h2>

          {userBookings.length === 0 ? (
            <div>
              <p style={{ marginBottom: "20px" }}>
                You haven’t booked any packages yet.
              </p>
              <Link to="/explore" className="btn btn-gold">
                Explore Packages
              </Link>
            </div>
          ) : (
            <div className="booking-grid">
              {userBookings.map((b) => (
                <div key={b.id} className="booking-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <h3>
                      {b.packageName}
                      <span className="booking-badge">Confirmed</span>
                    </h3>

                    <button
                      className="btn btn-outline"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                      onClick={() => handleRemove(b)}
                    >
                      Remove
                    </button>
                  </div>

                  <p>{b.destination}</p>
                  <p>Duration: {b.duration}</p>
                  <p>People: {b.people}</p>
                  <p>Total Paid: ₹ {b.totalPrice}</p>
                  <p>Booked On: {b.bookedAt}</p>
                </div>
              ))}
            </div>
          )}

          {userBookings.length > 0 && (
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <Link to="/explore">
                <button className="btn btn-gold">Add More Packages</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;