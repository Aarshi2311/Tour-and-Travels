import React from "react";
import "../css/PackageCard.css";

function PackageCard({ title, price, image }) {
  return (
    <div className="package-card">
      <img src={image} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <button>View Details</button>
      </div>
    </div>
  );
}

export default PackageCard;