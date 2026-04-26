# Elite Escapes - Configuration Reference

## Environment Variables (.env)
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/toursDB
JWT_SECRET=elite_escapes_secret_key_2024
```

**Location:** `Tour-and-Travels/Server/.env`

---

## Database Configuration
```
Type: MongoDB
Database Name: toursDB
Connection String: mongodb://127.0.0.1:27017/toursDB
Host: 127.0.0.1
Port: 27017
```

**Collections:**
- `users` - User accounts with authentication data
- `packages` - Travel packages catalog (9 pre-seeded)
- `bookings` - Travel bookings with user + package references
- `reviews` - Customer reviews with ratings

---

## Authentication Flow

### JWT Configuration
```javascript
// Token Generation
jwt.sign(
  { userId, email },
  process.env.JWT_SECRET,           // elite_escapes_secret_key_2024
  { expiresIn: "7d" }               // 7 day expiration
)

// Token Storage Location
localStorage.setItem('eliteToken', token)
localStorage.setItem('eliteUser', JSON.stringify(userData))

// Request Injection
Authorization: Bearer {token}
```

### Password Security
```javascript
// Hashing on Signup
bcrypt.hash(password, 10)  // 10 rounds of salt

// Verification on Login
bcrypt.compare(plainTextPassword, hashedPassword)
```

---

## API Endpoints Configuration

### Base URL
```
Development: http://localhost:3000/api
```

### Authentication Endpoints
```
POST   /auth/signup
       Headers: Content-Type: multipart/form-data
       Body: FormData { name, email, password, confirmPassword, profilePic: file }
       Response: { token, user: { id, name, email, profilePic } }

POST   /auth/login
       Headers: Content-Type: application/json
       Body: { email, password }
       Response: { token, user: { id, name, email, profilePic } }

POST   /auth/google-login
       Headers: Content-Type: application/json
       Body: { email, name, googleId, picture }
       Response: { token, user: { id, name, email, profilePic } }

GET    /auth/profile
       Headers: Authorization: Bearer {token}
       Response: { _id, name, email, profilePic, googleId, isGoogleUser, timestamps }
```

### Package Endpoints
```
GET    /packages
       Response: Array[{ _id, name, destination, price, duration, description, image, highlights, maxCapacity }]

GET    /packages/:packageId
       Response: Single package object

POST   /packages (Protected)
       Headers: Authorization: Bearer {token}
       Body: { name, destination, price, duration, description, image, highlights }

PUT    /packages/:packageId (Protected)
       Headers: Authorization: Bearer {token}
       Body: Partial package fields to update

DELETE /packages/:packageId (Protected)
       Headers: Authorization: Bearer {token}
```

### Booking Endpoints
```
POST   /bookings (Protected)
       Headers: Authorization: Bearer {token}
       Body: { packageId, guests, startDate }
       Auto-populated: userId, userEmail, userName, packageName, destination, duration, price, totalPrice

GET    /bookings
       Response: Array of all bookings (public - used by admin dashboard)

GET    /bookings/user (Protected)
       Headers: Authorization: Bearer {token}
       Response: Array of user's bookings only

DELETE /bookings/:bookingId (Protected)
       Headers: Authorization: Bearer {token}
       
PUT    /bookings/:bookingId/status (Protected)
       Headers: Authorization: Bearer {token}
       Body: { status: "pending" | "confirmed" | "cancelled" }
```

### Review Endpoints
```
POST   /reviews (Protected)
       Headers: Authorization: Bearer {token}
       Body: { packageId, packageName, rating: 1-5, title, description }
       Auto-populated: userId, userName, userProfilePic

GET    /reviews
       Response: Array of all reviews (public)

GET    /reviews/package/:packageId
       Response: Array of reviews for specific package (public)

GET    /reviews/user (Protected)
       Headers: Authorization: Bearer {token}
       Response: Array of user's reviews only

PUT    /reviews/:reviewId (Protected)
       Headers: Authorization: Bearer {token}
       Body: Partial review fields to update

DELETE /reviews/:reviewId (Protected)
       Headers: Authorization: Bearer {token}
```

---

## File Upload Configuration

### Image Upload
```javascript
// Multer Configuration
Destination: Server/uploads/
Filename Format: {timestamp}{originalExtension}
File Types Allowed: .jpeg, .jpg, .png, .gif
Field Name: profilePic

// Storage Path in Database
Stored As: /uploads/{timestamp}.{ext}
Example: /uploads/1703087400123.jpg

