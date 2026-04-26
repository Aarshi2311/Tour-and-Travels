import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { getAllBookings, deleteBooking } from "../services/api";
import "../css/dashboard.css";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!user) {
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await getAllBookings();
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);


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
      await deleteBooking(bookingToRemove._id);
      setBookings((prev) => prev.filter((b) => b._id !== bookingToRemove._id));
      alert("Booking removed successfully");
    } catch (error) {
      console.error("Error removing booking:", error);
      alert("Could not remove booking. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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

            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>{userBookings.length}</h3>
              <p>Total Bookings</p>
            </div>

            <div className="stat-card">
              <h3>₹ {totalSpent.toLocaleString()}</h3>
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
                <div key={b._id} className="booking-card">
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
                      <span className="booking-badge">{b.status}</span>
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
                  <p>Guests: {b.guests}</p>
                  <p>Price per person: ₹ {b.price.toLocaleString()}</p>
                  <p>Total Paid: ₹ {b.totalPrice.toLocaleString()}</p>
                  <p>Start Date: {new Date(b.startDate).toLocaleDateString()}</p>
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