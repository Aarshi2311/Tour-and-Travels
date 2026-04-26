import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { getAllReviews, createReview } from "../services/api";
import "../css/RateUs.css";

function RateUs() {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await getAllReviews();
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to submit a review");
      return;
    }

    if (!rating || !title || !reviewText) {
      alert("Please fill all fields and select a rating");
      return;
    }

    setSubmitLoading(true);

    try {
      const res = await createReview({
        rating,
        title,
        description: reviewText,
        packageName: "Elite Escapes Experience",
      });

      if (res.data.review) {
        setSubmitted(true);
        setRating(0);
        setTitle("");
        setReviewText("");
        fetchReviews();
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit review";
      alert(message);
      console.error("Review submission error:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

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

                {!user ? (
                  <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
                    <p>Please <Link to="/signin">sign in</Link> to submit a review.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Review Title</label>
                      <input
                        type="text"
                        placeholder="Enter review title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                        disabled={submitLoading}
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
                            disabled={submitLoading}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Your Review</label>
                      <textarea
                        placeholder="Tell us about your experience..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="form-textarea"
                        rows="6"
                        disabled={submitLoading}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-gold submit-btn" disabled={submitLoading}>
                      {submitLoading ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="reviews-section">
              <h2>Customer Reviews ({reviews.length})</h2>

              {loading ? (
                <p>Loading reviews...</p>
              ) : reviews.length === 0 ? (
                <div className="no-reviews">
                  <p>No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="reviews-grid">
                  {reviews.map((r) => (
                    <div key={r._id} className="review-card">
                      <div className="review-header">
                        <div>
                          <h3>{r.userName}</h3>
                          <p className="review-date">{new Date(r.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="review-stars">
                          {[...Array(r.rating)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>

                      <p style={{ fontWeight: "bold", marginBottom: "8px" }}>{r.title}</p>
                      <p className="review-text">{r.description}</p>
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