// Frontend Access
Via API: GET requests automatically include full URL path
Static Serving: /uploads/* served by Express static middleware
```

### Upload Validation
```javascript
Allowed MIME Types: image/jpeg, image/png, image/gif
Max File Size: Default multer (no limit set, typically 10MB)
Validation: File extension + MIME type double-check
```

---

## Database Schema Details

### User Schema
```javascript
{
  _id: ObjectId (auto-generated),
  name: String (required),
  email: String (required, unique),
  password: String (hashed with bcryptjs, NOT plain text),
  profilePic: String (path like /uploads/1703087400123.jpg),
  googleId: String (null for non-Google users),
  isGoogleUser: Boolean (true for Google OAuth users),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Package Schema
```javascript
{
  _id: ObjectId (auto-generated),
  name: String (required),
  destination: String (required),
  price: Number (required),
  duration: String (required),
  description: String,
  image: String (URL),
  highlights: [String] (array of features),
  maxCapacity: Number (default 20),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Booking Schema
```javascript
{
  _id: ObjectId (auto-generated),
  userId: ObjectId (ref: User),
  userEmail: String,
  userName: String,
  packageId: ObjectId (ref: Package),
  packageName: String,
  destination: String,
  duration: String,
  price: Number (per person),
  guests: Number,
  totalPrice: Number (price × guests),
  startDate: Date,
  status: String (enum: "pending", "confirmed", "cancelled"),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Review Schema
```javascript
{
  _id: ObjectId (auto-generated),
  userId: ObjectId (ref: User),
  userName: String,
  userProfilePic: String (path or null),
  packageId: ObjectId (ref: Package),
  packageName: String,
  rating: Number (1-5, enum),
  title: String (required),
  description: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Middleware Configuration

### Auth Middleware (Protected Routes)
```javascript
// Location: Server/middleware/authMiddleware.js
// Flow:
1. Extract token from "Authorization: Bearer {token}" header
2. Verify token using process.env.JWT_SECRET
3. If valid: Attach decoded { userId, email } to req.user
4. If invalid/missing: Return 401 Unauthorized

// Applied To:
- POST /api/bookings
- GET /api/bookings/user
- DELETE /api/bookings/:bookingId
- PUT /api/bookings/:bookingId/status
- POST /api/reviews
- GET /api/reviews/user
- PUT /api/reviews/:reviewId
- DELETE /api/reviews/:reviewId
- GET /api/auth/profile
```

### Logger Middleware
```javascript
// Location: Server/middleware/logger.js
// Logs: Method, URL, Timestamp, Status Code
// Applied: Before all route handlers
```

### CORS Middleware
```javascript
// Location: Express cors() package
// Allows: Cross-origin requests from http://localhost:5173
// Applied: Before routes
```

---

## Frontend Configuration

### Axios Setup (services/api.js)
```javascript
// Base URL
http://localhost:3000/api

// Request Interceptor
Automatically adds: Authorization: Bearer {token from localStorage['eliteToken']}
Applies to: ALL requests (GET, POST, PUT, DELETE)

// Error Response
Automatically handles 401 responses
Redirects to login if token invalid/expired
```

### AuthContext (context/AuthContext.jsx)
```javascript
// State Variables
user: { id, name, email, profilePic }
token: JWT token string
loading: boolean

// Methods
login(userData, authToken): Saves to localStorage + state
logout(): Clears localStorage + state
  
// Persistence
On app load: Checks localStorage for 'eliteToken' and 'eliteUser'
Auto-restores: user + token if found
Enables: Persistent login across page refreshes
```

---

## Seed Data (Auto-Loaded)

### 9 Pre-seeded Packages
```javascript
1. Maldives Escape        - $5000   - 5 Days/4 Nights
2. Swiss Alps Retreat     - $8000   - 7 Days/6 Nights
3. Dubai Luxury Tour      - $6000   - 4 Days/3 Nights
4. Santorini Bliss        - $7500   - 6 Days/5 Nights
5. Bali Paradise          - $4500   - 5 Days/4 Nights
6. Paris Royal Stay       - $9000   - 7 Days/6 Nights
7. Tokyo Discovery        - $8500   - 6 Days/5 Nights
8. New York Experience    - $7000   - 5 Days/4 Nights
9. Iceland Northern Lights - $9500  - 6 Days/5 Nights
```

**Auto-seeding:** Runs on first server start, inserts only if packages collection is empty

---

## Port Configuration

| Service | Port | Environment Variable | Location |
|---------|------|----------------------|----------|
| Node.js Backend | 3000 | PORT | Server/.env |
| Vite Frontend | 5173 | - | Auto-assigned |
| MongoDB | 27017 | - | N/A |
| MongoDB Compass | 27017+ | - | GUI App |

---

## Error Handling

### HTTP Status Codes
```
200 OK                - Request successful
201 Created           - Resource created
400 Bad Request       - Invalid input
401 Unauthorized      - No/invalid token
404 Not Found         - Resource not found
500 Server Error      - Unexpected error
```

### Error Response Format
```javascript
{
  message: "Error description"
}
```

### Common Errors
```
"All fields are required"           - Missing required fields
"User already exists"               - Email duplicate on signup
"Invalid email or password"         - Wrong credentials
"Passwords do not match"            - Password mismatch
"No token provided"                 - Missing Authorization header
"Invalid or expired token"          - Token invalid/expired
"Package not found"                 - Invalid packageId
"User not found"                    - Invalid userId
"Only image files are allowed"      - Invalid file type on upload
```

---

## Deployment Checklist

- [ ] MongoDB running locally or connection string configured
- [ ] .env file in Server directory with all 3 variables
- [ ] Server dependencies installed: `npm install`
- [ ] Client dependencies installed: `npm install`
- [ ] Server starts without errors: `npm start`
- [ ] Client runs without errors: `npm run dev`
- [ ] Packages auto-seeded in database
- [ ] Signup creates user with hashed password
- [ ] Login returns JWT token
- [ ] Booking creates record in database
- [ ] Review creates record in database
- [ ] Images upload to Server/uploads/
- [ ] MongoDB Compass shows all collections with data

---

## Quick Debugging

**Issue: MongoDB connection error**
```
Check: mongod running, MONGODB_URI in .env correct
Fix: mongod or ensure connection string matches local setup
```

**Issue: JWT undefined**
```
Check: JWT_SECRET in .env, localStorage['eliteToken'] in DevTools
Fix: Restart server, clear localStorage, login again
```

**Issue: Upload fails**
```
Check: Server/uploads/ directory exists, file is image type
Fix: Create directory manually or restart server
```

**Issue: No packages on Explore**
```
Check: "Sample packages seeded successfully!" in server logs
Fix: Restart server, check packages collection in MongoDB Compass
```

---

**Reference Date:** April 26, 2026
**Project Status:** ✓ Ready for Testing & Evaluation
