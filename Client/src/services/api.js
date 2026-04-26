import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("eliteToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH ENDPOINTS
export const signupUser = (formData) => {
  return api.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const loginUser = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const googleLogin = (googleData) => {
  return api.post("/auth/google-login", googleData);
};

export const getUserProfile = () => {
  return api.get("/auth/profile");
};

// PACKAGE ENDPOINTS
export const getAllPackages = () => {
  return api.get("/packages");
};

export const getPackageById = (packageId) => {
  return api.get(`/packages/${packageId}`);
};

export const createPackage = (packageData) => {
  return api.post("/packages", packageData);
};

export const updatePackage = (packageId, packageData) => {
  return api.put(`/packages/${packageId}`, packageData);
};

export const deletePackage = (packageId) => {
  return api.delete(`/packages/${packageId}`);
};

// BOOKING ENDPOINTS
export const createBooking = (bookingData) => {
  return api.post("/bookings", bookingData);
};

export const getAllBookings = () => {
  return api.get("/bookings");
};

export const getUserBookings = () => {
  return api.get("/bookings/user");
};

export const deleteBooking = (bookingId) => {
  return api.delete(`/bookings/${bookingId}`);
};

export const updateBookingStatus = (bookingId, status) => {
  return api.put(`/bookings/${bookingId}/status`, { status });
};

// REVIEW ENDPOINTS
export const getAllReviews = () => {
  return api.get("/reviews");
};

export const getReviewsByPackage = (packageId) => {
  return api.get(`/reviews/package/${packageId}`);
};

export const createReview = (reviewData) => {
  return api.post("/reviews", reviewData);
};

export const getUserReviews = () => {
  return api.get("/reviews/user");
};

export const updateReview = (reviewId, reviewData) => {
  return api.put(`/reviews/${reviewId}`, reviewData);
};

export const deleteReview = (reviewId) => {
  return api.delete(`/reviews/${reviewId}`);
};

export default api;
