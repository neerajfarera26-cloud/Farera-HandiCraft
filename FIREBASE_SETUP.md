# Firebase Setup Guide for Farera Handicraft Login

## Overview
This guide helps you set up Firebase authentication for Google and Facebook login integration.

## Steps to Setup Firebase

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Enter project name: `farera-handicraft`
4. Accept terms and create project

### 2. Register Web Application
1. In Firebase Console, click the Web icon (</> symbol)
2. Register app with nickname: `Farera Web`
3. Copy the Firebase configuration

### 3. Enable Authentication Methods

#### Enable Google Sign-In:
1. Go to Authentication > Sign-in method
2. Click Google
3. Toggle ON
4. Select Support email
5. Click Save

#### Enable Facebook Login:
1. Go to Authentication > Sign-in method
2. Click Facebook
3. Toggle ON
4. Enter Facebook App ID and App Secret
5. Add OAuth Redirect URI to Facebook app
6. Click Save

### 4. Get Your Firebase Credentials
Your Firebase config will look like:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 5. Update login.js
Replace the firebaseConfig in `login.js` with your actual credentials:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 6. Configure Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create or use existing app
3. Add Facebook Login product
4. In Settings > Basic, copy App ID and App Secret
5. In Facebook Login > Settings, add:
   - Valid OAuth Redirect URIs: `https://yourdomain.firebaseapp.com/__/auth/handler`
6. Paste App ID and Secret in Firebase Console

### 7. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials (Web application)
3. Add Authorized redirect URIs:
   - `https://yourdomain.firebaseapp.com/__/auth/handler`
   - `http://localhost:3000/__/auth/handler`
4. Get Client ID from Google
5. Ensure Google is enabled in Firebase

## Testing

### Local Testing:
- Open `login.html` in browser
- Try email signup/login (demo mode)
- Click Google/Facebook buttons (will show demo message if Firebase not configured)

### Production Deployment:
1. Deploy to Firebase Hosting or your web server
2. Update Firebase authorized domains
3. Test all authentication methods

## Demo Mode

If Firebase is not initialized:
- Email login will show success message
- Social login buttons will show "Demo Mode" message
- All animations will work normally

## Security Notes

⚠️ **Never commit real Firebase credentials to public repositories!**

For production:
1. Use environment variables
2. Store credentials in `.env` file (add to `.gitignore`)
3. Use Firebase Hosting for automatic security

## Troubleshooting

**Google login not working:**
- Check Google OAuth credentials in Firebase Console
- Verify authorized domains
- Check browser console for errors

**Facebook login not working:**
- Verify Facebook App ID in Firebase
- Check OAuth Redirect URI
- Clear browser cookies and try again

**CORS errors:**
- Add your domain to Firebase authorized domains
- Check Firebase console > Project Settings > Authorized Domains

## Support Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Google Sign-In Setup](https://firebase.google.com/docs/auth/web/google-signin)
- [Facebook Login Setup](https://firebase.google.com/docs/auth/web/facebook-login)
- [Firebase Console](https://console.firebase.google.com/)

## Current Features

✓ Email/Password Registration
✓ Email/Password Login
✓ Google OAuth Integration
✓ Facebook OAuth Integration
✓ Advanced GSAP Animations
✓ 3D Three.js Background
✓ Real-time Form Validation
✓ Success/Error Messages
✓ Password Visibility Toggle
✓ Particle Burst Effects
✓ Form Shake on Error
✓ Responsive Design

All features work in demo mode. Configure Firebase for real authentication!
