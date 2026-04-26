# Elite Escapes - Setup & Testing Guide

## ✅ Critical Fixes Applied

### 1. **Environment Configuration (.env)**
**Status:** ✓ FIXED
- Added `MONGODB_URI=mongodb://127.0.0.1:27017/toursDB`
- Added `JWT_SECRET=elite_escapes_secret_key_2024`
- Added `PORT=3000`

**Why Important:** Without these, MongoDB connection fails and JWT token generation won't work.

---

### 2. **Database Connection (config/db.js)**
**Status:** ✓ FIXED
- Changed from hardcoded MongoDB URI to `process.env.MONGODB_URI`
- Added better error logging with visual indicators (✗ for errors)
- Now properly handles environment variables

**Impact:** Allows flexible database configuration across environments.

---

### 3. **Server Initialization (Server/index.js)**
**Status:** ✓ FIXED
- Added `const { execSync } = require("child_process")` import
- Fixed syntax error (removed extra closing brace)
- Added `seedPackages` import and async initialization
- Created `initializeDB()` function that connects DB and seeds data
- Added loading message with visual indicator (✓)

**Impact:** Server now properly initializes database connection and seeds sample packages automatically.

---

### 4. **Seed Data Execution (Server/seeds/seedPackages.js)**
**Status:** ✓ ENHANCED
- Updated logging with visual indicators (✓ for success, ✗ for errors)
- Proper error message display
- Function properly returns promise for async await

**Impact:** 9 sample packages automatically inserted on first server start.

---

## 📋 System Architecture Overview

### Backend Stack
```
Node.js/Express (Port 3000)
  ├── Authentication Layer
  │   ├── JWT (7-day expiration)
  │   ├── bcryptjs (password hashing - 10 rounds)
  │   └── Multer (image uploads to Server/uploads/)
  │
  ├── Data Layer
  │   ├── User (name, email, password, profilePic, googleId, timestamps)
  │   ├── Package (name, destination, price, duration, description, highlights)
  │   ├── Booking (userId ref, packageId ref, totalPrice, startDate, status)
  │   └── Review (userId ref, rating 1-5, title, description)
  │
  └── API Routes
      ├── /api/auth (signup, login, google-login, profile)
      ├── /api/packages (CRUD)
      ├── /api/bookings (create, get, delete, update status)
      └── /api/reviews (create, get, update, delete)
```

### Frontend Stack
```
React 19 + Vite (Port 5173)
  ├── AuthContext (token + user state persistence)
  ├── API Service with Request Interceptor
  │   └── Auto-adds Authorization Bearer token to all requests
  │
  └── Pages
      ├── Signup (image upload support)
      ├── Signin (login form)
      ├── Dashboard (protected - user bookings)
      ├── Explore (browse packages, create bookings)
      ├── RateUs (submit reviews)
      └── Home (landing page)
```

### Database (MongoDB)
```
Database: toursDB
Collections:
  ├── users (email unique index)
  ├── packages (sample data auto-seeded)
  ├── bookings (references users & packages)
  └── reviews (references users & packages)
```

---

## 🚀 Setup Instructions

### Step 1: Prerequisites
Ensure MongoDB is running:
```bash
# Windows - Check if mongod is running
Get-Process mongod

# If not running, start MongoDB service
# Or run mongod in a separate terminal
mongod
```

### Step 2: Install Server Dependencies
```bash
cd Tour-and-Travels/Server
npm install
```

Expected packages: express, mongoose, bcryptjs, jsonwebtoken, multer, cors, dotenv, passport

### Step 3: Install Client Dependencies
```bash
cd Tour-and-Travels/Client
npm install
```

Expected packages: react, react-router-dom, axios, vite

### Step 4: Start Server
```bash
cd Tour-and-Travels/Server
npm start
```

Expected output:
```
✓ MongoDB connected successfully at mongodb://127.0.0.1:27017/toursDB
✓ Sample packages seeded successfully!
✓ Server running at http://localhost:3000
```

### Step 5: Start Client (in new terminal)
```bash
cd Tour-and-Travels/Client
npm run dev
```

