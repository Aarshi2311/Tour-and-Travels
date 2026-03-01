import "../styles.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Curated Luxury Travel Experiences</h1>
          <p>
            Discover bespoke destinations crafted for elegance,
            comfort, and unforgettable memories.
          </p>

          <Link to="/explore">
            <button className="btn btn-gold">
              Explore Packages
            </button>
          </Link>
        </div>
      </section>

      {/* Why - section */}
      <section className="why-section">
        <div className="container">
            <h2 className="section-title light">
                Why Choose Elite Escapes
            </h2>

        <div className="why-grid">
        <div className="why-card">
            <h3>Unmatched Exclusivity</h3>
            <p>
            Access to rare destinations and private experiences
            curated for discerning travelers.
            </p>
        </div>

        <div className="why-card">
            <h3>Personal Concierge</h3>
            <p>
            Dedicated travel specialists available around the clock
            to refine every detail of your journey.
            </p>
        </div>

        <div className="why-card">
            <h3>Seamless Luxury</h3>
            <p>
            From arrival to departure, enjoy effortless travel
            crafted with precision and care.
            </p>
        </div>
        </div>
    </div>
</section>

<section className="signature-line">
  <div className="container">
    <p>
      “Luxury is in each detail.” — Hubert de Givenchy
    </p>
  </div>
</section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">
            Experience Travel Like Never Before
          </h2>

          <p className="about-text">
            At Elite Escapes, we curate refined journeys tailored for
            those who seek exclusivity, elegance, and seamless luxury.
            From breathtaking destinations to personalized service,
            every detail is crafted to perfection.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;