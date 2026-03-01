import React from "react";
import "../css/ReviewCard.css";

function ReviewCard({ name, review, location }) {
  return (
    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p className="review-text">"{review}"</p>
      <h4 className="review-name">- {name}</h4>
      <p className="review-location">{location}</p>
    </div>
  );
}

export default ReviewCard;