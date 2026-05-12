const Package = require("../models/Package");

const samplePackages = [
  {
    name: "Maldives Escape",
    destination: "Maldives",
    price: 5000,
    duration: "5 Days / 4 Nights",
    description: "Experience luxury in overwater bungalows with crystal clear waters",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Overwater Bungalows", "Snorkeling", "Spa Treatments"],
  },
  {
    name: "Swiss Alps Retreat",
    destination: "Switzerland",
    price: 8000,
    duration: "7 Days / 6 Nights",
    description: "Mountain luxury with breathtaking alpine views",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Hiking", "Mountain Lodges", "Scenic Views"],
  },
  {
    name: "Dubai Luxury Tour",
    destination: "Dubai",
    price: 6000,
    duration: "4 Days / 3 Nights",
    description: "Experience modern luxury in the desert city",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Shopping", "Desert Safari", "Burj Khalifa"],
  },
  {
    name: "Santorini Bliss",
    destination: "Greece",
    price: 7500,
    duration: "6 Days / 5 Nights",
    description: "Relax in whitewashed villages overlooking the Aegean Sea",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Wine Tasting", "Sunset Views", "Beach Clubs"],
  },
  {
    name: "Bali Paradise",
    destination: "Indonesia",
    price: 4500,
    duration: "5 Days / 4 Nights",
    description: "Tropical paradise with ancient temples and lush landscapes",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Temple Tours", "Beach Relaxation", "Yoga Retreats"],
  },
  {
    name: "Paris Royal Stay",
    destination: "France",
    price: 9000,
    duration: "7 Days / 6 Nights",
    description: "The City of Light awaits with culture and elegance",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Museum Tours", "Seine Cruise", "Fine Dining"],
  },
  {
    name: "Tokyo Discovery",
    destination: "Japan",
    price: 8500,
    duration: "6 Days / 5 Nights",
    description: "Modern meets traditional in Japan's vibrant capital",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Temple Visits", "Karaoke", "Street Food"],
  },
  {
    name: "New York Experience",
    destination: "USA",
    price: 7000,
    duration: "5 Days / 4 Nights",
    description: "The city that never sleeps awaits your arrival",
    image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Broadway Shows", "Times Square", "City Tours"],
  },
  {
    name: "Iceland Northern Lights",
    destination: "Iceland",
    price: 9500,
    duration: "6 Days / 5 Nights",
    description: "Chase the magical Aurora Borealis in this frozen wonderland",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Northern Lights", "Geysers", "Waterfalls"],
  },
];

const seedPackages = async () => {
  try {
    const existingPackages = await Package.countDocuments();
    if (existingPackages === 0) {
      await Package.insertMany(samplePackages);
      console.log("✓ Sample packages seeded successfully!");
    } else {
      console.log("✓ Packages already exist in database");
    }
  } catch (error) {
    console.error("✗ Error seeding packages:", error.message);
  }
};

module.exports = seedPackages;
