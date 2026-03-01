import React, { useState } from "react";
import PackageCard from "../components/packageCard";
import ReviewCard from "../components/reviewCard";
import "../css/Explore.css";

function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");

 const packages = [
  {
    id: 1,
    title: "Swiss Alps Escape",
    price: "₹1,20,000",
    image: "https://picsum.photos/seed/alps/800/600",
    category: "Mountain",
  },
  {
    id: 2,
    title: "Maldives Paradise",
    price: "₹1,50,000",
    image: "https://picsum.photos/seed/maldives/800/600",
    category: "Beach",
  },
  {
    id: 3,
    title: "Dubai Royal Experience",
    price: "₹1,10,000",
    image: "https://picsum.photos/seed/dubai/800/600",
    category: "City",
  },
  {
    id: 4,
    title: "Goa Beach Retreat",
    price: "₹55,000",
    image: "https://picsum.photos/seed/goa/800/600",
    category: "Beach",
  },
  {
    id: 5,
    title: "Kashmir Heaven Tour",
    price: "₹75,000",
    image: "https://picsum.photos/seed/kashmir/800/600",
    category: "Mountain",
  },
  {
    id: 6,
    title: "Paris Romantic Getaway",
    price: "₹1,35,000",
    image: "https://picsum.photos/seed/paris/800/600",
    category: "City",
  },
  {
    id: 7,
    title: "Bali Island Luxury",
    price: "₹95,000",
    image: "https://picsum.photos/seed/bali/800/600",
    category: "Beach",
  },
  {
    id: 8,
    title: "Manali Adventure Trip",
    price: "₹45,000",
    image: "https://picsum.photos/seed/manali/800/600",
    category: "Mountain",
  },
  {
    id: 9,
    title: "Singapore Skyline Tour",
    price: "₹1,25,000",
    image: "https://picsum.photos/seed/singapore/800/600",
    category: "City",
  },
  {
    id: 10,
    title: "Thailand Beach Escape",
    price: "₹80,000",
    image: "https://picsum.photos/seed/thailand/800/600",
    category: "Beach",
  },
  {
    id: 11,
    title: "Ladakh Road Trip",
    price: "₹70,000",
    image: "https://picsum.photos/seed/ladakh/800/600",
    category: "Mountain",
  },
  {
    id: 12,
    title: "New York City Lights",
    price: "₹1,60,000",
    image: "https://picsum.photos/seed/newyork/800/600",
    category: "City",
  },
];

  const categories = ["All", "Beach", "Mountain", "City"];

  const filteredPackages =
    selectedCategory === "All"
      ? packages
      : packages.filter((pkg) => pkg.category === selectedCategory);

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore Destinations</h1>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="packages-grid">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            title={pkg.title}
            price={pkg.price}
            image={pkg.image}
          />
        ))}
      </div>

      <div className="reviews-section">
        <h2>What Our Travelers Say</h2>
        <div className="reviews-grid">
          <ReviewCard
            name="Riya Sharma"
            review="Elite Escapes made my Maldives trip unforgettable!"
            location="Delhi, India"
          />
          <ReviewCard
            name="Arjun Mehta"
            review="Everything was perfectly organized and luxurious."
            location="Mumbai, India"
          />
          <ReviewCard
            name="Sneha Kapoor"
            review="Best travel experience ever. Highly recommended!"
            location="Bangalore, India"
          />
        </div>
      </div>
    </div>
  );
}

export default Explore;