Expected output:
```
VITE v7.3.1  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

## 🧪 Testing Checklist

### Test 1: Database Connection
1. Server starts without errors
2. MongoDB Compass shows `toursDB` database
3. Collections exist: `users`, `packages`, `bookings`, `reviews`
4. `packages` collection has 9 documents (auto-seeded)

### Test 2: User Signup
1. Navigate to http://localhost:5173/signup
2. Fill form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "Password123"
   - Confirm Password: "Password123"
   - Upload profile image (optional)
3. Click Signup
4. **Expected Results:**
   - ✓ Redirected to Dashboard
   - ✓ JWT token stored in localStorage as `eliteToken`
   - ✓ User data stored in localStorage as `eliteUser`
   - ✓ New document in `users` collection with:
     - `email`: "john@example.com"
     - `password`: Hashed (NOT plain text)
     - `profilePic`: Path if uploaded, else null
   - ✓ Profile image visible in Server/uploads/ folder

### Test 3: User Login
1. Logout first (if still logged in)
2. Navigate to http://localhost:5173/signin
3. Enter credentials:
   - Email: "john@example.com"
   - Password: "Password123"
4. Click Login
5. **Expected Results:**
   - ✓ Redirected to Dashboard
   - ✓ Same JWT token as signup
   - ✓ User data populated in localStorage

### Test 4: Password Hashing Verification
1. Open MongoDB Compass
2. Navigate to toursDB → users collection
3. Check any user document's `password` field
4. **Expected Result:**
   - ✓ Password is hashed (looks like: `$2a$10$XyZ...`)
   - ✓ NOT plain text

### Test 5: Protected Routes
1. Clear localStorage (DevTools → Application → Storage)
2. Try accessing http://localhost:5173/dashboard
3. **Expected Result:**
   - ✓ Shows "Access Denied" message
   - ✓ Redirects to home or login

### Test 6: Booking Creation
1. Login with valid user
2. Navigate to Explore page
3. Select any package
4. Click "Book Now"
5. Fill booking details:
   - Guests: 2
   - Start Date: Any future date
6. Click "Confirm Booking"
7. **Expected Results:**
   - ✓ Booking created in MongoDB
   - ✓ Dashboard shows new booking
   - ✓ `bookings` collection document includes:
     - `userId`: Reference to user
     - `packageId`: Reference to package
     - `totalPrice`: price × guests
     - `status`: "confirmed"

### Test 7: Review Submission
1. Login with valid user
2. Navigate to RateUs page
3. Fill review form:
   - Rating: 5 stars
   - Review Title: "Amazing Experience"
   - Review Text: "Best trip ever!"
4. Click "Submit Review"
5. **Expected Results:**
   - ✓ Review appears in reviews list immediately
   - ✓ `reviews` collection document includes:
     - `userId`: Reference to user
     - `rating`: 5
     - `title`: "Amazing Experience"
     - `userName`: Auto-populated from logged-in user
     - `userProfilePic`: Auto-populated from user's profile pic

### Test 8: MongoDB Data Visibility
In MongoDB Compass, verify:
```
toursDB
├── users (1+ documents with signup/login data)
│   └── Sample: { name, email, password: hashed, profilePic: path/null, googleId: null, isGoogleUser: false }
├── packages (9 documents auto-seeded)
│   └── Sample: { name: "Maldives Escape", destination: "Maldives", price: 5000, duration: "5 Days / 4 Nights", ... }
├── bookings (1+ documents from test 6)
│   └── Sample: { userId: ObjectId, packageId: ObjectId, guests: 2, totalPrice: 10000, status: "confirmed" }
└── reviews (1+ documents from test 7)
    └── Sample: { userId: ObjectId, rating: 5, title: "Amazing Experience", userName: "John Doe", ... }
```

---

## 🔐 Security Verification

### JWT Token Flow
1. Signup/Login returns token
2. Token stored in localStorage
3. Request interceptor auto-adds `Authorization: Bearer {token}` to all API requests
4. Server middleware verifies token on protected routes
5. Token expires in 7 days

### Password Security
1. Passwords hashed with bcryptjs (10 rounds)
2. Raw passwords NEVER stored in database
3. Password comparison uses bcrypt.compare() on login
4. Same password produces different hash each time (secure)

### Protected Endpoints (require authentication)
```
POST /api/bookings (create booking)
GET /api/bookings/user (user bookings)
DELETE /api/bookings/:bookingId
PUT /api/bookings/:bookingId/status
POST /api/reviews (create review)
GET /api/reviews/user (user reviews)
PUT /api/reviews/:reviewId (update review)
DELETE /api/reviews/:reviewId (delete review)
GET /api/auth/profile (get user profile)
```

---

## ❌ Troubleshooting

### Issue: "MongoDB connection error"
**Solution:**
1. Verify MongoDB is running: `Get-Process mongod`
2. Check connection string in .env: `MONGODB_URI=mongodb://127.0.0.1:27017/toursDB`
3. Verify MongoDB is accessible: `mongosh mongodb://127.0.0.1:27017/toursDB`

