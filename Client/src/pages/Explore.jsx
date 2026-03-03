import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/explore.css";
import Footer from "../components/Footer";

function Explore() {
  const packagesData = [
    {
      id: 1,
      name: "Maldives Escape",
      destination: "Maldives",
      price: 5000,
      duration: "5 Days / 4 Nights",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 2,
      name: "Swiss Alps Retreat",
      destination: "Switzerland",
      price: 8000,
      duration: "7 Days / 6 Nights",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
      id: 3,
      name: "Dubai Luxury Tour",
      destination: "Dubai",
      price: 6000,
      duration: "4 Days / 3 Nights",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090",
    },
    {
      id: 4,
      name: "Santorini Bliss",
      destination: "Greece",
      price: 7500,
      duration: "6 Days / 5 Nights",
      image:
        "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
    },
    {
      id: 5,
      name: "Bali Paradise",
      destination: "Indonesia",
      price: 4500,
      duration: "5 Days / 4 Nights",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      id: 6,
      name: "Paris Royal Stay",
      destination: "France",
      price: 9000,
      duration: "7 Days / 6 Nights",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      id: 7,
      name: "Tokyo Discovery",
      destination: "Japan",
      price: 8500,
      duration: "6 Days / 5 Nights",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 8,
      name: "New York Experience",
      destination: "USA",
      price: 7000,
      duration: "5 Days / 4 Nights",
      image:
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 9,
      name: "Iceland Northern Lights",
      destination: "Iceland",
      price: 9500,
      duration: "6 Days / 5 Nights",
      image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

          {filteredPackages.length === 0 ? (
            <div className="no-results">
              <h3>No Packages Found</h3>
              <p>
                We currently don’t offer that destination.
                Please explore our other luxury experiences.
              </p>
            </div>
          ) : (
            <div className="package-grid">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
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
  const totalPrice = pkg.price * people;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBooking = () => {
  if (!user) {
    alert("Please sign in to book this package.");
    navigate("/signin");
    return;
  }

  const existingBookings =
    JSON.parse(localStorage.getItem("eliteBookings")) || [];

  const newBooking = {
    packageId: pkg.id,
    packageName: pkg.name,
    destination: pkg.destination,
    duration: pkg.duration,
    pricePerPerson: pkg.price,
    people,
    totalPrice,
    userEmail: user.email,
    bookedAt: new Date().toLocaleString(),
  };

  localStorage.setItem(
    "eliteBookings",
    JSON.stringify([...existingBookings, newBooking])
  );

  alert("Package successfully added to your dashboard!");
};

  return (
    <div className="package-card">
      <div className="badge">Limited Slots</div>
      <img src={pkg.image} alt={pkg.name} />

      <div className="card-content">
        <h3>{pkg.name}</h3>
        <p className="destination">{pkg.destination}</p>
        <p className="duration">{pkg.duration}</p>
        <p className="price">₹ {pkg.price} / person</p>

        <div className="people-row">
          <label>People:</label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
          />
        </div>

        <p className="total">Total: ₹ {totalPrice}</p>

        <button onClick={handleBooking} className="btn btn-gold">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Explore;