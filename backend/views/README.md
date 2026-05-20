# Views Folder - MVC Architecture

This folder contains all the view templates following the **MVC (Model-View-Controller)** architecture pattern. These EJS templates are used for:

1. **Email Templates** - Transactional emails sent to users
2. **Error Pages** - Server-side error handling and display
3. **Admin Dashboard** - Server-rendered admin interface
4. **Welcome Page** - API documentation and information

## File Structure

```
views/
├── index.ejs                    # Welcome/Landing page with API documentation
├── booking-confirmation.ejs     # Email template for booking confirmations
├── booking-cancellation.ejs     # Email template for booking cancellations
├── review-confirmation.ejs      # Email template for review submissions
├── admin-dashboard.ejs          # Server-rendered admin dashboard
├── 404.ejs                      # 404 Not Found error page
├── 500.ejs                      # 500 Server Error page
└── README.md                    # This file
```

## Template Descriptions

### Email Templates

These templates are designed to be rendered by the Node.js backend and sent via email to users. They provide a professional, branded communication experience.

#### `booking-confirmation.ejs`
- **Purpose:** Sent when a user successfully books a tour package
- **Data Required:** 
  - User name, booking ID, package name
  - Destination, dates, number of guests
  - Price breakdown and total amount
- **Usage:** Called from `bookingController.js` after successful booking

#### `booking-cancellation.ejs`
- **Purpose:** Sent when a user cancels their booking
- **Data Required:**
  - Booking ID, original booking details
  - Refund amount and estimated refund date
- **Usage:** Called from `bookingController.js` after cancellation

#### `review-confirmation.ejs`
- **Purpose:** Sent when a user submits a review for a package
- **Data Required:**
  - User name, package name, rating, review text
- **Usage:** Called from `reviewController.js` after review creation

### Server-Rendered Pages

#### `index.ejs`
- **Purpose:** Welcome page displaying API documentation and endpoints
- **Usage:** Rendered when accessing the root API endpoint (`GET /`)
- **Features:** Lists all available API endpoints and MVC architecture overview

#### `admin-dashboard.ejs`
- **Purpose:** Server-rendered admin panel for managing bookings and packages
- **Data Required:**
  - Total bookings, active packages, total users
  - Recent bookings list, top packages list
- **Usage:** Protected route for admin users only

### Error Pages

#### `404.ejs`
- **Purpose:** Displayed when a requested resource is not found
- **HTTP Status:** 404 Not Found
- **Usage:** Middleware handles 404 errors and renders this template

#### `500.ejs`
- **Purpose:** Displayed when a server error occurs
- **HTTP Status:** 500 Internal Server Error
- **Usage:** Error handling middleware renders this for unhandled exceptions

## Integration with Express

These templates are rendered using **EJS (Embedded JavaScript)** template engine.

### Setup in `index.js`:
```javascript
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```

### Rendering Templates:
```javascript
// Example: Rendering booking confirmation email
res.render('booking-confirmation', {
  userName: user.name,
  bookingId: booking._id,
  packageName: package.name,
  totalPrice: booking.totalPrice
  // ... other data
});
```

## MVC Architecture Compliance

### Models (`/models`)
Define the data structure for users, packages, bookings, and reviews.

### Controllers (`/controllers`)
Implement the business logic:
- `authControllers.js` - User authentication
- `packageController.js` - Package management
- `bookingController.js` - Booking operations
- `reviewController.js` - Review management

### Views (`/views`) ← YOU ARE HERE
Provide the presentation layer:
- Email templates for communication
- Error pages for user feedback
- Admin interface for management
- API documentation

## Flow Example: Booking Confirmation

```
1. User submits booking (Frontend React App)
   ↓
2. POST /api/bookings (Route Handler)
   ↓
3. Booking Controller validates & saves
   ↓
4. Database query via Booking Model
   ↓
5. Render View: booking-confirmation.ejs
   ↓
6. Email sent to user with confirmation details
```

## Extending Views

To add new views:

1. **Create a new `.ejs` file** in this folder
2. **Add template variables** using EJS syntax: `<%= variableName %>`
3. **Update the relevant controller** to render the template
4. **Pass required data** to the `res.render()` function

Example:
```javascript
// In controller
res.render('my-template', {
  userName: user.name,
  bookingDetails: booking,
  // ... other data
});
```

## Technology Stack

- **Template Engine:** EJS (Embedded JavaScript Templating)
- **Backend Framework:** Express.js
- **Purpose:** Server-side rendering of HTML templates
- **Email Support:** Can be integrated with nodemailer for automated emails

## Summary

This `views` folder demonstrates proper MVC separation of concerns by:
- ✓ Keeping presentation logic separate from business logic
- ✓ Providing reusable email templates for communication
- ✓ Handling errors gracefully with styled error pages
- ✓ Offering a server-rendered admin interface
- ✓ Maintaining clean, professional user communication

All templates follow responsive design principles and are compatible with modern email clients and browsers.