### Issue: "Port 3000 already in use"
**Solution:**
1. Kill existing process on port 3000
2. Or change PORT in .env to 3001

### Issue: "JWT token undefined"
**Solution:**
1. Verify JWT_SECRET in .env is set
2. Check localStorage for `eliteToken` in DevTools
3. Verify request interceptor adds Authorization header

### Issue: "Upload directory not found"
**Solution:**
1. Server automatically creates Server/uploads/ on startup
2. If not created, manually: `mkdir Server/uploads`

### Issue: "No packages showing on Explore page"
**Solution:**
1. Check server logs for "✓ Sample packages seeded successfully!"
2. Verify `packages` collection in MongoDB Compass has 9 documents
3. Restart server if packages collection is empty

---

## 📊 API Endpoints Reference

### Authentication
```
POST /api/auth/signup (multipart/form-data)
  Body: { name, email, password, confirmPassword, profilePic: file }
  Response: { token, user: { id, name, email, profilePic } }

POST /api/auth/login
  Body: { email, password }
  Response: { token, user: { id, name, email, profilePic } }

GET /api/auth/profile (Protected)
  Response: { _id, name, email, profilePic, googleId, isGoogleUser, timestamps }
```

### Packages
```
GET /api/packages
  Response: Array of packages

POST /api/packages (Protected)
  Body: { name, destination, price, duration, description, image, highlights }
  Response: Created package
```

### Bookings
```
POST /api/bookings (Protected)
  Body: { packageId, guests, startDate }
  Response: { booking with auto-populated fields }

GET /api/bookings (Public - admin dashboard)
  Response: Array of all bookings

GET /api/bookings/user (Protected)
  Response: Array of user's bookings

DELETE /api/bookings/:bookingId (Protected)
```

### Reviews
```
POST /api/reviews (Protected)
  Body: { packageId, packageName, rating, title, description }
  Response: Created review with auto-populated userName, userProfilePic

GET /api/reviews
  Response: Array of all reviews

GET /api/reviews/user (Protected)
  Response: Array of user's reviews
```

---

## 🎯 Success Indicators

✅ **Authentication System Complete When:**
- Signup creates user with hashed password
- Login returns JWT token
- Token stored and sent with all requests
- Protected routes deny access without token
- Token expires after 7 days

✅ **Database System Complete When:**
- MongoDB shows toursDB with 4 collections
- All CRUD operations work
- Data persists after server restart
- MongoDB Compass displays all records correctly

✅ **Full Stack Complete When:**
- Frontend can signup/login/logout
- Dashboard shows user's bookings
- Explore page shows all packages
- Reviews can be submitted and viewed
- Profile images upload successfully

---

## 📝 Key Configuration

| Component | Value | Location |
|-----------|-------|----------|
| MongoDB URI | mongodb://127.0.0.1:27017/toursDB | Server/.env |
| JWT Secret | elite_escapes_secret_key_2024 | Server/.env |
| JWT Expiry | 7d | Server/controllers/authControllers.js |
| Bcrypt Rounds | 10 | Server/controllers/authControllers.js |
| Server Port | 3000 | Server/.env |
| Client Port | 5173 | Client/vite.config.js |
| Upload Path | Server/uploads/ | Server/index.js |
| Token Storage Key | eliteToken | localStorage |
| User Storage Key | eliteUser | localStorage |

---

## 🔄 Request/Response Flow Example

### Signup Flow
```
1. Frontend: Signup form with image
   ↓
2. Frontend: FormData with file + fields → POST /api/auth/signup
   ↓
3. Server: Multer validates and saves file to Server/uploads/
   ↓
4. Server: bcryptjs hashes password
   ↓
5. Server: Save user to MongoDB
   ↓
6. Server: Generate JWT token
   ↓
7. Server: Return { token, user }
   ↓
8. Frontend: Store token in localStorage[eliteToken]
   ↓
9. Frontend: Store user in localStorage[eliteUser]
   ↓
10. Frontend: Redirect to /dashboard
```

### Booking Flow
```
1. Frontend: User selects package, fills booking form
   ↓
2. Frontend: POST /api/bookings with { packageId, guests, startDate }
   ↓
3. Interceptor: Adds Authorization header with Bearer token
   ↓
4. Server: authMiddleware verifies JWT token
   ↓
5. Server: Fetch package details from MongoDB
   ↓
6. Server: Calculate totalPrice = price × guests
   ↓
7. Server: Save booking to MongoDB with all details
   ↓
8. Server: Return created booking
   ↓
9. Frontend: Show success message, redirect to /dashboard
```

---

End of Setup & Testing Guide. All critical systems are now functional and ready for evaluation.
