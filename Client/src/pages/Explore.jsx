import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAllPackages, createBooking } from "../services/api";
import "../css/explore.css";
import Footer from "../components/Footer";

function Explore() {
  const [packagesData, setPackagesData] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getAllPackages();
        setPackagesData(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packagesData.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(search.toLowerCase());

    const matchesPrice =
      maxPrice === "" || pkg.price <= Number(maxPrice);

    return matchesSearch && matchesPrice;
  });

  return (
    <>
      <section className="explore-hero">
        <div className="container">
          <h1>Discover Extraordinary Journeys</h1>
          <p>
            Handcrafted luxury travel experiences designed for elegance,
            comfort and unforgettable memories.
          </p>
        </div>
      </section>

      <div className="section">
        <div className="container">
          <h2 className="section-title">Explore Exclusive Packages</h2>

          <p className="package-count">
            Showing {filteredPackages.length} exclusive experiences
          </p>

          <div className="explore-controls-wrapper">
            <div className="explore-controls">
              <input
                type="text"
                placeholder="Search destination or package..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              >
                <option value="">Filter by Price</option>
                <option value="5000">Under ₹5000</option>
                <option value="7000">Under ₹7000</option>
                <option value="10000">Under ₹10000</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>Loading packages...</p>
          ) : filteredPackages.length === 0 ? (
            <div className="no-results">
              <h3>No Packages Found</h3>
              <p>
                We currently don't offer that destination.
                Please explore our other luxury experiences.
              </p>
            </div>
          ) : (
            <div className="package-grid">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

function PackageCard({ pkg }) {
  const [people, setPeople] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const totalPrice = pkg.price * people;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!user) {
      alert("Please sign in to book this package.");
      navigate("/signin");
      return;
    }

    if (!startDate) {
      alert("Please select a start date");
      return;
    }

    setBookingLoading(true);

    try {
      const bookingData = {
        packageId: pkg._id,
        guests: people,
        startDate,
      };

      const res = await createBooking(bookingData);

      if (res.data.booking) {
        alert("Booking successful! Check your dashboard.");
        navigate("/dashboard");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Booking failed";
      alert(message);
      console.error("Booking error:", error);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="package-card">
      <div className="badge">Limited Slots</div>
      <img src={pkg.image || "https://via.placeholder.com/400"} alt={pkg.name} />

      <div className="card-content">
        <h3>{pkg.name}</h3>
        <p className="destination">{pkg.destination}</p>
        <p className="duration">{pkg.duration}</p>
        <p className="price">₹ {pkg.price.toLocaleString()} / person</p>

        <div className="people-row">
          <label>Guests:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            disabled={bookingLoading}
          />
        </div>

        <div className="people-row">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={bookingLoading}
          />
        </div>

        <p className="total">Total: ₹ {totalPrice.toLocaleString()}</p>

        <button onClick={handleBooking} className="btn btn-gold" disabled={bookingLoading}>
          {bookingLoading ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
}

export default Explore;