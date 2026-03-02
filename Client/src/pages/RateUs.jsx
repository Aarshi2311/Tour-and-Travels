import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../css/RateUs.css";

function RateUs() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !name || !email || !review) {
      alert("Please fill all fields and select a rating");
      return;
    }

    const newReview = {
      name,
      email,
      rating,
      review,
      date: new Date().toLocaleDateString(),
    };

    const existingReviews = JSON.parse(
      localStorage.getItem("eliteReviews") || "[]"
    );
    existingReviews.push(newReview);
    localStorage.setItem("eliteReviews", JSON.stringify(existingReviews));

    setSubmitted(true);
    setRating(0);
    setName("");
    setEmail("");
    setReview("");

    setTimeout(() => setSubmitted(false), 4000);
  };

  const reviews = JSON.parse(localStorage.getItem("eliteReviews") || "[]");

  return (
    <>
      <div className="rateus-page">
        <div className="container">
          <div className="rateus-header">
            <h1>Rate Our Service</h1>
            <p>
              Help us improve by sharing your experience with Elite Escapes
            </p>
          </div>

          <div className="rateus-content">
            <div className="rating-form-section">
              <div className="rating-form-card">
                <h2>Share Your Experience</h2>

                {submitted && (
                  <div className="success-message">
                    ✓ Thank you! Your review has been submitted successfully.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Rating</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star ${
                            (hoverRating || rating) >= star ? "active" : ""
                          }`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <p className="rating-label">
                      {rating > 0
                        ? ["Poor", "Fair", "Good", "Excellent", "Outstanding"][
                            rating - 1
                          ]
                        : "Click to rate"}
                    </p>
                  </div>

                  <div className="form-group">
                    <label>Your Review</label>
                    <textarea
                      placeholder="Tell us about your experience..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="form-textarea"
                      rows="6"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-gold submit-btn">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>

            <div className="reviews-section">
              <h2>Customer Reviews ({reviews.length})</h2>

              {reviews.length === 0 ? (
                <div className="no-reviews">
                  <p>No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="reviews-grid">
                  {reviews.map((r, index) => (
                    <div key={index} className="review-card">
                      <div className="review-header">
                        <div>
                          <h3>{r.name}</h3>
                          <p className="review-date">{r.date}</p>
                        </div>
                        <div className="review-stars">
                          {[...Array(r.rating)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="review-text">{r.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RateUs;
