# Google OAuth Setup Guide

## ✅ Google OAuth Integration Complete!

### What Was Added:

**Backend:**
- ✓ `google-auth-library` package for secure token verification
- ✓ Updated `/api/auth/google-login` route
- ✓ Token verification using Google's official library
- ✓ Automatic user creation/linking

**Frontend:**
- ✓ `@react-oauth/google` package
- ✓ GoogleOAuthProvider wrapper in App.jsx
- ✓ GoogleLogin component on Signin page
- ✓ Secure credential-based login (no manual JWT decoding)

---

## 🔧 Setup Steps (REQUIRED)

### Step 1: Get Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create OAuth 2.0 ID" → "Web Application"
5. Add Authorized origins:
   - `http://localhost:5173` (local frontend)
   - `http://localhost:3000` (local backend)
6. Add Authorized redirect URIs:
   - `http://localhost:5173` (local frontend)
7. Copy your **Client ID**

### Step 2: Update Environment Variables

**Server/.env:**
```
GOOGLE_CLIENT_ID=your_actual_client_id_here
```

**Client/.env:**
```
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
```

### Step 3: Install New Dependencies

```bash
# Server
cd Server
npm install

# Client
cd Client
npm install
```

---

## 🚀 How It Works

### Frontend Flow:
1. User clicks "Sign in with Google" button
2. Google popup appears (handled by GoogleLogin component)
3. User authenticates with Google
4. Google returns an ID token (credential)
5. Frontend sends credential to backend: `POST /api/auth/google-login`
6. JWT token received and stored in localStorage
7. User redirected to dashboard

### Backend Flow:
1. Receives credential from frontend
2. Verifies credential using Google's official library
3. Extracts email, name, picture from verified token
4. Checks if user exists in database
5. If new: Creates user with `isGoogleUser=true`, `password=null`
6. If exists: Links Google account (if not already linked)
7. Generates JWT token (same as normal login)
8. Returns token + user data

---

## ✨ Key Features

✓ **Secure**: Uses official Google library for token verification
✓ **No Manual JWT Decoding**: Frontend uses GoogleLogin component
✓ **Automatic User Creation**: First-time Google users auto-registered
✓ **Account Linking**: Can link Google to existing email/password accounts
✓ **No Password Needed**: Google users have `password=null` in database
✓ **Same JWT Flow**: Uses same generateToken() function as email/password login

---

## 🔒 Security

- ✓ Token verified server-side using google-auth-library
- ✓ GOOGLE_CLIENT_ID sent to backend for verification
- ✓ No plain-text credentials stored
- ✓ JWT token generated on backend (not frontend)
- ✓ Same JWT middleware protects routes as email/password login

---

## 📱 Testing

### Without Real Google Account:
1. Keep dummy button temporarily for testing
2. Or use Google's test credentials for development
3. See Google OAuth documentation for test accounts

### With Real Google Account:
1. Complete Step 1 & 2 above
2. Update .env files with real Client ID
3. npm install (to install @react-oauth/google)
4. npm run dev (frontend) + npm start (backend)
5. Click "Sign in with Google"
6. Should redirect to dashboard on success

---

## 🐛 Troubleshooting

**Issue: "Google credential token is required"**
- Check GOOGLE_CLIENT_ID in Server/.env
- Ensure Frontend sending correct credential

**Issue: "Invalid Google token"**
- Verify GOOGLE_CLIENT_ID is correct
- Check token hasn't expired (usually valid for 1 hour)
- Ensure client ID matches Google Console

**Issue: GoogleLogin button not showing**
- Verify VITE_GOOGLE_CLIENT_ID in Client/.env
- Check @react-oauth/google installed
- Ensure GoogleOAuthProvider wraps app

**Issue: CORS error**
- Check GOOGLE_CLIENT_ID authorized origins in Google Console
- Should include http://localhost:5173

---

## 📋 Files Modified

**Backend:**
- `Server/package.json` - Added google-auth-library
- `Server/.env` - Added GOOGLE_CLIENT_ID
- `Server/controllers/authControllers.js` - Updated googleLogin to verify tokens

**Frontend:**
- `Client/package.json` - Added @react-oauth/google
- `Client/.env` - Added VITE_GOOGLE_CLIENT_ID
- `Client/src/App.jsx` - Added GoogleOAuthProvider
- `Client/src/pages/Signin.jsx` - Added GoogleLogin component

---

## ✅ Existing Features Preserved

✓ Email/password signup still works
✓ Email/password login still works
✓ Profile picture upload still works
✓ All protected routes still work
✓ Database models unchanged
✓ JWT middleware unchanged
✓ All existing users unaffected

---

## 🎯 Next Steps

1. Get Google Client ID (Step 1 above)
2. Update .env files (Step 2 above)
3. npm install in both directories (Step 3 above)
4. Restart backend: `npm start`
5. Restart frontend: `npm run dev`
6. Test Google login from Signin page

**Status: ✅ READY FOR GOOGLE OAUTH CONFIGURATION**
